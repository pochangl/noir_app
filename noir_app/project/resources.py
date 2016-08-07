#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeProject

from account.resources import ContactResource, ClientResource, EmployeeResource


class ProjectResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="contact")
    cleint = fields.ForeignKey(ClientResource, attribute="client", related_name="client")
    
    class Meta:
        queryset = Project.objects.all()
        resource_name = "project"
        fields = ("id","name","number_needed")
        authentcation = ApiKeyAuthentication()
        
        
class EmployeeProjectResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_projects")
    project = fields.ForeignKey(ProjectResource, attribute="project", related_name="employee_projects")

    class Meta:
        queryset = EmployeeProject.objects.all()
        resource_name = "employee_project"
        fields = ("id", )
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()


class AssignmentResource(ModelResource):
    employee_project = fields.ForeignKey(EmployeeProjectResource, attribute="employee_project", related_name="employee_projects")

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "employeeproject", "assignment", "start_time", "end_time",
                  "check_in", "check_out", "status", "pay", "actual_pay","selected", )
        authentcation = ApiKeyAuthentication()
        