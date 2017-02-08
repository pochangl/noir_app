from schedule.filters import filter_date
import django_filters
from . import models
from account.models import Employee


class AssignmentDateFilter(django_filters.FilterSet):
    start_datetime = django_filters.Filter(method=filter_date)

    class Meta:
        model = models.Assignment
        fields = ('start_datetime', )


class AssignmentFilter(django_filters.FilterSet):
    assignment = django_filters.ModelChoiceFilter(queryset=models.Assignment.objects.all(), required=True)
    class Meta:
        fields = ('assignment',)