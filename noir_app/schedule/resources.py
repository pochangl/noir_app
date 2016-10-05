from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization

from schedule.models import DayOff, EmployeePreference, ProjectPreference
        
from account.resources import EmployeeResource
from project.resources import EmployeeProjectResource

class DayOffResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="dayoffs", full=True, readonly=True)
    
    class Meta:
        queryset = DayOff.objects.all()
        resource_name = "dayoff"
        include_resource_uri = False
        fields = ("id", "start_date", "start_time", "end_date", "end_time",)
        filtering = {
            "employee": ('exact',),
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
 
 
class EmployeePreferenceResource(ModelResource):
    employee_project = fields.ForeignKey(EmployeeProjectResource, attribute="employee_project", related_name="employee_preferences")
    
    class Meta:
        queryset = EmployeePreference.objects.all()
        resource_name = "employee_preference"
        fields = ("id", "employee_preference",)
        authentication = ApiKeyAuthentication()
        
   
class ProjectPreferenceResource(ModelResource):
    employee_project = fields.ForeignKey(EmployeeProjectResource, attribute="employee_project", related_name="project_preferences")
    
    class Meta:
        queryset = ProjectPreference.objects.all()
        resource_name = "project_preference"
        fields = ("id", "employee_priority", "project_priority",)
        authentication = ApiKeyAuthentication()
        