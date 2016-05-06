from django.db import models
from utils.models import TimeStampModel
from account.models import Employee
# Create your models here.


class PayCheck(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='paycheck_employee_id')
    amount = models.CharField(max_length=128)
    reason_code = models.CharField(max_length=128)
    reason = models.CharField(max_length=128)


    def __str__(self):
        return id
