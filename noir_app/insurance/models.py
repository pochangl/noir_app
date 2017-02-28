from account.models import Employee
from django.db import models
from utils.models import TimeStampModel


class Insurance(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='insurances')
    date = models.DateField(db_index=True)

    class Meta:
        unique_together = (('employee', 'date'),)
