#-*- coding: utf-8 -*-
from django import forms


class SubmitForm(forms.Form):
    template_name = 'choose_project_employee.html'
    client = forms.CharField()
    name = forms.CharField()

