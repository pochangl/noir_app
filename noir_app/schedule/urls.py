from django.conf.urls import patterns, url
from schedule.views import ScheduleView, Schedule_Employee

from schedule.models import DayOff


urlpatterns = (
    url(r'^$', 
        Schedule_Employee.as_view(model=DayOff, success_url='/account/main_menu/'), 
        name='dayoff'),
)
