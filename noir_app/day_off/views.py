from django.shortcuts import render
from django import template
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView

from transaction.models import Transaction
from project.models import Project, EmployeeProject
from account.models import Client, Employee

# Create your views here.

@login_required(login_url='/index/')
def dayoff(request):
    employees = Employee.objects.all()
    employees_name = request.POST.get('employees_name', '')
    return render_to_response('dayoff.html',
                              locals(),
                              context_instance=RequestContext(request))

def dayoff_employee(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('dayoff_employee.html',
                              locals(),
                              context_instance=RequestContext(request))

