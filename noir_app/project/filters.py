from schedule.filters import filter_date
import django_filters
from . import models
from account.models import Employee


class AssignmentDateFilter(django_filters.FilterSet):
    start_datetime = django_filters.Filter(method=filter_date)

    class Meta:
        model = models.Assignment
        fields = ('start_datetime', )


class EmployeeAssignmentFilter(django_filters.FilterSet):
    class Meta:
        model = models.EmployeeAssignment
        fields = ('assignment',)