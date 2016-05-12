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
def page_1(request):
    return render_to_response('page1.html',
                              locals(),
                              context_instance=RequestContext(request))

@login_required(login_url='/index/')
def page_2(request):
    projects = Project.objects.all()
    projects_name = request.POST.get('projects_name', '')
    return render_to_response('page2.html',
                              locals(),
                              context_instance=RequestContext(request))

@login_required(login_url='/index/')
def page_3(request):
    project_name = request.GET['project_name']
    employeeprojects = EmployeeProject.objects.all()
    return render_to_response('page3.html',
                              locals(),
                              context_instance=RequestContext(request))

