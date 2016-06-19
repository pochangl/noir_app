from django.conf.urls import patterns, url, include
from project.views import ChooseProjectView, ChooseProjectEmployeeView
from django.core.urlresolvers import reverse

from project.models import Assignment

urlpatterns = (
    url(r'^$', 
        ChooseProjectView.as_view(), 
        name='choose_project'),
    url(r'^(?:project-(?P<pk>[0-9]+))/$', 
        ChooseProjectEmployeeView.as_view(model=Assignment, success_url='/account/main_menu/'), 
        name='choose_project_employee'),            
)
