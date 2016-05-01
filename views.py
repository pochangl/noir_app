# mysite/firstapp/views.py
#-*- coding: utf-8 -*-
from django.http import HttpResponse
from django.views.generic import View
#from firstapp.forms import MyForm
from django.views.generic.edit import CreateView
from .models import User
from .models import Client
from .models import Employee
from .models import Contact
from .models import Project
from .models import EmployeeProject
from .models import Assignment
from .models import Skill
from .models import PayCheck
from .models import Skill
from .models import Blacklist

# Create your views here.

def first_view(request, *args, **kwargs):  # args:positional argument;kwargs: named argument
    return HttpResponse("<html><body>hihi %s %s</body></html>" % (args, kwargs))  #%s 把後面的參數依序丟到前面


class FirstView(View):
    def get(self,request, *args, **kwargs):
        return HttpResponse("<html><body>hihi %s %s</body></html>")


class FirstTemplateView(CreateView):
    template_name="firstapp/first.html"
    model=User
    fields=("name","password")
    success_url="./"
"""
#    def get_context_data(self, **kwarge):
#        return {'value':1,"data":dict(self.request.POST), "form":MyForm()}

#    def post(self, request):
#        MyForm(data=request.POST).save()
#        return self.render_to_response(self.get_context_data())
"""
