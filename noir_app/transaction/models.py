#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from account.models import Client, Employee


class Transaction(TimeStampedModel):
    amount = models.IntegerField()
    note = models.CharField(max_length=1024)

# Create your models here.
class Debt(Transaction):
    def __int__(self):
        return self.id


class Receivable(Transaction):
    client = models.ForeignKey(Client, related_name='receivables')

    def __int__(self):
        return self.id


class PayCheck(Transaction):
    employee = models.ForeignKey(Employee, related_name='paychecks')
    amount = models.IntegerField()
    reason_code = models.CharField(max_length=128)
    reason = models.CharField(max_length=128)
    paycheck = models.CharField(max_length=128)

    def __int__(self):
        return self.id
