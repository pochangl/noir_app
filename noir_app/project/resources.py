#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment

from account.resources import ContactResource, ClientResource, EmployeeResource


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
#     employee_assignment = fields.ForeignKey(EmployeeAssignmentResource, attribute="employee_assignment", full=True, readonly=True)

#     def build_filters(self, filters = None, **kwargs):
#         if filters is None:
#             filters = {}
#         orm_filters = super(AssignmentResource, self).build_filters(filters, **kwargs)
#         try:
#             orm_filters["employee_assignment__project__exact"] = orm_filters.pop("project__exact")
#         except:
#             pass
#         try:
#             orm_filters["employee_assignment__employee__exact"] = orm_filters.pop("employee__exact")
#         except:
#             pass
#         print orm_filters
#         return orm_filters
    
    class Meta:
        always_return_data = True
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "assignment", 
                  "start_date", "end_date", "start_time", "end_time",
                  "status", "assignee", "number_needed", "serial", 
                  "create_time", "modify_time", )
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"employee_assignment": ("exact",),
                     "project": ("exact",),}
        
        
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
            "assignment": ('exact',),
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = ReadOnlyAuthorization()

        