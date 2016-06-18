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
    contact = models.ForeignKey(Contact, related_name='employees')
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.contact.name


class Skill(Employee):
    employee = models.ForeignKey(Employee, related_name='skills')
    name = models.CharField(max_length=128)

    def __str__(self):
        return "%s - %s" % (self.employee, self.name)
