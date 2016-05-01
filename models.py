# mysite/firstapp/models.py
#-*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class Client(models.Model):
    id = models.AutoField('client_id',primary_key=True)
    company = models.CharField('company',max_length=128)
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.company


class Project(models.Model):
    id = models.AutoField('project_id',primary_key=True)
    client_id = models.ForeignKey(Client,related_name='client_id')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.id


class Contact(models.Model):
    id = models.AutoField('contact_id',primary_key=True)
    name = models.CharField('name',max_length=128)
    title = models.CharField('title',max_length=128)
    address = models.CharField('address',max_length=128)
    phone = models.IntegerField('phone')
    mobile = models.IntegerField('mobile')
    pid = models.CharField('pid',max_length=128)
    birthday = models.DateField()
    project_id = models.ForeignKey(Project,related_name='project_ids')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.name

class Employee(models.Model):
    id = models.AutoField('emplyee_id',primary_key=True)
    title = models.CharField('title',max_length=128)
    contact_id = models.ForeignKey(Contact,related_name='contact_ids')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.title


class User(models.Model):
    id = models.AutoField('id',primary_key=True)
    username = models.CharField('username',max_length=128)
    email = models.EmailField()
    password = models.CharField('password',max_length=128)
    client_id = models.ForeignKey(Client,related_name='client_ids')
    employee_id = models.ForeignKey(Employee,related_name='employee_ids')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.username


class EmployeeProject(models.Model):
    id = models.AutoField('employeeproject_id',primary_key=True)
    employee_id = models.ForeignKey(Employee,related_name='employee_id')
    project_id = models.ForeignKey(Project,related_name='project_id')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.id

class Assignment(models.Model):
    id = models.AutoField('assignment_id',primary_key=True)
    employeeproject_id = models.ForeignKey(EmployeeProject,related_name='employeeproject_id')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.id


class Skill(models.Model):
    id = models.AutoField('skill_id',primary_key=True)
    name = models.CharField('skill_name',max_length=128)
    employee_id = models.ForeignKey(Employee,related_name='skill_employee_id')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return self.name

class PayCheck(models.Model):
    id = models.AutoField('paycheck_id',primary_key=True)
    amount = models.CharField('amount',max_length=128)
    reason_code = models.CharField('reason_code',max_length=128)
    reason = models.CharField('reason',max_length=128)
    employee_id = models.ForeignKey(Employee,related_name='paycheck_employee_id')
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return id


class Blacklist(models.Model):
    id = models.AutoField('blacklist_id',primary_key=True)
    create_time = models.DateTimeField()
    modify_time = models.DateTimeField()

    def __str__(self):
        return id

