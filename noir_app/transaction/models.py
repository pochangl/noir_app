#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel


# Create your models here.
class Debt(TimeStampModel):
    amount = models.IntegerField()

    def __int__(self):
        return self.id
    
         
class Receivable(TimeStampModel):
    client = models.OneToOneField("account.Client", related_name='receivable')

    def __int__(self):
        return self.id


class PayCheck(TimeStampModel):
    employee = models.OneToOneField("account.Employee", related_name='paychecks')
    amount = models.IntegerField()
    reason_code = models.CharField(max_length=128)
    reason = models.CharField(max_length=128)
    paycheck = models.CharField(max_length=128)
    
    def __int__(self):
        return self.id
    
    
class Transaction(TimeStampModel):
    receivable = models.OneToOneField("transaction.Receivable", related_name='transactions')
    paycheck = models.OneToOneField("transaction.PayCheck", related_name='transactions')
    #paycheck_employee = models.ForeignKey(PayCheckEmployee, related_name='transactions')

    def __int__(self):
        return self.id
    