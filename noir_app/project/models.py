#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel


# Create your models here.
class Project(TimeStampModel):
    contact = models.OneToOneField("account.Contact", related_name='projects')
    client = models.ForeignKey("account.Client", related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

class Assignment(TimeStampModel):
    employeeproject = models.ForeignKey("account.EmployeeProject", related_name='assignment')
    assignment = models.CharField(max_length=128)
    start_time = models.DateTimeField(auto_now = False)
    end_time = models.DateTimeField(auto_now = False)
    check_in = models.DateTimeField(auto_now = False)
    check_out = models.DateTimeField(auto_now = False)
    status = models.CharField(max_length=128)
    pay = models.IntegerField()
    actual_pay = models.IntegerField()
    
    def __int__(self):
        return self.id
