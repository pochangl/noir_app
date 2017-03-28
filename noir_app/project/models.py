#-*- coding: utf-8 -*-
from django.db import models
from django.db.models import Max
from utils.models import TimeStampModel, EndorsedModel, VersionedModel
from django.utils.translation import ugettext as _
from transaction.models import PersonalAccountBalance, Salary
from account.models import Contact, Company, Employee, EmployeeList
from html5lib import filters
from datetime import datetime, time, date, timedelta
from rest_framework import exceptions
from django.utils.decorators import classonlymethod
from django.dispatch import Signal
from django.dispatch.dispatcher import receiver
from django.db.models.signals import post_save, pre_delete
from django.db.models.deletion import CASCADE
from tensorflow.python.ops import check_ops

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
        self.employees.remove(not_involed)

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
    
#     def save(self, *args, **kwargs):
# #         is_settled = False
# #         try:
# #             is_settled = PersonalAccountBalance.objects.get(employee_assignment=self, employee=self.employee).is_account_settled
# #         except PersonalAccountBalance.DoesNotExist:
# #             pass
# #         except is_settled is True:
# #             raise "Error! This record has been settled."
#         super(EmployeeAssignment, self).save(*args, **kwargs)
#         try:
#             corresponding_pay = Pay.objects.get(employee_assignment=self, employee=self.employee)
#         except Pay.DoesNotExist:
#             corresponding_pay = Pay(employee_assignment=self, employee=self.employee)
#         try:
# #             corresponding_pay.salary = Salary.objects.get(employee=self.employee, start_time__lte=self.work_date).latest('start_time')[0]    #this shows error
#             corresponding_pay.salary = Salary.objects.order_by("-start_time").filter(employee=self.employee, start_time__lte=self.work_date)[0]
#             corresponding_pay.income = corresponding_pay.employee_assignment.hours * corresponding_pay.salary.hourly + corresponding_pay.employee_assignment.overtime * corresponding_pay.salary.overtime
#         except Salary.DoesNotExist:
#             pass
#         return corresponding_pay.save()
        
    def __str__(self):
        return "%s: %s" % (self.assignment.project.name, self.employee.contact.name)
    
    
class Pay(PersonalAccountBalance):
    employee_assignment = models.OneToOneField(EmployeeAssignment, on_delete=CASCADE, related_name="pays")
    salary = models.ForeignKey(Salary, related_name="pays", null=True, blank=True) #whatif the salary is deleted?

    def __init__(self, *args, **kwargs):
        super(Pay, self).__init__(*args, **kwargs)
        self.note = "pay"
        
    @classonlymethod
    def pay(cls, assignment, employee, date, amount):
        super(Pay, cls).pay(employee=employee, date=date, amount=amount)
        try:
            self.employee_assignment = EmployeeAssignment.objects.get(assignment=assignment, employee=employee)
        except EmployeeAssignment.DoesNotExist:
            return None
        return this.save()
    
@receiver(pre_delete, sender=EmployeeAssignment)
def ea_deleted(instance, **kwargs):
    if Pay.objects.get(employee_assignment=instance, employee=instance.employee).is_account_settled is True:
        raise Exception("Error! This Record Has Been Settled.")

@receiver(post_save, sender=EmployeeAssignment)
def ea_saved(instance, created, **kwargs):
    try:
        corresponding_pay = Pay.objects.get(employee_assignment=instance, employee=instance.employee)
    except Pay.DoesNotExist:
        corresponding_pay = Pay(employee_assignment=instance, employee=instance.employee)
    try:
#             corresponding_pay.salary = Salary.objects.get(employee=instance.employee, start_time__lte=instance.work_date).latest('start_time')[0]    #this shows error
        corresponding_pay.salary = Salary.objects.order_by("-start_time").filter(employee=instance.employee, start_time__lte=instance.work_date)[0]
        corresponding_pay.income = corresponding_pay.employee_assignment.hours * corresponding_pay.salary.hourly + corresponding_pay.employee_assignment.overtime * corresponding_pay.salary.overtime
    except Salary.DoesNotExist:
        pass
    return corresponding_pay.save()

        
# @receiver(post_save, sender=EmployeeAssignment)
# def assignment_endorsed(instance, created, **kwargs):
#     #find date range between selected date and the days after the selected date
#     #re-calculate all datas
#     if created:
# #         AttributeError: 'Salary' object has no attribute 'latest'
# #         last_salary = Salary.objects.get(employee=instance.employee, start_time__lte=instance.work_date).latest('start_time')
#         try:
#             last_salary = Salary.objects.order_by("-start_time").filter(employee=instance.employee, start_time__lte=instance.work_date)[0]
#         except Salary.DoesNotExist:
#             return None
# #             IndexError: list index out of range => this bug has not been fixed yet
#         try:
# #             IndexError: list index out of range
# #             last_pay = Pay.objects.get(employee=instance.employee, date__lte=instance.work_date).latest('date')
#             last_pay = Pay.objects.order_by("-date").filter(employee=instance.employee, date__lte=instance.work_date)[0]
#         except Pay.DoesNotExist:
#             last_balance = 0
#         else:
#             last_balance = last_pay.balance
#         new_income = instance.hours * last_salary.hourly + instance.overtime * last_salary.overtime
#         new_balance = last_balance + new_income
#         pay = Pay(employee_assignment=instance, employee=instance.employee, salary=last_salary, balance=new_balance, income=new_income, expense=0, date=instance.work_date, note="pay", create_time=datetime.now)
#         pay.save()
#     else:
# #         pay = Pay.objects.get(employee_assignment=instance, date__lte=instance.work_date).latest('date')
#         pay = Pay.objects.order_by("-date").filter(employee_assignment=instance, date__lte=instance.work_date)[0]
#         old_income = pay.income
#         new_income = instance.hours * pay.salary.hourly + instance.overtime * pay.salary.overtime
#         pay.balance = pay.balance + (new_income - old_income)
#         pay.income = new_income
#         pay.save()
