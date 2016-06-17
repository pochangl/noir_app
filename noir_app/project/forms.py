#-*- coding: utf-8 -*-
from django import forms
from project.models import Assignment


class AssignmentForm(forms.ModelForm):
    template_name = 'choose_project_employee.html'
    class Meta:
        model = Assignment
        exclude = ('employeeproject', 'assignment', 'start_time', 'end_time', 'check_in',
                   'check_out', 'status', 'pay', 'actual_pay',)
