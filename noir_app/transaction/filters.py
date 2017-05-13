from schedule.filters import filter_date
import django_filters
from . import models


class BaseAccountBalanceFilter(django_filters.FilterSet):
    settle_date = django_filters.Filter(method=filter_date)
  
    class Meta:
        model = models.BaseAccountBalance
        fields = ('is_settled', 'settle_date')
          
          
class PersonalAccountBalanceFilter(django_filters.FilterSet):
    employee = django_filters.ModelChoiceFilter(queryset=models.Employee.objects.all(), required=True)
    date_from = django_filters.DateFilter(name='date', lookup_expr='gte')
    date_to = django_filters.DateFilter(name='date', lookup_expr='lte')
  
    class Meta:
        model = models.PersonalAccountBalance
        fields = ('employee', 'date_from', 'date_to',)
        