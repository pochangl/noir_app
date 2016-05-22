from django.db import models
from utils.models import TimeStampModel
from account.models import Client, Employee

# Create your models here.


class Project(TimeStampModel):
    client = models.ForeignKey(Client, related_name='projects')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class EmployeeProject(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='projects')
    project = models.ForeignKey(Project, related_name='employees')

    def __int__(self):
        return self.id


class Assignment(TimeStampModel):
    employeeproject_id = models.ForeignKey(EmployeeProject, related_name='employeeproject_id')

    def __int__(self):
        return self.id


class Blacklist(TimeStampModel):

    def __int__(self):
        return id
