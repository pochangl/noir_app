#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from django.core.files.storage import FileSystemStorage
from datetime import datetime, time, date
from django.utils.decorators import classonlymethod
from tastypie.admin import ABSTRACT_APIKEY
from account.models import Company, Employee
# from project.models import EmployeeAssignment

# Create your models here.
path = FileSystemStorage(location='/media/photos')

class AbstractAccountBalance(TimeStampModel):
#     previous = models.ForeignKey("transaction.AccountBalance")  #尚未定義transaction.AccountBalnace
    balance = models.PositiveIntegerField()
    income = models.PositiveIntegerField(default=0)
    expense = models.PositiveIntegerField(default=0)
    note = models.CharField(max_length=1024, null=True, blank=True)
    date = models.DateField(default=datetime.now) # 實際收入/支出日期

    @classonlymethod
    def withdraw(cls, amount):
        raise NotImplemented()

    class Meta:
        abstract = True


class AccountBalance(AbstractAccountBalance):
    # 公司總計帳戶
    pass


class OthersAccountBalance(AbstractAccountBalance):
    class Meta:
        abstract = True

class CompanyBalance(OthersAccountBalance):
    # 合作公司的帳戶
    company = models.ForeignKey(Company, related_name='external_balances')

class PersonalAccountBalance(OthersAccountBalance):
    # 個人的戶頭
    employee = models.ForeignKey(Employee, related_name='my_balance')

    def __str__(self):
        return self.employee.contact.name

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
# class PersonalIncome(PersonalAccountBalance, EmployeeAssignment, Salary):
    # please verify
#     @receiver
#     def latest_salary(pre_save, sender=Salary):
#         try:
#             return salaries.order_by('-salaries.start_time')[0]
#         except IndexError:
#             return None
#         
#     @receiver(pre_save, sender=EmployeeAssignment)
#     def income(sender, **kwargs):
#         self.income = EmployeeAssignment.minutes/60 * latest_salary.hourly + EmployeeAssignment.overminutes/60 * latest_salary.overtime
#         self.income.save()
#         return self.income        
    pass
