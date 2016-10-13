#-*- coding: utf-8 -*-
from django.db import models
from utils.models import TimeStampModel

from account.models import Contact, Client, Employee
from html5lib import filters


# Create your models here.
class Project(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='projects')
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name



class Assignment(TimeStampModel):
    """
        Bug: please fix assignment conflict
    """
    project = models.ForeignKey(Project, related_name='assignments')
#     employee_assignment = models.ForeignKey(EmployeeAssignment, related_name='assignments')
    assignment = models.CharField(max_length=128)
    start_date = models.DateField()
    end_date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    status = models.CharField(max_length=128)
    assignee = models.ForeignKey('auth.User')
    number_needed = models.IntegerField(null=True, blank=True)
    serial = models.CharField(max_length=128)
        
#     @property
#     def employee(self):
#         return self.employee_assignment.employee
#       
#     @property
#     def project(self):
#         return self.employee_assignment.project

    def __str__(self):
        return self.serial
    

class EmployeeAssignment(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='employee_assignments')
    assignment = models.ForeignKey(Assignment, related_name='employee_assignments')
    selected = models.BooleanField()
    check_in = models.DateTimeField()
    check_out = models.DateTimeField()
    pay = models.IntegerField()
    actual_pay = models.IntegerField()

    def __str__(self):
        return "%s - %s" % (self.assignment.serial, self.employee.contact.name)

#     class Meta:
#         unique_together = (("employee", "assignment"),)

