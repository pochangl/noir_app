#-*- coding: utf-8 -*-
from django import forms
from account.models import Client, Employee, Contact
from project.models import Project, EmployeeProject

class SubmitForm(forms.Form):
    template_name = 'choose_project_employee.html'
    client = forms.CharField()
    name = forms.CharField()

