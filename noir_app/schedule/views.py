#-*- coding: utf-8 -*-
from django.shortcuts import render
from django import template
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView

from account.models import Employee, Contact
from schedule.models import DayOff

# Create your views here.
class SchChooseEmployeeView(LoginRequiredMixin, ListView):
    template_name = 'sch_choose_employee.html'
    model = Employee
    fields = ('contact', 'title',)
    
class Schedule_Employee(LoginRequiredMixin, CreateView):
    template_name = 'schedule_employee.html'
    model = DayOff
    #pk_url_kwarg = 'employee_pk'
    fields = ('employee', 'start_time', 'end_time')
    
    def form_valid(self, form):
        #form.instance.id = self.request.POST.get(id)
        #form.assignment = self.request.POST.get('assignment')
        form.save()
        return super(Schedule_Employee, self).form_valid(form)
    
    def get_context_data(self, **kwargs):
        context = super(Schedule_Employee, self).get_context_data(**kwargs)
        context["contact_list"] = Contact.objects.all()
        return context
