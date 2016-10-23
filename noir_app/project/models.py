#-*- coding: utf-8 -*-
from django.db import models
from utils.models import TimeStampModel

from account.models import Contact, Client, Employee
from html5lib import filters
from datetime import datetime, time, date, timedelta

# Create your models here.
class Project(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='projects')
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name



class Assignment(TimeStampModel):
    project = models.ForeignKey(Project, related_name='assignments')
    comment = models.CharField(max_length=1024, blank=True, default="")
    start_datetime = models.DateTimeField(default=datetime.now)
    end_datetime = models.DateTimeField(default=datetime.now)
    approved = models.BooleanField(default=False)
    assignee = models.ForeignKey('auth.User')
    number_needed = models.PositiveIntegerField(default=1)
    serial = models.CharField(max_length=128)
    
    def __str__(self):
        return self.project.name
    

class EmployeeAssignment(TimeStampModel):
    """
        Bug: employee may be assigned to multiple project, which is undesirable.
    """
    employee = models.ForeignKey(Employee, related_name='employee_assignments')
    assignment = models.ForeignKey(Assignment, related_name='employee_assignments')
    selected = models.BooleanField()
    check_in = models.DateTimeField(null=True,blank=True, default="")
    check_out = models.DateTimeField(null=True,blank=True, default="")
    pay = models.IntegerField()
    actual_pay = models.IntegerField(null=True,blank=True, default=0)

    def __str__(self):
        return "%s - %s" % (self.assignment.serial, self.employee.contact.name)

#     unique_together需用日期區分開來？
#     class Meta:
#         unique_together = (("employee", "assignment"),)

