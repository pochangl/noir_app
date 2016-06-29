#-*- coding: utf-8 -*-
from django.views.generic import FormView, TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from django import template, forms
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import auth
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response    #, render
from django.template import loader, RequestContext


# Create your views here.
class LoginView(FormView):
    template_name = 'login.html'
    form_class = AuthenticationForm

    def get_success_url(self):
        return reverse('main_menu')

    def form_valid(self, form):
        user = form.get_user()
        auth.login(self.request, user)
        return super(LoginView, self).form_valid(form)
    
    
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('index'))


def index(request):
    return render_to_response('index.html',context_instance=RequestContext(request))


class MainMenuView(LoginRequiredMixin, TemplateView):
    template_name = 'main_menu.html'
