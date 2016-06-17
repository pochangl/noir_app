#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response, redirect, render
from django.template import RequestContext
from django.core.urlresolvers import reverse
from django.forms.models import modelform_factory

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView

from account.models import Client, Employee, Contact, Skill, EmployeeProject, Blacklist
from project.models import Project, Assignment
from transaction.models import Transaction, PayCheck, Debt, Receivable
from .forms import AssignmentForm

class ChooseProjectView(LoginRequiredMixin, ListView):
    template_name = 'choose_project.html'
    model = Project
    fields = ('client', 'name',)

      
class ChooseProjectEmployeeView(LoginRequiredMixin, CreateView):
    template_name = 'choose_project_employee.html'
    model = Assignment
    #fields = ('employeeproject', 'assignment', 'start_time', 'end_time', 'check_in',
    #          'check_out', 'status', 'pay', 'actual_pay',)
    pk_url_kwarg = 'project_pk'
    form_class = AssignmentForm
    #用ListView就無法顯示project name
    #用DetailView必須指定pk_url_kwarg，否則會跳未指定pk的錯誤
def form_valid(self, form):
        form.instance.id = self.request.id
        return super(ChooseProjectEmployeeView, self).form_valid(form)
    
    #    def get_form(self, form_class):
#        form = super(ChooseProjectEmployeeView, self).get_form(form_class)
#        form.instance.assignment = self.request.assignment
#        form.instance.check_in = datetime.now()
#        #form.save()
#        return super(ChooseProjectEmployeeView, self).form_valid(form)
       
#    def form_valid(self, form):
#        self.object = form.save(commit=False)
#        self.object.assignment = self.assignment
#        self.object.save()
#        return HttpResponseRedirect(self.get_success_url())
    
#    def form_valid(self, form):
#        form.instance.assignment = self.request.assignment
#        form.instance.check_in = datetime.now()
#        form.save()
#        return super(ChooseProjectEmployeeView, self).form_valid(form)
    
#    def get_context_data(self, **kwargs):
#        context = super(ChooseProjectEmployeeView, self).get_context_data(**kwargs)
#        context["employee_list"] = Employee.objects.all()
#        context["project_list"] = Project.objects.all()
#        return context

    #def post(self, request, *args, **kwargs):
        #case1,以object存；好像可以run，但不知道到底存了什麼？
        #self.object = self.get_object()
        #context = self.get_context_data(object=self.object)       
        #project_id = self.object.pk
        #self.object.save()
        #return HttpResponseRedirect(reverse('index'))
    
        #case2,以form存；不知道為什麼不能存？也沒有error。
        #SubmitForm = modelform_factory(Project, fields=('client', 'name',))
    #    if request.method == 'POST':
    #        form = SubmitForm(request.POST)
    #        if form.is_valid():
    #            submit_form = form.save()
    #            return HttpResponseRedirect(reverse('main_menu'))
    #    else:
    #        form = SubmitForm()
#        return render(request, 'choose_project.html', {
#            'form': form,
#        })
#        render_to_response('choose_project.html',
#                           context_instance=RequestContext(request))
    #    return HttpResponseRedirect(reverse('index'))
 
 
        #case3,用getlist抓checkbox資料，但list無save，還沒解決
        #employee_id = request.POST.getlist('employee_id')
        
        
        
        #employee_id.save()
        #context = super(ChooseProjectEmployeeView, self).get_context_data(**kwargs)
        #context["employee_list"] = Employee.objects.all()
        #project_id = Project.objects.get(pk=project_pk)
        #return self.render_to_response(context)

'''   
    def submit_data(self, project_pk):
        if request.method == 'GET':
#            project_id = Project.objects.get(pk=project_pk)
#            employee_id = request.POST.getlist('employee_id')
            #submit_data.objects.save()
            return HttpResponseRedirect(reverse('index'))
'''
