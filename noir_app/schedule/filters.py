from django.forms import fields
import django_filters
from account.models import Employee
from . import models
import datetime


def filter_date(queryset, name, value):
    date = fields.DateField().to_python(value)
    a_day = datetime.timedelta(days=1)
    filters = {name + "__range": (date, date + a_day)}
    return queryset.filter(**filters)


class DayOffFilter(django_filters.FilterSet):
    employee = django_filters.ModelChoiceFilter(queryset=Employee.objects.all())

    class Meta:
        model = models.DayOff
        fields = ('employee',)
        