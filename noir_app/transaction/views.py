#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, DetailView, CreateView

from account.models import Employee
from project.models import Project
# from transaction.models import PayCheck


class TranChooseEmployeeView(LoginRequiredMixin, ListView):
    template_name = 'tran_choose_employee.html'
    model = Employee
    fields = ('contact', 'title',)
    #如果用UpdateView或DetailView，都會出現錯誤：
    #Generic detail view ChooseTransactionView must be called with either an object pk or a slug.
    #用CreateView則不會出現model資料
    
    
class ChooseTransactionEmployeeView(LoginRequiredMixin, DetailView):
    template_name = 'transaction_choose_employee.html'
    model = Project
    pk_url_kwarg = 'project_pk'
    #用ListView會出現錯誤
    #NoReverseMatch: Reverse for 'transaction_make_paycheck' with arguments '()' 
    #and keyword arguments '{u'project_pk': '', u'employee_pk': 1}' not found. 
    #1 pattern(s) tried: ['transaction/(?:project-(?P<project_pk>[0-9]+))/
    #(?:employee-(?P<employee_pk>[0-9]+))/$'][26/May/2016 13
    
    def get_context_data(self, **kwargs):
        context = super(ChooseTransactionEmployeeView, self).get_context_data(**kwargs)
        context["employee_list"] = Employee.objects.all()
        return context


# class TransactionMakePaycheckView(LoginRequiredMixin, CreateView):
#     template_name = 'transaction_make_paycheck.html'
#     model = PayCheck
#     fields = ('employee', 'amount', 'reason_code', 'reason',)
#     #pk_url_kwarg = 'employee_pk'
#     #pk_project_kwarg = 'project_pk'
# 
#     def form_valid(self, form):
#         #form.instance.id = self.request.POST.get(id)
#         #form.assignment = self.request.POST.get('assignment')
#         form.save()
#         return super(TransactionMakePaycheckView, self).form_valid(form)
#     
#     def get_context_data(self, **kwargs):
#         context = super(TransactionMakePaycheckView, self).get_context_data(**kwargs)
#         #context["employee_list"] = Employee.objects.all()
#         return context
