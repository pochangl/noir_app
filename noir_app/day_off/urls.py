from django.conf.urls import patterns, url
from day_off.views import DayoffView, Dayoff_Employee


urlpatterns = (
    url(r'^$', DayoffView.as_view(), name='dayoff'),
    url(r'^(?:employee-(?P<employee_pk>[0-9]+))/$', Dayoff_Employee.as_view(), name='dayoff_employee'),
)
