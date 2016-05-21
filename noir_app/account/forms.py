#-*- coding: utf-8 -*-
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from project.models import Project
from account.models import Contact

         
        
class ProjectForm(forms.Form):
    template_name = 'page2.html'
    #success_url = '/page3/'
    client = forms.CharField()
    project = forms.CharField()
