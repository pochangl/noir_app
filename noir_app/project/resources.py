#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields, Resource
from django.utils import dateparse

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment
from account.models import Employee

from account.resources import ContactResource, ClientResource, EmployeeResource
from django.db.models import Count, Q, F  # EmployeeAssignment.objects.filer(~Q(id=5))
import datetime


class ProjectResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="contact")
    client = fields.ForeignKey(ClientResource, attribute="client", related_name="client")
    
    class Meta:
        include_resource_uri = False
        queryset = Project.objects.all()
        resource_name = "project"
        fields = ("id","name",)
        authentication = ApiKeyAuthentication()
        

class AssignmentDateResource(Resource):
    class Meta:
        include_resource_uri = False
        resource_name = 'assignment_date'
        queryset = Assignment.objects.datetimes('start_datetime', 'day').reverse()
        
    def obj_get_list(self, *args, **kwargs):
        return self._meta.queryset

    def dehydrate(self, bundle, *args, **kwargs):
        bundle.data['date'] = bundle.obj.date()
        return bundle


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
                  "create_time", "modify_time", "is_insuranced",)
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
            Q(assignments__end_datetime__range = assignment.time_range) | 
            Q(assignments__start_datetime__range = assignment.time_range),
            ~Q(assignments=assignment),
        ).distinct()
        return [{'id': employee.id,
                 'contact': {
                    'name': employee.contact.name
                }} for employee in availables]

    def confirmed_list(self, assignment):
        eas = assignment.employee_assignments.exclude(check_in__isnull=True)
        return [{'id': ea.employee.id,
                 'contact': {
                    'name': ea.employee.contact.name
                }} for ea in eas]

        
        
    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(AssignmentResource, self).dehydrate(bundle)
        assignment = bundle.obj
        bundle.data["start_date"] = assignment.start_datetime.date()
        bundle.data["start_time"] = assignment.start_datetime.time()
        bundle.data["end_date"] = assignment.end_datetime.date()
        bundle.data["end_time"] = assignment.end_datetime.time()
        bundle.data["availables"] = self.employee_list(assignment)
        bundle.data["confirms"] = self.confirmed_list(assignment)
        return bundle


    def build_filters(self, filters=None, **kwargs):
        orm_filters = super(AssignmentResource, self).build_filters(filters, **kwargs)
        if 'selected_datetime' in filters:
            date = dateparse.parse_date(filters['selected_datetime'])
            orm_filters['start_datetime__gte'] = date
            orm_filters['start_datetime__lt'] = date + datetime.timedelta(days=1)
        return orm_filters


class EmployeeAssignmentResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee")
    assignment = fields.ForeignKey(AssignmentResource, attribute="assignment")

    class Meta:
        always_return_data = True
        queryset = EmployeeAssignment.objects.all()
        resource_name = "employee_assignment"
        include_resource_uri = False
        fields = ("id",)
        filtering = {
            "employee": ('exact',),
            "assignment": ALL_WITH_RELATIONS,
        }
        allowed_methods = ['get', 'put', 'post', 'delete']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()

    def hydrate(self, bundle):
        bundle = super(EmployeeAssignmentResource, self).hydrate(bundle)
        if not bundle.data.get('is_confirmed', False):
            bundle.obj.check_in = bundle.obj.check_out = None
        else:
            assignment = Assignment.objects.get(id=bundle.obj.assignment_id)
            bundle.obj.check_in = assignment.start_datetime
            bundle.obj.check_out = assignment.end_datetime
        return bundle

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
        