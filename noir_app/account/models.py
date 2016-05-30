#-*- coding: utf-8 -*-
from django.db import models
from utils.models import TimeStampModel
# Circular import dependency in Python,將project.models及transaction.models移至account.models

# Create your models here.
class Contact(TimeStampModel):
    name = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    phone = models.IntegerField()
    mobile = models.IntegerField()
    pid = models.CharField(max_length=128)
    birthday = models.DateField()
    
    def __str__(self):
        return self.name


class Debt(TimeStampModel):
    amount = models.IntegerField()
    def __int__(self):
        return self.id


class Client(TimeStampModel):
    company = models.CharField(max_length=128)

    def __str__(self):
        return self.pk


class Project(TimeStampModel):
    contact = models.OneToOneField(Contact, related_name='projects')
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

     
class Receivable(TimeStampModel):
    client = models.OneToOneField(Client, related_name='receivable')

    def __int__(self):
        return self.id


class Employee(TimeStampModel):
    contact = models.OneToOneField(Contact, related_name='employees')
    debt = models.ForeignKey(Debt, related_name='employees')
    title = models.CharField(max_length=128)

    def __int__(self):
        return self.id


class PayCheck(TimeStampModel):
    employee = models.OneToOneField(Employee, related_name='paychecks')
    amount = models.IntegerField()
    reason_code = models.CharField(max_length=128)
    reason = models.CharField(max_length=128)
    paycheckcol = models.CharField(max_length=128)
    
    def __int__(self):
        return self.id
    
    
class Transaction(TimeStampModel):
    receivable = models.OneToOneField(Receivable, related_name='transactions')
    paycheck = models.OneToOneField(PayCheck, related_name='transactions')
    #paycheck_employee = models.ForeignKey(PayCheckEmployee, related_name='transactions')

    def __int__(self):
        return self.id


class Skill(Employee):
    employee = models.ForeignKey(Employee, related_name='skills')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class EmployeeProject(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='employee_projects')
    project = models.ForeignKey(Project, related_name='employee_projects')

    def __int__(self):
        return self.id


class EmployeePreference(TimeStampModel):
    employee_project = models.ForeignKey(EmployeeProject, related_name='employee_preference')
    employee_preferencecol = models.CharField(max_length=128)

    def __int__(self):
        return self.id


class ProjectPreference(TimeStampModel):
    employee_project = models.ForeignKey(EmployeeProject, related_name='project_preference')
    employee_priority = models.CharField(max_length=128)
    project_priority = models.CharField(max_length=128)

    def __int__(self):
        return self.id


class DayOff(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='dayoffs')
    start_time = models.DateTimeField(auto_now = False)
    end_time = models.DateTimeField(auto_now = False)

    def __int__(self):
        return self.id


class Assignment(TimeStampModel):
    employeeproject = models.ForeignKey(EmployeeProject, related_name='assignment')
    assignmentcol = models.CharField(max_length=128)
    start_time = models.DateTimeField(auto_now = False)
    end_time = models.DateTimeField(auto_now = False)
    check_in = models.DateTimeField(auto_now = False)
    check_out = models.DateTimeField(auto_now = False)
    status = models.CharField(max_length=128)
    pay = models.IntegerField()
    actual_pay = models.IntegerField()
    
    def __int__(self):
        return self.id


class Blacklist(TimeStampModel):

    def __int__(self):
        return id
