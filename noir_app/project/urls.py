from django.conf.urls import patterns, url, include
from project.views import ChooseProjectView, ChooseProjectEmployeeView
from django.core.urlresolvers import reverse

from project.models import Assignment

urlpatterns = (
    url(r'^$', 
        ChooseProjectEmployeeView.as_view(model=Assignment, success_url='/account/main_menu/'), 
        name='assignment'),            
)
