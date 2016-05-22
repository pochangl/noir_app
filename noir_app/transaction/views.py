#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, UpdateView, DetailView, CreateView

from transaction.models import Transaction
from project.models import Project, EmployeeProject
from account.models import Client, Employee


class ChooseTransactionView(LoginRequiredMixin, ListView):
    template_name = 'transaction_choose_project.html'
    model = Project
    fields = ('client', 'name',)
    #如果用UpdateView或DetailView，都會出現錯誤：
    #Generic detail view ChooseTransactionView must be called with either an object pk or a slug.
    #用CreateView則不會出現model資料
    #要呼叫兩個pk，一定要重寫request?
    
class ChooseTransactionEmployeeView(LoginRequiredMixin, ListView):
    template_name = 'transaction_choose_employee.html'
    model = Project
    #pk_url_kwarg = 'emoployee_pk'

    def get_context_data(self, **kwargs):
        context = super(ChooseTransactionEmployeeView, self).get_context_data(**kwargs)
        context["employee_list"] = Employee.objects.all()
        return context


'''
@login_required(login_url='/index/')
def page_5(request):
    employees = Employee.objects.all()
    employees_name = request.POST.get('employees_name', '')
    return render_to_response('choose_transaction_project.html',
                              locals(),
                              context_instance=RequestContext(request))
'''
def page_6(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('transaction_make_paycheck.html',
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

