#-*- coding: utf-8 -*-
from django.db import models
from django.db.models import Max
from utils.models import TimeStampModel, EndorsedModel, VersionedModel
from django.utils.translation import ugettext as _
from transaction.models import PersonalAccountBalance
from account.models import Contact, Company, Employee, EmployeeList
from html5lib import filters
from datetime import datetime, time, date, timedelta
from rest_framework import exceptions
from django.utils.decorators import classonlymethod

# Create your models here.
class Project(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='projects')
    company = models.ForeignKey(Company, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
    

class ProposedEmployeeList(EndorsedModel, VersionedModel, EmployeeList):
    # bug proposed list can conflict
    assignment = models.ForeignKey("project.Assignment", related_name="proposed_employee_lists")

    def is_latest(self):
        return self.assignment.latest_proposed_empoloyee_list == self

    class Meta:
        unique_together = (("version", "assignment"),)

    class NoEmployee(exceptions.NotAcceptable):
        default_detail = _('No Emploee found')

    def propose(self, user, employees):
        self.employees.add(*employees)
        super(ProposedEmployeeList, self).propose(user)


class Assignment(TimeStampModel):
    project = models.ForeignKey(Project, related_name='assignments')
    employees = models.ManyToManyField('account.Employee', through="project.EmployeeAssignment", related_name='assignments')
    comment = models.CharField(max_length=1024, blank=True, default="")
    start_datetime = models.DateTimeField(default=datetime.now)
    end_datetime = models.DateTimeField(default=datetime.now)
    number_needed = models.PositiveIntegerField(default=1)

    class Meta:
        permissions = (
            ("propose_assignment", _("Can propose Assignment")),
            ("confirm_assignment", _("Can confirm Assignment")),
            ("endorse_assignment", _("Can endorse Assignment")),
        )

    @property
    def latest_proposed_employee_list(self):
        try:
            return self.proposed_employee_lists.order_by('-version')[0]
        except IndexError:
            return None


    def propose(self, user, employees):
        if len(employees) is 0:
            raise ProposedEmployeeList.NoEmployee()
        employees = set(employees)
        old_list = self.latest_proposed_employee_list
        old_employees = set(old_list.employees.all()) if old_list is not None else set()
        if not ((employees - old_employees) or (old_employees - employees)):
            raise EndorsedModel.AlreadyProposed()

        previous = self.latest_proposed_employee_list
        current = ProposedEmployeeList(assignment=self)
        if previous is not None:
            current.version = previous.version + 1
        current.save()
        current.propose(user, list(employees))

    def confirm(self, user):
        self.proposed_employees.confirm(user)

    def endorse(self, user):
        self.latest_proposed_employee_list.endorse(user)
        employees = self.proposed_employees.employees.all()

        # remove irrelevant employees
        not_involed = self.employees.exclude(employee__in=employees)
        self.employees.remove(not_invoved)

        # add relevant employees
        relevents = set(employees) - self.employees.all()
        new_ass = [EmployeeAssignment(assignment=self, employee=employee) for employee in relevants]
        EmployeeAssignment.objects.bulk_create(new_ass)

    @property
    def time_range(self):
        return self.start_datetime, self.end_datetime
    
    
    def __str__(self):
        return "%s: %s" % (self.project.name, self.start_datetime.date())


class EmployeeAssignment(TimeStampModel):
    """
        Bug: employee may be assigned to multiple project, which is undesirable.
    """
    employee = models.ForeignKey(Employee, related_name='assignments_detail')
    assignment = models.ForeignKey(Assignment, related_name='employees_detail')
    minutes = models.PositiveIntegerField(default=0) # 現場派工工作時數
    overminutes = models.PositiveIntegerField(default=0) # 現場派工加班時數

    class Meta:
        unique_together = (("employee", "assignment"),)

    @property
    def hours(self):
        return self.minutes/60.0
 
    @hours.setter
    def hours(self, value):
        self.minutes = int(round(value * 60))
        return self.hours

    @property
    def overtime(self):
        return self.overminutes/60.0
    
    @overtime.setter
    def overtime(self, value):
        self.overminutes = int(round(value * 60))
        return self.overtime

    @property
    def work_date(self):
        return self.assignment.start_datetime.date()
    
    def __str__(self):
        return "%s: %s" % (self.assignment.project.name, self.employee.contact.name)
    
    
class Pay(PersonalAccountBalance):
    employee_assignment = models.OneToOneField(EmployeeAssignment, related_name="pays")

    def __init__(self, *args, **kwargs):
        super(Pay, self).__init__(*args, **kwargs)
        self.note = "pay"

    @property
    def amount(self):
        return self.employee_assignment.hours*self.employee_assignment.employee.salaries.hourly
 
    @amount.setter
    def amount(self, value):
        self.hours = int(round(value * self.employee_assignment.employee.salaries.hourly))
        return self.amount
    
    @classonlymethod
    def pay(cls, assignment, employee, date, amount):
        super(Pay, cls).pay(employee=employee, date=date, amount=amount)
        try:
            self.employee_assignment = EmployeeAssignment.objects.get(assignment=assignment, employee=employee)
        except EmployeeAssignment.DoesNotExist:
            return None
        return this.save()
   