#-*- coding: utf-8 -*-
# Circular import dependency in Python,將project.models移至account.models
from django.db import models
from utils.models import TimeStampModel
from datetime import datetime, time, date
from django.utils import timezone
from django.utils.decorators import classonlymethod
from tastypie.admin import ABSTRACT_APIKEY
from account.models import Company, Employee
from django.dispatch import Signal
from django.dispatch.dispatcher import receiver
from django.db.models.signals import pre_save, post_save
from django.db.models.deletion import CASCADE, DO_NOTHING, PROTECT

# Create your models here.
class AccountSettledException(Exception):
    pass


class BaseAccountBalance(TimeStampModel):
    balance = models.PositiveIntegerField(default=0)
    income = models.PositiveIntegerField(default=0)
    expense = models.PositiveIntegerField(default=0)
    note = models.CharField(max_length=1024, blank=True, default="")
    date = models.DateTimeField(default=timezone.now) # 實際收入/支出日期
    is_settled = models.BooleanField(default=False)

    @classonlymethod
    def withdraw(cls, amount):
        raise NotImplemented()

    # self.settling_status will get current status, so here we use property
    @property
    def settling_status(self):
        return PersonalAccountBalance.objects.get(id=self.id).is_settled
    
    def save(self, *args, **kwargs):
        if self.id is None or self.settling_status is False:
            super(BaseAccountBalance, self).save(*args, **kwargs)
        elif self.is_settled is False:
            super(BaseAccountBalance, self).save(*args, **kwargs)
        else:
            # if account have been settled, don't save the changes
            raise  AccountSettledException("Oops! This (BaseAccountBalance) Record Has Been Settled.")

    def latest_settled_record(self):
        if employee is None:
            try:
                return self.objects.get(is_settled=True).latest("date")            
            except:
                BaseAccountBalance.DoesNotExist
        else:
            try:
                return self.objects.get(employee=employee, is_settled=True).latest("date")            
            except:
                BaseAccountBalance.DoesNotExist
            
    def unsettled_records(self, from_date=None, to_date=None):
        try:
            return self.objects.order_by("date").filter(is_settled=False, date__gte=from_date, date__lte=to_date)
        except IndexError:
            return None
        
    def settle_all_records(self):
#         for record in self.unsettled_records(from_date, to_date):
#         for record in self.objects.order_by("date").filter(is_settled=False, date__gte=from_date, date__lte=to_date):
#         if self.objects.order_by("date").filter(is_settled=False, date__gte=from_date, date__lte=to_date)[0]:
#             record.is_settled = True
#             print record
#             record.save()
        return None
            
        
class AccountBalance(BaseAccountBalance):
    due_to = models.OneToOneField(BaseAccountBalance, on_delete=CASCADE, related_name="account_balance")
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
    
#     @classonlymethod
#     def latest_settled_record(cls, employee):
#         """
#             PersonalAccountBalance.latest_settled_record(employee)
#         """
#         try:
#             return cls.objects.order_by("-date").filter(is_settled=True, employee=employee)[0]
#         except IndexError:
#             return None


# 
#     def settle_account(self, employee, to_date):
#         pass
    
#     # recalculate all records' balances, which is not settled yet.
#     def rebalance_unsettled_records(self):
#         latest_settled_record = PersonalAccountBalance.latest_settled_record(self.employee)
#         if latest_settled_record is not None and unsettled_records is not None:
#             prev_balance = latest_settled_record.balance
# #             unsettled_records = self.unsettled_records
# #             list_length = range(len(unsettled_records))
# #             for index in list_length:
# #                 unsettled_records[index].balance = prev_balance + unsettled_records[index].income - unsettled_records[index].expense
# #                 unsettled_records[index].save()
# #                 prev_balance = unsettled_records[index].balance
#      
#             for record in self.unsettled_records:
#                 record.balance = prev_balance + record.income - record.expense
#                 record.save()
#                 prev_balance = record.balance
#         else:
#             pass    # 若無相對應資料則pass

    
    
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

# 用此方法,會使BaseAccountBalance的income/expense相反
# AccountBalance（公司）與PersonalAccountBalance（個人）的income/expense相反
@receiver(post_save, sender=PersonalAccountBalance)
def pay_given(instance, created, **kwargs):
    if created:
        balance = AccountBalance(due_to=instance, income=instance.expense, expense=instance.income, date=instance.date, note=instance.note)
#         balance = AccountBalance(due_to=instance, income=instance.income, expense=instance.expense, date=instance.date, note=instance.note, create_time=instance.create_time)
        balance.save()
    else:
        AccountBalance.objects.filter(due_to=instance).update(income=instance.expense, expense=instance.income, date=instance.date, note=instance.note)
#         AccountBalance.objects.filter(due_to=instance).update(due_to=instance, income=instance.income, expense=instance.expense, date=instance.date, note=instance.note)
