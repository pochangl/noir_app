#-*- coding: utf-8 -*-
from django.forms import ModelForm
from project.models import Assignment


class AssignmentForm(ModelForm):
    template_name = 'choose_project_employee.html'
    class Meta:
        model = Assignment
        fields = ('id',)
    #不知道為何用form.py引入就沒有資料顯示了？
