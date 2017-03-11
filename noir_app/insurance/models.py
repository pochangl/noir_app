import datetime
from django.db import models
from django.db.models import Max, F
from django.utils.decorators import classonlymethod
from django.utils.timezone import now
from account.models import Employee
from utils.models import TimeStampModel


class Insurance(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='insurances')
    date = models.DateField()
    action = models.CharField(max_length=8, choices = (
        ('add', 'add'),
        ('remove', 'remove'),
    ))

    class Meta:
        unique_together = (('date', 'employee'),)

    @classonlymethod
    def is_insuranced(cls, employee, date):
        try:
            insurance = employee.insurances.filter(date__lte=date).latest('create_time')
        except Insurance.DoesNotExist:
            return False
        return insurance.action == 'add'

    @classonlymethod
    def get_ids(cls, employees):
        return [employee.id for employee in employees]
