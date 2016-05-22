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
from transaction.views import ChooseTransactionView, ChooseTransactionEmployeeView, page_6, page_7, page_8

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', index, name='index'),
    url(r'^accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^accounts/logout/$', logout, name='logout'),
    url(r'^main_menu/$', MainMenuView.as_view(), name='main_menu'),
    
    url(r'^project/$', 
        ChooseProjectView.as_view(), 
        name='choose_project'),
    url(r'^project/(?P<project_pk>[0-9]+)/$', 
        ChooseProjectEmployeeView.as_view(), 
        name='choose_project_employee'),
    
    url(r'^transaction/$', 
        ChooseTransactionView.as_view(), 
        name='transaction_choose_project'),
    url(r'^transaction/(?P<pk>[0-9]+)/$', 
        ChooseTransactionEmployeeView.as_view(), 
        name='transaction_choose_employee'),
    url(r'^transaction/(?P<pk>[0-9]+\d+)/$', 
        page_6, 
        name='transaction_make_paycheck'),
    
    url(r'^page1/page7/$', page_7, name='choose_day_off'),
    url(r'^page8/$', page_8, name='choose_day_off_employee'),
]
