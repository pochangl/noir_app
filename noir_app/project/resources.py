#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment

from account.resources import ContactResource, ClientResource, EmployeeResource
from django.db.models import Count


class ProjectResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="contact")
    client = fields.ForeignKey(ClientResource, attribute="client", related_name="client")
    
    class Meta:
        queryset = Project.objects.all()
        resource_name = "project"
        fields = ("id","name",)
        authentication = ApiKeyAuthentication()
        
        
class AssignmentResource(ModelResource):
    project = fields.ForeignKey(ProjectResource, attribute="project", full=True, readonly=True)
    
    class Meta:
        always_return_data = True
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "comment", 
                  "start_datetime", "end_datetime", 
                  "approved", "assignee", "number_needed", "serial", 
                  "create_time", "modify_time", )
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"employee_assignment": ("exact",),
                     "project": ("exact",),
        }
        
    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(AssignmentResource, self).dehydrate(bundle)
        assignment = bundle.obj
        bundle.data["start_date"] = assignment.start_datetime.date()
        bundle.data["count"] = assignment.employee_assignments.filter(selected=True).count()
        return bundle


class EmployeeAssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_assignments", full=True, readonly=True)
    assignment = fields.ForeignKey(AssignmentResource, attribute="assignment", related_name="employee_assignments", full=True, readonly=True)

    class Meta:
        queryset = EmployeeAssignment.objects.all()
        resource_name = "employee_assignment"
        include_resource_uri = False
        fields = ("id", "selected", "check_in", "check_out", "pay", "actual_pay",)
        filtering = {
            "employee": ('exact',),
            "assignment": ALL_WITH_RELATIONS,
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()

        