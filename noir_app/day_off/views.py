#-*- coding: utf-8 -*-
from django.shortcuts import render
from django import template
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView

from transaction.models import Transaction
from project.models import Project, EmployeeProject
from account.models import Client, Employee, Contact

# Create your views here.
class DayoffView(LoginRequiredMixin, ListView):
    template_name = 'dayoff.html'
    model = Employee
    fields = ('title',)
'''
@login_required(login_url='/index/')
def dayoff(request):
    employees = Employee.objects.all()
    employees_name = request.POST.get('employees_name', '')
    return render_to_response('dayoff.html',
                              locals(),
                              context_instance=RequestContext(request))
'''
    
    
class Dayoff_Employee(LoginRequiredMixin, DetailView):
    template_name = 'dayoff_employee.html'
    model = Employee
    pk_url_kwarg = 'employee_pk'
    
    def get_context_data(self, **kwargs):
        context = super(Dayoff_Employee, self).get_context_data(**kwargs)
        context["contact_list"] = Contact.objects.all()
        return context
    
    
    
def dayoff_employee(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('dayoff_employee.html',
                              locals(),
                              context_instance=RequestContext(request))

