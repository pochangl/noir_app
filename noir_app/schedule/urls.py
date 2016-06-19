from django.conf.urls import patterns, url
from schedule.views import ScheduleView, Schedule_Employee


urlpatterns = (
    url(r'^$', ScheduleView.as_view(), name='schedule'),
    url(r'^(?:employee-(?P<employee_pk>[0-9]+))/$', Schedule_Employee.as_view(), name='schedule_employee'),
)
