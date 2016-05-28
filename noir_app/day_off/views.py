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
    
class Dayoff_Employee(LoginRequiredMixin, DetailView):
    template_name = 'dayoff_employee.html'
    model = Employee
    pk_url_kwarg = 'employee_pk'
    
    def get_context_data(self, **kwargs):
        context = super(Dayoff_Employee, self).get_context_data(**kwargs)
        context["contact_list"] = Contact.objects.all()
        return context
  
'''  
    def submit(request, employee_pk):
        if request.method == 'POST':
            contract = Contact.objects.get(pk=employee_pk)
            personal_leave = request.POST.get('personal_leave', '')
            personal_leave_start = request.POST.get('personal_leave_start', '')
            personal_leave_stop = request.POST.get('personal_leave_stop', '')
            submit_obj = Employee(contract=contract,
                                  personal_leave=personal_leave,
                                  personal_leave_start=personal_leave_start, 
                                  personal_leave_stop=personal_leave_stop)
            submit_obj.save()
            return HttpResponseRedirect('/')
'''
