#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL

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
        authentication = ApiKeyAuthentication()
        
        
class EmployeeProjectResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_projects", full=True, readonly=True)
    project = fields.ForeignKey(ProjectResource, attribute="project", related_name="employee_projects", full=True, readonly=True)


    class Meta:
        queryset = EmployeeProject.objects.all()
        resource_name = "employee_project"
        include_resource_uri = False
        fields = ("id", "selected", )
        filtering = {
            "employee": ('exact',),
            "project": ('exact',),
        }
        authentication = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()


class AssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", full=True, readonly=True)
    project = fields.ForeignKey(ProjectResource, attribute="project", full=True, readonly=True)

    def build_filters(self, filters = None, **kwargs):
        if filters is None:
            filters = {}
        orm_filters = super(AssignmentResource, self).build_filters(filters, **kwargs)
        try:
            orm_filters["employee_project__project__exact"] = orm_filters.pop("project__exact")
        except:
            pass
        try:
            orm_filters["employee_project__employee__exact"] = orm_filters.pop("employee__exact")
        except:
            pass
        print orm_filters
        return orm_filters
    
    class Meta:
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "employee_project", "assignment", "start_time", "end_time",
                  "check_in", "check_out", "modify_time", 
                  "status", "pay", "actual_pay","selected",)
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"project": ("exact",),
                     "employee": ("exact",),}
        