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

from tastypie.api import Api

from project.resources import AssignmentDateResource
from schedule.resources import ScheduleResource, DayOffResource

from tastypie.models import create_api_key
from django.conf import settings
from django.db.models import signals
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(signals.post_save, sender=settings.AUTH_USER_MODEL) # 帳號產生時自動生成API KEY
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

v1_api = Api(api_name='v1')

v1_api.register(AssignmentDateResource())
v1_api.register(ScheduleResource())
v1_api.register(DayOffResource())


urlpatterns = (
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/v1/account/', include('account.urls')),
    url(r'^api/v1/project/', include('project.urls')),
    url(r'^api/v1/transaction/', include('transaction.urls')),
    url(r'^api/v1/schedule/', include('schedule.urls')),
    url(r'^api/', include(v1_api.urls)),
)
