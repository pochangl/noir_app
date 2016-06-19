#-*- coding: utf-8 -*-
from django.db import models
from utils.models import TimeStampModel

from account.models import Contact, Client, Employee


# Create your models here.
class Project(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='projects')
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class EmployeeProject(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='employee_projects')
    project = models.ForeignKey(Project, related_name='employee_projects')

    def __str__(self):
        return "%s - %s" % (self.project.name, self.employee.contact.name)


class Assignment(TimeStampModel):
    employeeproject = models.ForeignKey(EmployeeProject, related_name='assignment')
    assignment = models.CharField(max_length=128)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    status = models.CharField(max_length=128)
    pay = models.IntegerField()
    actual_pay = models.IntegerField()

    def __repr__(self):
        return self.employeeproject
