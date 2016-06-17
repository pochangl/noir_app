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
    employeeproject = models.ForeignKey("account.EmployeeProject", related_name='assignment', null=True, blank=True)
    #id = models.IntegerField(null=True, blank=True)
    assignment = models.CharField(max_length=128, null=True, blank=True)
    start_time = models.DateTimeField(auto_now=False, null=True, blank=True)
    end_time = models.DateTimeField(auto_now=False, null=True, blank=True)
    check_in = models.DateTimeField(auto_now=False, null=True, blank=True)
    check_out = models.DateTimeField(auto_now=False, null=True, blank=True)
    status = models.CharField(max_length=128, null=True, blank=True)
    pay = models.IntegerField(null=True, blank=True)
    actual_pay = models.IntegerField(null=True, blank=True)
    
    def __int__(self):
        return self.id
    