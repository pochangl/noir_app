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
from django.views.generic import TemplateView, RedirectView
from django.views.generic.list import ListView
from django.contrib import admin
from django.contrib.auth.views import logout
from account.views import LoginView, logout, index
from utils.views import Page1View, Page2View, Page3View
from transaction.views import page_4, page_5, page_6, page_7, page_8
from project.models import Project
from utils.models import TimeStampModel

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^$', index),
    url(r'^$', RedirectView.as_view(url='/index/')),    #若未指定好像不會自動轉址到index
    url(r'^index/$', index, name='index'),
    url(r'^accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^accounts/logout/$', logout),
    url(r'^page1/$', Page1View.as_view(), name='page1'),
    url(r'^page2/$', Page2View.as_view(), name='page2'),
    url(r'^page3/$', Page3View.as_view(), name='page3'),
    url(r'^page1/page4/$', page_4),
    url(r'^page5/$', page_5),
    url(r'^page6/$', page_6),
    url(r'^page1/page7/$', page_7),
    url(r'^page8/$', page_8),
]
'''
    url(r'^update/(?P(pk))/'),
    # http:/localhost:8000/update/3/
'''

