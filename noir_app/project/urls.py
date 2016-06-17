from django.conf.urls import patterns, url, include
from project.views import ChooseProjectView, ChooseProjectEmployeeView
from django.core.urlresolvers import reverse


urlpatterns = patterns('',
    url(r'^$', 
        ChooseProjectView.as_view(), 
        name='choose_project'),
    url(r'^(?:project-(?P<project_pk>[0-9]+))/$', 
        ChooseProjectEmployeeView.as_view(success_url='/account/main_menu/'), 
        name='choose_project_employee'),            
)
