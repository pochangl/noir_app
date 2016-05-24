#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView

from account.models import Client, Employee, Contact
from project.models import Project
from project.models import EmployeeProject

class ChooseProjectView(LoginRequiredMixin, ListView):
    template_name = 'choose_project.html'
    model = Project
    fields = ('client', 'name',)

      
class ChooseProjectEmployeeView(LoginRequiredMixin, DetailView):
    template_name = 'choose_project_employee.html'
    model = Project
    pk_url_kwarg = 'project_pk'
    #用ListView就無法顯示project name
    #用DetailView必須指定pk_url_kwarg，否則會跳未指定pk的錯誤
    
    def get_context_data(self, **kwargs):
        context = super(ChooseProjectEmployeeView, self).get_context_data(**kwargs)
        context["employee_list"] = Employee.objects.all()
        return context
