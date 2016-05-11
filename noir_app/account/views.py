#-*- coding: utf-8 -*-
from django.contrib import auth
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django import template
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.generic import View
from django.views.generic.edit import CreateView
from account.models import Client
from account.models import Employee
from account.models import Contact
from account.models import Skill
from project.models import Project
from project.models import EmployeeProject
from project.models import Assignment
from project.models import Blacklist
from transaction.models import Transaction
from transaction.models import PayCheck
from transaction.models import Debt
from transaction.models import Receivable
from utils.models import TimeStampModel

# Create your views here.

def login(request):
    if request.user.is_authenticated(): 
        return HttpResponseRedirect('/index/')
    username = request.POST.get('username', '')
    password = request.POST.get('password', '')
    user = auth.authenticate(username=username, password=password)
    if user is not None and user.is_active:
        auth.login(request, user)
        return HttpResponseRedirect('/page1/')

    else:
        return render_to_response('login.html',
               context_instance=RequestContext(request))

def index(request):
    return render_to_response('index.html',locals())

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/index/')

