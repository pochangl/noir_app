import django_filters
from . import models


class InsuranceFilter(django_filters.FilterSet):
    date = django_filters.DateTimeFromToRangeFilter(name='date')
    
    class Meta:
        model = models.Insurance
        fields = ('date',)
