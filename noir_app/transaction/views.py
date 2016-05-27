#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core.urlresolvers import reverse

from django.contrib.auth.decorators import login_required

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, UpdateView, DetailView, CreateView, TemplateView

from transaction.models import Transaction
from project.models import Project, EmployeeProject
from account.models import Client, Employee, Contact


class ChooseTransactionView(LoginRequiredMixin, ListView):
    template_name = 'transaction_choose_project.html'
    model = Project
    fields = ('client', 'name',)
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


class TransactionMakePaycheckView(LoginRequiredMixin, DetailView):
    template_name = 'transaction_make_paycheck.html'
    model = Employee
    fields = ('contact', 'title',)
    pk_url_kwarg = 'employee_pk'
    pk_project_kwarg = 'project_pk'
    
    def get_object(self,queryset=None):  
        cnum=int(self.kwargs.get(self.pk_url_kwarg,None))  
        pnum=int(self.kwargs.get(self.pk_project_kwarg,None))  
        query=self.get_queryset()  
        try:  
            obj=query[pnum-1].projects.all()[cnum-1]  
        except IndexError:  
            raise Http404  
        return obj 
        
    def get_context_data(self, **kwargs):
        context = super(TransactionMakePaycheckView, self).get_context_data(**kwargs)
        #context["employee_list"] = Employee.objects.all()
        return context
      
      
      
      
 

    
    
    
'''
def page_6(request):
    normal_man_hour = request.POST.get('normal_man_hour', '')
    overtime_man_hour = request.POST.get('overtime_man_hour', '')
    return render_to_response('transaction_make_paycheck.html',
                              locals(),
                              context_instance=RequestContext(request))
'''
