from schedule.filters import filter_date
import django_filters
from . import models


class PersonalAccountBalanceDateFilter(django_filters.FilterSet):
#     date = django_filters.Filter(method=filter_date)
    date_from = django_filters.DateFilter(name='date', lookup_expr='gte')
    date_to = django_filters.DateFilter(name='date', lookup_expr='lte')


    class Meta:
        model = models.PersonalAccountBalance
        fields = ('date_from', 'date_to',)
        