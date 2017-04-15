from schedule.filters import filter_date
import django_filters
from . import models


# class BaseAccountBalanceFilter(django_filters.FilterSet):
#     date_from = django_filters.DateFilter(name='date', lookup_expr='gte')
#     date_to = django_filters.DateFilter(name='date', lookup_expr='lte')
# 
#     class Meta:
#         model = models.BaseAccountBalance
#         fields = ('date_from', 'date_to',)
#         
#         
# class PersonalAccountBalanceFilter(django_filters.FilterSet):
#     date_from = django_filters.DateFilter(name='date', lookup_expr='gte')
#     date_to = django_filters.DateFilter(name='date', lookup_expr='lte')
# 
#     class Meta:
#         model = models.PersonalAccountBalance
#         fields = ('employee', 'date_from', 'date_to',)
        