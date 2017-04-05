#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from datetime import datetime, time, date
from django.utils.decorators import classonlymethod
from tastypie.admin import ABSTRACT_APIKEY
from account.models import Company, Employee
from django.dispatch import Signal
from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save, post_save
from django.db.models.deletion import CASCADE, DO_NOTHING, PROTECT

# Create your models here.

class BaseAccountBalance(TimeStampModel):
    balance = models.PositiveIntegerField(default=0)
    income = models.PositiveIntegerField(default=0)
    expense = models.PositiveIntegerField(default=0)
    note = models.CharField(max_length=1024, blank=True, default="")
    date = models.DateField(default=datetime.now) # 實際收入/支出日期
    is_account_settled = models.BooleanField(default=False)
    
    @classonlymethod
    def withdraw(cls, amount):
        raise NotImplemented()

    # self.settling_status will get current status, so here we use property
    @property
    def settling_status(self):
        return BaseAccountBalance.objects.get(id=self.id).is_account_settled

    @property
    def latest_settled_record(self):
        try:
            return PersonalAccountBalance.objects.order_by("-date").filter(is_account_settled=True, employee=self.employee)[0]
        except IndexError:
            return None
        
    def save(self, *args, **kwargs):
        if self.id is None or self.settling_status is False:
            super(BaseAccountBalance, self).save(*args, **kwargs)
        else:
            # if account have been settled, don't save the changes
            raise Exception("Error! This (BaseAccountBalance) Record Has Been Settled.")

        
class AccountBalance(BaseAccountBalance):
    due_to = models.OneToOneField(BaseAccountBalance, unique=True, on_delete=CASCADE, related_name="account_balance")
    # 公司總計帳戶


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
        return PersonalAccountBalance.objects.create(employee=employee, date=date, income=amount, note=pay)
    
    @property
    def unsettled_record_list(self, employee):
        try:
            return PersonalAccountBalance.objects.order_by("-date").filter(is_account_settled=False, employee=employee, date__gte=latest_settled_record.date)
        except PersonalAccountBalance.DoesNotExist:
            return None

    
class PersonalWithdraw(PersonalAccountBalance):
    signature = models.ImageField(upload_to="signature", null=True, blank=True)

    def __init__(self, *args, **kwargs):
        super(PersonalWithdraw, self).__init__(*args, **kwargs)
        this.note = "withdraw"


class Salary(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name="salaries")
    hourly = models.PositiveIntegerField() # hourly pay正常時薪
    overtime = models.PositiveIntegerField() # overtime pay加班時薪
    start_time = models.DateTimeField(default=datetime.now)
    
    class Meta:
        unique_together = (("employee", "start_time"),)
    
    def __str__(self):
        return "%s: %s" % (self.employee.contact.name, self.start_time.date())
 
 
class PersonalIncome(PersonalAccountBalance):
    class Meta:
        abstract =True


@receiver(post_save, sender=PersonalAccountBalance)
def pay_given(instance, created, **kwargs):
    if created:
        balance = AccountBalance(due_to=instance, income=instance.expense, expense=instance.income, date=instance.date, note=instance.note, create_time=instance.create_time)
        balance.save()
    else:
        AccountBalance.objects.filter(due_to=instance).update(due_to=instance, income=instance.expense, expense=instance.income, date=instance.date, note=instance.note)
