from django.forms import fields
import datetime

def filter_date(queryset, name, value):
    date = fields.DateField().to_python(value)
    a_day = datetime.timedelta(days=1)
    filters = {name + "__range": (date, date + a_day)}
    return queryset.filter(**filters)