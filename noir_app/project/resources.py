#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment

from account.resources import ContactResource, ClientResource, EmployeeResource
from django.db.models import Count, Q  # EmployeeAssignment.objects.filer(~Q(id=5))


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
        filtering = {"project": ("exact",),
                     "start_datetime": ALL,
        }
        
    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(AssignmentResource, self).dehydrate(bundle)
        assignment = bundle.obj
        bundle.data["start_date"] = assignment.start_datetime.date()
        bundle.data["start_time"] = assignment.start_datetime.time()
        bundle.data["end_date"] = assignment.end_datetime.date()
        bundle.data["end_time"] = assignment.end_datetime.time()
        bundle.data["count"] = assignment.employee_assignments.filter(selected=True).count()
        return bundle


class EmployeeAssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_assignments", full=True, readonly=True)
    assignment = fields.ForeignKey(AssignmentResource, attribute="assignment", related_name="employee_assignments", full=True, readonly=True)

    class Meta:
        queryset = EmployeeAssignment.objects.all()
        resource_name = "employee_assignment"
        include_resource_uri = False
        fields = ("id", "selected", "check_in", "check_out", "pay", "actual_pay", "assignment")
        filtering = {
            "employee": ('exact',),
            "assignment": ALL_WITH_RELATIONS,
            "selected": ("exact",),
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()


class UnassignedResource(EmployeeAssignmentResource):
    
    class Meta(EmployeeAssignmentResource.Meta):
        resource_name = "unassigned"

#     def obj_get_list(self, bundle, *args, **kwargs):
    def obj_get(self, bundle, *args, **kwargs):
        """
            api return: employees who are available
            bug: performance may be slow
        """
        queryset = super(UnassignedResource, self).obj_get(bundle, *args ,**kwargs)
#         aid = int(bundle.request.GET.get("employee_assignment.assignment", int("")))
        aid = int(bundle.request.GET["assignment"])
        assignment = Assignment.objects.get(id=aid)
        busy_employees = queryset.filter(
            Q(employee_assignment__assignment__end_datetime__lte=assignment.end_datetime,
              employee_assignment__assignment__end_datetime__gte=assignment.start_datetime) | 
            Q(employee_assignment__assignment__start_datetime__lte=assignment.end_datetime,
              employee_assignment__assignment__start_datetime__gte=assignment.start_datetime), # find overlap employee
            ~Q(employee_assignments__assignment__id=assignment.id),
            employee_assignments__selected=True,  # exclude selected and diff assignment employees
        )
#         return queryset.exclude(id__in=busy_employees)
        return aid
    
#     def filter_data_items(bundle):
#         res = DataResource()
#         new_bundle = Bundle(request=bundle.request)
#         objs = res.obj_get_list(new_bundle)
#         return objs.filter(parent_id=bundle.obj.pk)
