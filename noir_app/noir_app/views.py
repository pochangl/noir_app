# noir_app/noir_app/noir_app/views.py
#-*- coding: utf-8 -*-
from django.http import HttpResponse
from django.template.loader import get_template
from django import template
from django.template import Context
from django.shortcuts import render_to_response
from django.views.generic import View
#from firstapp.forms import MyForm
from django.views.generic.edit import CreateView
from account.models import Client
from account.models import Employee
from account.models import Contact
from account.models import Skill
from project.models import Project
from project.models import EmployeeProject
from project.models import Assignment
from project.models import Blacklist
from transaction.models import Transaction
from transaction.models import PayCheck
from transaction.models import Debt
from transaction.models import Receivable
from utils.models import TimeStampModel

# Create your views here.

def first_view(request, *args, **kwargs):  # args:positional argument;kwargs: named argument
    return HttpResponse("<html><body>hihi %s %s</body></html>" % (args, kwargs))  #%s 把後面的參數依序丟到前面

'''
class FirstView(View):
    def get(self,request, *args, **kwargs):
        return HttpResponse("<html><body>hihi %s %s</body></html>")


class FirstTemplateView(CreateView):
    template_name="loginpage.html"
    model=User
    fields=("name","password")
    success_url="./"
'''
def welcome(request):
    with open('templates/loginpage.html', 'r') as reader:
        t = template.Template(reader.read())
    c = template.context({})
    return HttpResponse(t.render(c))

def login_page(request):
    a=int(2)
    b=int(3)
    p=a+b
    q=a*b
    t=get_template('loginpage.html')

#    with open('templates/loginpage.html', 'r') as reader:
#        t = template.Template(reader.read())
    c = template.Context({'p':p, 'q':q})
    return HttpResponse(t.render(c))


#    return render_to_response('loginpage.html', locals())
#    return render_to_response('loginpage.html', {'p':p, 'q':q})

"""
#    def get_context_data(self, **kwarge):
#        return {'value':1,"data":dict(self.request.POST), "form":MyForm()}

#    def post(self, request):
#        MyForm(data=request.POST).save()
#        return self.render_to_response(self.get_context_data())
"""
