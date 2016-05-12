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
from django.conf.urls import include, url
from django.contrib import admin
from account.views import login
from account.views import logout
from account.views import index
from utils.views import page_1
from utils.views import page_2
from utils.views import page_3
from transaction.views import page_4
from transaction.views import page_5
from transaction.views import page_6
from transaction.views import page_7
from transaction.views import page_8

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^index/$', index),
    url(r'^accounts/login/$', login),
    url(r'^accounts/logout/$', logout),
    url(r'^page1/$', page_1),
    url(r'^page1/page2/$', page_2),
    url(r'^page3/$', page_3),
    url(r'^page1/page4/$', page_4),
    url(r'^page5/$', page_5),
    url(r'^page6/$', page_6),
    url(r'^page1/page7/$', page_7),
    url(r'^page8/$', page_8),
]


