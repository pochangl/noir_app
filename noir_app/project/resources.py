#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeProject

from account.resources import ContactResource, ClientResource, EmployeeResource


class ProjectResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="contact")
    client = fields.ForeignKey(ClientResource, attribute="client", related_name="client")
    
    class Meta:
        queryset = Project.objects.all()
        resource_name = "project"
        fields = ("id","name","number_needed")
        authentcation = ApiKeyAuthentication()
        
        
class EmployeeProjectResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_projects", full=True, readonly=True)
    project = fields.ForeignKey(ProjectResource, attribute="project", related_name="employee_projects", full=True, readonly=True)

    class Meta:
        queryset = EmployeeProject.objects.all()
        resource_name = "employee_project"
        include_resource_uri = False
        fields = ("id", )
        filtering = {
            "employee": ('exact',),
            "project": ('exact',),
        }
        authentcation = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()


class AssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", full=True, readonly=True)
    project = fields.ForeignKey(ProjectResource, attribute="project", full=True, readonly=True)

    class Meta:
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "employee_project", "assignment", "start_time", "end_time",
                  "check_in", "check_out", "status", "pay", "actual_pay","selected",)
        allowed_methods = ['get','post','put']
        authentcation = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        