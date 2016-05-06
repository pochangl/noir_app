from django.db import models
from utils.models import TimeStampModel
from account.models import Client, Employee

# Create your models here.


class Project(TimeStampModel):
    client = models.ForeignKey(Client, related_name='projects')

    def __str__(self):
        return self.id


class EmployeeProject(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='projects')
    project = models.ForeignKey(Project, related_name='employees')

    def __str__(self):
        return self.id


class Assignment(TimeStampModel):
    employeeproject_id = models.ForeignKey(EmployeeProject, related_name='employeeproject_id')

    def __str__(self):
        return self.id


class Blacklist(TimeStampModel):

    def __str__(self):
        return id