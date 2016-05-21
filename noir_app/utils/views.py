#-*- coding: utf-8 -*-
from django import template
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.mixins import LoginRequiredMixin
from account.models import Client, Employee, Contact
from project.models import Project
from project.models import EmployeeProject
from account.forms import  ProjectForm
from django.views.generic.base import TemplateView
from django.views.generic.edit import FormView, CreateView
from django.views.generic.list import ListView


class Page1View(LoginRequiredMixin, TemplateView):
    login_url = '/index/'
    redirect_field_name = 'redirect_to'
    template_name = 'page1.html'

    def get_context_data(self, **kwargs):
        context = super(Page1View, self).get_context_data(**kwargs)
        return context

    def post(self, request, *args, **kwargs):
        return render_to_response('page1.html', 
                                  context_instance=RequestContext(request))
        
        
class Page2View(LoginRequiredMixin, TemplateView):
    template_name = 'page2.html'
    form_class = ProjectForm
    success_url = '/page3/'
    model = Client
    fields = ('client', 'project_name',)
#    context_object_name = 'projects'

    def form_valid(self, form):
        return FormView.form_valid(self, form)
    
    def form_invalid(self, form):
        return FormView.form_invalid(self, form)
    
    def get_queryset(self):
        return Client.objects.prefetch_related("projects").all()
    
    def get_context_data(self, **kwargs):
        context = super(Page2View, self).get_context_data(**kwargs)
        #context['whatever'] = "more stuff"
        return context

    def post(self, request, *args, **kwargs):
        form = ProjectForm(request.POST)
        return render_to_response('page2.html', 
                                  {'form':form}, 
                                  context_instance=RequestContext(request))

    def get(self, request, *args, **kwargs):
        form = ProjectForm(request.GET)
        return render_to_response('page2.html', 
                                  {'form':form}, 
                                  context_instance=RequestContext(request))

      
class Page3View(LoginRequiredMixin, ListView):
    template_name = 'page3.html'
    model = Contact
        
    def get_context_data(self, **kwargs):
        context = super(Page3View, self).get_context_data(**kwargs)
        return context
    
    def get_queryset(self):
        return Contact.objects.prefetch_related("employees").all()

    def post(self, request, *args, **kwargs):
        return render_to_response('page3.html', 
                                  {'form':form}, 
                                  context_instance=RequestContext(request))
