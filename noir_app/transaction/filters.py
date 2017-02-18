from schedule.filters import filter_date
import django_filters
from . import models


class PersonalAccountBalanceDateFilter(django_filters.FilterSet):
#     employee = django_filters.Filter(name='id')
    date_from = django_filters.DateFilter(name='date', lookup_expr='gte')
    date_to = django_filters.DateFilter(name='date', lookup_expr='lte')


    class Meta:
        model = models.PersonalAccountBalance
        fields = ('employee', 'date_from', 'date_to',)
        