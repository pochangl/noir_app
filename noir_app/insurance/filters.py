import django_filters
from . import models


class InsuranceFilter(django_filters.FilterSet):
    required = True
    date = django_filters.DateTimeFromToRangeFilter()
    
    class Meta:
        model = models.Insurance
        fields = ('date',)
