#-*- coding: utf-8 -*-
from django.db import models
from utils.models import TimeStampModel, EndorsedModel, VersionedModel
from django.utils.translation import ugettext as _
from transaction.models import AccountBalance
from account.models import Contact, Client, Employee, EmployeeList
from html5lib import filters
from datetime import datetime, time, date, timedelta

# Create your models here.
path = FileSystemStorage(location='/media/photos')

class Project(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='projects')
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
    

class ProposedEmployeeList(EndorsedModel, VersionedModel, EmployeeList):
    # bug proposed list can conflict
    assignment = models.ForeignKey("project.Assignment", related_name="proposed_employees_history")

    class Meta:
        unique_together = (("version", "assignment"),)


class Assignment(TimeStampModel):
    project = models.ForeignKey(Project, related_name='assignments')
    proposed_employees = models.ForeignKey(ProposedEmployeeList, null=True, related_name="assignment2")
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

    def propose(self, user, employees):
        previous = self.proposed_employees
        self.proposed_employees = current = ProposedEmployeeList(assignment=self)
        if self.proposed_employees is not None:
            current.version = previous.version + 1
        self.propose(employees)
        self.save()

    def confirmer(self, user):
        self.proposed_employees.confirm(user)

    def endorse(self, user):
        self.proposed_employees.endorse(user)
        employees = self.proposed_employees.employees.all()

        # remove irrelevant employees
        not_involed = this.employees.exclude(employee__in=employees)
        this.employees.remove(not_invoved)

        # add relevant employees
        relevents = set(employees) - this.employees.all()
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
    hours = models.PositiveIntegerField(default=0) # 現場派工工作時數
    overtime = models.PositiveIntegerField(default=0) # 現場派工加班時數

    class Meta:
        unique_together = (("employee", "assignment"),)


class Pay(PersonalIncome):
    employee_assignment = models.OneToOneField(EmployeeAssignment, related_name="pay")

    def __init__(self, *args, **kwargs):
        super(Pay, self).__init__(*args, **kwargs)
        this.note = "pay"