from account.models import EmployeeList
from django.db import models
from utils.models import TimeStampModel
from django.utils.decorators import classonlymethod


class Insurance(EmployeeList):
    action = models.CharField(max_length=8, choices = (
        ('add', 'add'),
        ('remove', 'remove'),
    ))

    @classonlymethod
    def add(cls, employees):
        employees = filer(employee, lambda employee: employee.insurance_insurance_employees.order_by('-time_created')[0].action == 'remove') 
        if len(employees) > 0:
            insurance = Insurance.objects.create(action="add")
            insurance.employees.add(*employees)
        
    @classonlymethod
    def remove(self, employees):
        employees = filer(employee, lambda employee: employee.insurance_insurance_employees.order_by('-time_created')[0].action == 'add') 
        if len(employees) > 0:
            insurance = Insurance.objects.create(action="remove")
            insurance.employees.add(*employees)
        
                