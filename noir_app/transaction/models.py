#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from account.models import Client, Employee

# Create your models here.
class Transaction(TimeStampModel):
    amount = models.IntegerField(null=True, blank=True)
    note = models.CharField(max_length=1024, null=True, blank=True)
#    class Meta:
#        abstract = True
        #將Transaction轉為虛擬的table,避免徒增一堆transaction的資料;
        #但Debt,Receivable,PayCheck會抓不到東西,故改回原來的
        
class Debt(Transaction):
    employee = models.ForeignKey(Employee, related_name='debts')
  
#     @property
#     def employee(self):
#         return self.employee
    
    def __str__(self):
        return self.employee.contact.name

    
class Receivable(Transaction):
    client = models.ForeignKey(Client, related_name='receivables')

    def __str__(self):
        return self.client.company


class PayCheck(Transaction):
    employee = models.ForeignKey(Employee, related_name='paychecks')
    reason_code = models.CharField(max_length=128)
    reason = models.CharField(max_length=128)

    def __str__(self):
        return self.employee.contact.name
