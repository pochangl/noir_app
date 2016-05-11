from django.db import models
from utils.models import TimeStampModel


# Create your models here.
class Client(TimeStampModel):
    company_name = models.CharField(max_length=128)

    def __str__(self):
        return self.company_name


class Contact(TimeStampModel):
    name = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    phone = models.IntegerField()
    mobile = models.IntegerField()
    birthday = models.DateField()

    def __str__(self):
        return self.name


class Employee(TimeStampModel):
    contact = models.OneToOneField(Contact, related_name='employees')
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.title


class Skill(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='skills')
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
