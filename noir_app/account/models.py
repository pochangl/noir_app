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


class Client(TimeStampModel):
    company = models.CharField(max_length=128)

    def __str__(self):
        return self.company


class Employee(TimeStampModel):
    contact = models.OneToOneField("account.Contact", related_name='employees')
    debt = models.ForeignKey("transaction.Debt", related_name='employees')
    title = models.CharField(max_length=128)

    def __int__(self):
        return self.id
    

class Skill(Employee):
    employee = models.ForeignKey("account.Employee", related_name='skills')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class EmployeeProject(TimeStampModel):
    employee = models.ForeignKey("account.Employee", related_name='employee_projects')
    project = models.ForeignKey("project.Project", related_name='employee_projects')

    def __int__(self):
        return self.id


class EmployeePreference(TimeStampModel):
    employee_project = models.ForeignKey("account.EmployeeProject", related_name='employee_preference')
    employee_preference = models.CharField(max_length=128)

    def __int__(self):
        return self.id


class ProjectPreference(TimeStampModel):
    employee_project = models.ForeignKey("account.EmployeeProject", related_name='project_preference')
    employee_priority = models.CharField(max_length=128)
    project_priority = models.CharField(max_length=128)

    def __int__(self):
        return self.id


class DayOff(TimeStampModel):
    employee = models.ForeignKey("account.Employee", related_name='dayoffs')
    start_time = models.DateTimeField(auto_now = False)
    end_time = models.DateTimeField(auto_now = False)

    def __int__(self):
        return self.id


class Blacklist(TimeStampModel):

    def __int__(self):
        return id
