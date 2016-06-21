from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

from schedule.models import DayOff, EmployeePreference, ProjectPreference
        
#from account.resources import EmployeeResource
#from project.resources import EmployeeProjectResource

class DayOffResource(ModelResource):
    employee = fields.ForeignKey("account.EmployeeResource", attribute="employee", related_name="dayoffs")
    
    class Meta:
        queryset = DayOff.objects.all()
        resource_name = "dayoff"
        fields = ("id","start_time", "end_time",)
        authentcation = ApiKeyAuthentication()
 
 
class EmployeePreferenceResource(ModelResource):
    employee_project = fields.ForeignKey("project.EmployeeProjectResource", attribute="employee_project", related_name="employee_preferences")
    
    class Meta:
        queryset = EmployeePreference.objects.all()
        resource_name = "employee_preference"
        fields = ("id", "employee_preference",)
        authentcation = ApiKeyAuthentication()
        
   
class ProjectPreferenceResource(ModelResource):
    employee_project = fields.ForeignKey("project.EmployeeProjectResource", attribute="employee_project", related_name="project_preferences")
    
    class Meta:
        queryset = ProjectPreference.objects.all()
        resource_name = "project_preference"
        fields = ("id", "employee_priority", "project_priority",)
        authentcation = ApiKeyAuthentication()
        