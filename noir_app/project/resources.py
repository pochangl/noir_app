#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment
from account.models import Employee

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
    employees = fields.ManyToManyField(EmployeeResource, attribute="employees", related_name="assignments", full=True, readonly=True)
    
    class Meta:
        always_return_data = True
        include_resource_uri = False
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

    def employee_list(self, assignment):
        """
            list of all employees
        """
        availables = Employee.objects.exclude(
            Q( assignments__end_datetime__lte=assignment.end_datetime,
               assignments__end_datetime__gte=assignment.start_datetime) | 
            Q( assignments__start_datetime__lte=assignment.end_datetime,
               assignments__start_datetime__gte=assignment.start_datetime), # find overlap employee
            ~Q(assignments__id=assignment.id),
        ).distinct()
        return [{'id': employee.id,
                 'contact': {
                    'name': employee.contact.name
                }} for employee in availables]
            
    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(AssignmentResource, self).dehydrate(bundle)
        assignment = bundle.obj
        bundle.data["start_date"] = assignment.start_datetime.date()
        bundle.data["start_time"] = assignment.start_datetime.time()
        bundle.data["end_date"] = assignment.end_datetime.date()
        bundle.data["end_time"] = assignment.end_datetime.time()
        bundle.data["a"] = self.employee_list(assignment)
        return bundle


class EmployeeAssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="employee_assignments", full=True, readonly=True)
    assignment = fields.ForeignKey(AssignmentResource, attribute="assignment", related_name="employee_assignments", full=True, readonly=True)

    class Meta:
        queryset = EmployeeAssignment.objects.all()
        resource_name = "employee_assignment"
        include_resource_uri = False
        fields = ("id", "check_in", "check_out", "pay", "actual_pay", "assignment")
        filtering = {
            "employee": ('exact',),
            "assignment": ALL_WITH_RELATIONS,
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()


class UnassignedResource(EmployeeResource):
    
    class Meta(EmployeeResource.Meta):
        resource_name = "unassigns"
        allowed_mehtods = ('get',)
        detail_allowed_methods = tuple()

    def obj_get_list(self, bundle, *args, **kwargs):
        queryset = super(AvailableResource, self).obj_get_list(bundle, *args, **kwargs)
        aid = int(bundle.request.GET["assignment"])
        assignment = Assignment.objects.get(id=aid)
        return 


class UnassignResource(EmployeeAssignmentResource):
    class Meta(EmployeeAssignmentResource):
        resource_name = 'unassign'
        