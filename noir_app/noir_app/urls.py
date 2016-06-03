#-*- coding: utf-8 -*-
"""noir_app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import patterns, include, url
from django.contrib import admin

from account.views import LoginView, logout, index, MainMenuView
from project.views import ChooseProjectView, ChooseProjectEmployeeView
from transaction.views import ChooseTransactionView, ChooseTransactionEmployeeView, TransactionMakePaycheckView
from day_off.views import DayoffView, Dayoff_Employee
from tastypie.api import Api

from account.resources import EmployeeProjectResource

v1_api = Api(api_name='v1')
v1_api.register(EmployeeProjectResource())

project_patterns = [
    url(r'^$', 
        ChooseProjectView.as_view(), 
        name='choose_project'),
    url(r'^(?:project-(?P<project_pk>[0-9]+))/$', 
        ChooseProjectEmployeeView.as_view(), 
        name='choose_project_employee'),                    
]


transaction_patterns = [
    url(r'^$', 
        ChooseTransactionView.as_view(), 
        name='transaction_choose_project'),
    url(r'^(?:project-(?P<project_pk>[0-9]+))/$', 
        ChooseTransactionEmployeeView.as_view(), 
        name='transaction_choose_employee'),
    url(r'^(?:project-(?P<project_pk>[0-9]+))/(?:employee-(?P<employee_pk>[0-9]+))/$', 
        TransactionMakePaycheckView.as_view(),
        name='transaction_make_paycheck'),
]

dayoff_patterns = [
    url(r'^$', DayoffView.as_view(), name='dayoff'),
    url(r'^(?:employee-(?P<employee_pk>[0-9]+))/$', Dayoff_Employee.as_view(), name='dayoff_employee'),
]


urlpatterns = [
    url(r'^api/', include(v1_api.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index, name='index'),
    url(r'^accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^accounts/logout/$', logout, name='logout'),
    url(r'^main_menu/$', MainMenuView.as_view(), name='main_menu'),
    
    url(r'^project/', include(project_patterns)),
    url(r'^transaction/', include(transaction_patterns)),
    url(r'^dayoff/', include(dayoff_patterns)),
]
