from django.conf.urls import patterns, url
from project.views import ChooseProjectView, ChooseProjectEmployeeView

urlpatterns = patterns('',
    url(r'^$', 
        ChooseProjectView.as_view(), 
        name='choose_project'),
    url(r'^(?:project-(?P<project_pk>[0-9]+))/$', 
        ChooseProjectEmployeeView.as_view(), 
        name='choose_project_employee'),                    
)
