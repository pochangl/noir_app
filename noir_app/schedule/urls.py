from django.conf.urls import patterns, url
from schedule.views import SchChooseEmployeeView, Schedule_Employee

from schedule.models import DayOff


urlpatterns = (
    url(r'^$', SchChooseEmployeeView.as_view(),name='sch_choose_employee'),
    url(r'^dayoff/$', 
        Schedule_Employee.as_view(model=DayOff, success_url='/account/main_menu/'), 
        name='dayoff'),
)
