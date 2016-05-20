#-*- coding: utf-8 -*-
from django import template, forms
from django.contrib import auth
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response    #, render
from django.template import loader, RequestContext
from django.views.generic import View
from django.views.generic.edit import CreateView, FormView
from django.views.generic.list import ListView
from django.contrib.auth.forms import AuthenticationForm
from account.forms import  LoginForm
from account.models import Client, Employee, Contact, Skill
from project.models import Project, EmployeeProject, Assignment, Blacklist
from transaction.models import Transaction, PayCheck, Debt, Receivable
from utils.models import TimeStampModel
from django.contrib.auth.forms import AuthenticationForm

# Create your views here.
class LoginView(FormView):
    template_name = 'login.html'
    form_class = LoginForm
    success_url = '/page1/'
    
    def form_valid(self, form):
        return FormView.form_valid(self, form)
    
    def form_invalid(self, form):
        return FormView.form_invalid(self, form)

    def post(self, request, *args, **kwargs):
        if request.user.is_authenticated(): 
            return HttpResponseRedirect('/index/')
        if request.method == 'POST':
            form = LoginForm(request.POST)
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return HttpResponseRedirect('/page1/')
        else:
            return render_to_response('login.html', 
                                      {'form':form}, 
                                      context_instance=RequestContext(request))
    
    def get(self, request):
        form = LoginForm(request.GET)
#        return HttpResponseRedirect('/accounts/login/')   #無限迴圈
        return render_to_response('login.html', 
                                      {'form':form},    #form表需回傳才有值
                                      context_instance=RequestContext(request))
    
    
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect('/index/')

def index(request):
    return render_to_response('index.html',context_instance=RequestContext(request))
