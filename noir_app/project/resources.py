from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

from project.models import Project, Assignment, EmployeeProject

#from account.resources import ContactResource, ClientResource, EmployeeResource
#from project.resources import EmployeeProjectResource, ProjectResource


class ProjectResource(ModelResource):

    class Meta:
        queryset = Project.objects.all()
        resource_name = "project"
        fields = ("id","name",)
        authentcation = ApiKeyAuthentication()
        
        
class EmployeeProjectResource(ModelResource):
    employee = fields.ForeignKey("account.EmployeeResource", attribute="employee", related_name="employee_projects")
    project = fields.ForeignKey("project.ProjectResource", attribute="project", related_name="employee_projects")

    class Meta:
        queryset = EmployeeProject.objects.all()
        resource_name = "employee_project"
        fields = ("id", )
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()


class AssignmentResource(ModelResource):
    employee_project = fields.ForeignKey("account.EmployeeProjectResource", attribute="employee_project", related_name="assignments")

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "assignment", "start_time", "end_time", "check_in", 
                  "check_out", "status", "pay", "actual_pay", )
        authentcation = ApiKeyAuthentication()
        