from django.conf.urls import patterns, url
from . import views


urlpatterns = (
    url(r'employee', views.EmployeeListView.as_view()),
)
