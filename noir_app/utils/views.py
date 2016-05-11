#-*- coding: utf-8 -*-
from django import template
from django.shortcuts import render_to_response
from django.template import RequestContext
from project.models import Project

# Create your views here.

def page_1(request):

    return render_to_response('page1.html',
                              locals(),
                              context_instance=RequestContext(request))

def page_2(request):
    projects = Project.objects.all()
    return render_to_response('page2.html',
                              locals(),
                              context_instance=RequestContext(request))

