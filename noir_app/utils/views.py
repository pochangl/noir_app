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
from django.views.generic import ListView, DetailView, FormView, CreateView, TemplateView


class MainMenuView(LoginRequiredMixin, TemplateView):
    template_name = 'page1.html'

    def get_login_url(self):
        return reverse("login")


class ChooseProjectView(LoginRequiredMixin, ListView):
    template_name = 'page2.html'
    form_class = ProjectForm
    success_url = '/page3/'
    model = Project
    fields = ('client', 'project_name',)


      
class ProjectView(LoginRequiredMixin, DetailView):
    template_name = 'page3.html'
    model = Project

    def get_context_data(self, **kwargs):
        context = super(ProjectView, self).get_context_data(**kwargs)
        context["employee_list"] = Employee.objects.all()
        return context
