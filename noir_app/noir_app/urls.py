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

from account.views import index

from tastypie.api import Api

from account.resources import ContactResource, ClientResource, EmployeeResource, SkillResource, RegistrationResource
from project.resources import ProjectResource, AssignmentResource, EmployeeAssignmentResource, AssignmentDateResource
from transaction.resources import DebtResource, ReceivableResource, PayCheckResource, TransactionResource
from schedule.resources import DayOffResource, EmployeePreferenceResource, ProjectPreferenceResource

v1_api = Api(api_name='v1')

v1_api.register(ContactResource())
v1_api.register(ClientResource())
v1_api.register(EmployeeResource())
v1_api.register(SkillResource())
v1_api.register(RegistrationResource())

v1_api.register(ProjectResource())
v1_api.register(AssignmentResource())
v1_api.register(AssignmentDateResource())
v1_api.register(EmployeeAssignmentResource())

v1_api.register(DebtResource())
v1_api.register(ReceivableResource())
v1_api.register(PayCheckResource())
v1_api.register(TransactionResource())

v1_api.register(DayOffResource())
v1_api.register(EmployeePreferenceResource())
v1_api.register(ProjectPreferenceResource())


urlpatterns = (
    url(r'^api/', include(v1_api.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index, name='index'),
    
    url(r'^', include('account.urls')),
    url(r'^project/', include('project.urls')),
    url(r'^transaction/', include('transaction.urls')),
    url(r'^schedule/', include('schedule.urls')),
)
