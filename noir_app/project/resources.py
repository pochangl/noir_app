#-*- coding: utf-8 -*-
from tastypie.resources import ModelResource, fields, Resource
from django.utils import dateparse

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization
from tastypie.constants import ALL, ALL_WITH_RELATIONS

#from account.models import Contact, Client
from project.models import Project, Assignment, EmployeeAssignment, Pay
from account.models import Employee
from account.resources import ContactResource, CompanyResource, EmployeeResource, BasicEmployeeResource

from django.db.models import Count, Q, F  # EmployeeAssignment.objects.filer(~Q(id=5))
import datetime
from utils.authorization import CustomDjangoAuthorization


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


class ProjectResource(Resource):
    pass



class BasicAssignmentResource(ModelResource):
    class Meta:
        always_return_data = True
        include_resource_uri = False
        queryset = Assignment.objects.all()
        fields = ("id", "comment", "start_datetime", "end_datetime", "number_needed")


class AssignmentResource(BasicAssignmentResource):
    project = fields.ForeignKey(ProjectResource, attribute="project", full=True, readonly=True)
    
    class Meta(BasicAssignmentResource.Meta):
        always_return_data = True
        include_resource_uri = False
        queryset = Assignment.objects.all()
        resource_name = "assignment"
        fields = ("id", "comment", "start_datetime", "end_datetime", "number_needed")
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        filtering = {"project": ("exact",),
                     "start_datetime": ALL,
                     "is_insuranced": "exact",
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

    def dehydrate(self, bundle, *args, **kwargs):
        bundle = super(AssignmentResource, self).dehydrate(bundle)
        assignment = bundle.obj
        bundle.data["start_date"] = assignment.start_datetime.date()
        bundle.data["start_time"] = assignment.start_datetime.time()
        bundle.data["end_date"] = assignment.end_datetime.date()
        bundle.data["end_time"] = assignment.end_datetime.time()
        bundle.data["availables"] = self.employee_list(assignment)
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
        fields = ("id", "hours", "overtime")
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


class ProposeAssignmentResource(ModelResource):
    class Meta:
        queryset = Assignment.objects.all()
        fields = ("id",)
        authorization = CustomDjangoAuthorization("propose")
        resource_name = "propose_assignment"


class EndorseAssignmentResource(ProposeAssignmentResource):
    class Meta(ProposeAssignmentResource.Meta):
        resource_name = "endorse_assignment"
        authorization = CustomDjangoAuthorization("endorse")


class ConfirmAssignmentResource(ProposeAssignmentResource):
    class Meta(ProposeAssignmentResource.Meta):
        resource_name = "confirm_assignment"
        authorization = CustomDjangoAuthorization("confirm")


class PayResource(ModelResource):
    employee_assignment = fields.OneToOneField(EmployeeAssignmentResource, attribute="employees_assignment", full=True, readonly=True)
    
    class Meta:
        queryset = Pay.objects.all()
        fields = ("id",)
        resource_name = "pay"
        