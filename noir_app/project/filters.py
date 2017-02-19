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
#     assignment = django_filters.ModelChoiceFilter(queryset=models.Assignment.objects.all(), required=True)
#     assignment = django_filters.ModelChoiceFilter(queryset=models.Assignment.objects.all())
    date_from = django_filters.DateFilter(name='work_date', lookup_expr='gte')
    date_to = django_filters.DateFilter(name='work_date', lookup_expr='lte')
    
    class Meta:
        model = models.EmployeeAssignment
        fields = ('assignment', 'employee', 'date_from', 'date_to',)
        