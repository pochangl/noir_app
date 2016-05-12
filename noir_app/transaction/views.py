#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from project.models import Project
from project.models import EmployeeProject
from account.models import Client
from account.models import Employee



@login_required(login_url='/index/')
def page_4(request):
    projects = Project.objects.all()
    projects_name = request.POST.get('projects_name', '')
    return render_to_response('page4.html',
                              locals(),
                              context_instance=RequestContext(request))

@login_required(login_url='/index/')
def page_5(request):
    employees = Employee.objects.all()
    employees_name = request.POST.get('employees_name', '')
    return render_to_response('page5.html',
                              locals(),
                              context_instance=RequestContext(request))

def page_6(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('page6.html',
                              locals(),
                              context_instance=RequestContext(request))

@login_required(login_url='/index/')
def page_7(request):
    employees = Employee.objects.all()
    employees_name = request.POST.get('employees_name', '')
    return render_to_response('page7.html',
                              locals(),
                              context_instance=RequestContext(request))

def page_8(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('page8.html',
                              locals(),
                              context_instance=RequestContext(request))

