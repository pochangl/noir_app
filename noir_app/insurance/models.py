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

    @classonlymethod
    def is_insuranced(cls, employee, date):
        end_of_time = datetime.datetime.combine(date, datetime.time(hour=23, minute=59, second=59))
        try:
            insurance = employee.insurances.filter(date__lte=end_of_time).latest('create_time')
        except Insurance.DoesNotExist:
            return False

        return insurance.action == 'add'

    @classonlymethod
    def get_ids(cls, employees):
        return [employee.id for employee in employees]

    @classonlymethod
    def add(cls, employees, date):
        for employee in employees:
            if not Insurance.is_insuranced(employee, date):
                Insurance.objects.create(employee=employee, action="add", date=date)
        
    @classonlymethod
    def remove(cls, employees, date):
        for employee in employees:
            if Insurance.is_insuranced(employee, date):
                Insurance.objects.create(employee=employee, action="remove", date=date)
        
                