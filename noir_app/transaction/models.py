#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from datetime import datetime, time, date
from django.utils.decorators import classonlymethod
from tastypie.admin import ABSTRACT_APIKEY
from account.models import Company, Employee
from django.core.signals import 
from django.dispatch import Signal
from django.dispatch.dispatcher import receiver
from django.db.models.signals import ModelSignal

balance_updated = ModelSignal(providing_args=['balance'])

# Create your models here.

class BaseAccountBalance(TimeStampModel):
    balance = models.PositiveIntegerField()
    income = models.PositiveIntegerField(default=0)
    expense = models.PositiveIntegerField(default=0)
    note = models.CharField(max_length=1024, blank=True, default="")
    date = models.Date(default=datetime.now) # 實際收入/支出日期

    @classonlymethod
    def withdraw(cls, amount):
        raise NotImplemented()


class AccountBalance(BaseAccountBalance):
    due_to = BaseAccountBalance()
    # 公司總計帳戶
    pass


class OthersAccountBalance(BaseAccountBalance):
    class Meta:
        abstract = True

class CompanyBalance(OthersAccountBalance):
    # 合作公司的帳戶
    company = models.ForeignKey(Company, related_name='external_balances')

class PersonalAccountBalance(OthersAccountBalance):
    # 個人的戶頭
    employee = models.ForeignKey(Employee, related_name='my_balances')

    def __str__(self):
        return self.employee.contact.name

    @classonlymethod
    def pay(cls, employee, date, amount):
        instance = PersonalAccountBalance(employee=employee, date=date, income=amount, note=pay)
        signal.send(sender=PersonalAccountBalance, balance=instance)

class PersonalWithdraw(PersonalAccountBalance):
    signature = models.ImageField(storage=path, null=True, blank=True)

    def __init__(self, *args, **kwargs):
        super(PersonalWithdraw, self).__init__(*args, **kwargs)
        this.note = "withdraw"


class Salary(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name="salaries")
    hourly = models.PositiveIntegerField() # hourly pay正常時薪
    overtime = models.PositiveIntegerField() # overtime pay加班時薪
    start_time = models.DateTimeField()
    
    
class PersonalIncome(PersonalAccountBalance):
    class Meta:
        abstract =True


@receiver(sender=PersonalAccountBalance)
def pay_given(balance):
    AccountBalance.objects.create(due_to=balance, income=balance.expense, expense=balance.income, date=balance.date, note=balance.note)
