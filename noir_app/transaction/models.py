from django.db import models
from utils.models import TimeStampModel
from account.models import Employee
# Create your models here.

class Transaction(TimeStampModel):
    amount = models.IntegerField()
    comment = models.TextField()


class PayCheck(Transaction):
    employee = models.ForeignKey(Employee, related_name='paychecks')


class Debt(Transaction):
    employee = models.ForeignKey(Employee, related_name='debts')


class Receivable(Transaction):
    client = models.ForeignKey(Client)

