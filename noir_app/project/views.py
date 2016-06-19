#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, redirect, render
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.forms.models import modelform_factory

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView

from account.models import Employee
from project.models import Project, Assignment

from .forms import AssignmentForm

class ChooseProjectView(LoginRequiredMixin, ListView):
    template_name = 'choose_project.html'
    model = Project
    fields = ('client', 'name',)

      
class ChooseProjectEmployeeView(LoginRequiredMixin, CreateView):
    template_name = 'choose_project_employee.html'
    model = Assignment
    form_class = AssignmentForm
    
    #用ListView就無法顯示project name
    #用DetailView必須指定pk_url_kwarg，否則會跳未指定pk的錯誤
    def form_valid(self, form):
        #form.instance.id = self.request.POST.get(id)
        #form.assignment = self.request.POST.get('assignment')
        form.save()
        return super(ChooseProjectEmployeeView, self).form_valid(form)
    
    def get_context_data(self, **kwargs):
        context = super(ChooseProjectEmployeeView, self).get_context_data(**kwargs)
        context["employee_list"] = Employee.objects.all()
        context["project_list"] = Project.objects.all()
        return context
