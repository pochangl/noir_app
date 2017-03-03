from django.db.models import Q, Max
from rest_framework import generics, viewsets, mixins
from . import models, serializers, filters
from account.models import Employee
from account.views import EmployeeListView
from django.utils.functional import cached_property
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend, FilterSet
from django.http.response import HttpResponse
import django_filters
from django.utils.dateparse import parse_date
import datetime


class HttpAccepted(HttpResponse):
    status_code = 202


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProjectSerializer
    queryset = models.Project.objects.all()


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.AssignmentSerializer
    queryset = models.Assignment.objects.all()
    filter_class = filters.AssignmentDateFilter


class AvailableEmployeeListView(EmployeeListView):
    def get_queryset(self):
        employees = super(AvailableEmployeeListView, self).get_queryset()
        assignment = models.Assignment.objects.get(id=self.kwargs['assignment'])
        return employees.exclude(
            Q(assignments__end_datetime__range = assignment.time_range) | 
            Q(assignments__start_datetime__range = assignment.time_range),
            ~Q(assignments=assignment),
        ).distinct()


class AssignEmployeeView(mixins.CreateModelMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Assignment.objects.all()
    serializer_class = serializers.BaseAssignmentSerializer
    http_method_names = ['post', 'delete']

    def post(self, *args, **kwargs):
        return self.create(*args, **kwargs)

    @property
    def employee(self):
        return Employee.objects.get(id=self.kwargs['employee'])

    @property
    def assignment(self):
        return self.get_object()

    def perform_create(self, serializer):
        models.EmployeeAssignment.objects.create(assignment=self.assignment, employee=self.employee)

    def perform_destroy(self, instance):
        models.EmployeeAssignment.objects.filter(assignment=self.assignment, employee=self.employee).delete()


class EmployeeAssignmentViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.EmployeeAssignment.objects.all().order_by("-assignment__start_datetime")
    serializer_class = serializers.EmployeeAssignmentSerializer
    filter_class = filters.EmployeeAssignmentFilter


class ProposeEmployeeListView(mixins.CreateModelMixin, EmployeeListView):
    http_method_names = ['post']
    @property
    def assignment(self):
        return models.Assignment.objects.get(id=self.kwargs['assignment'])

    def get_queryset(self):
        ids = [employee['id'] for employee in self.request.data]
        return Employee.objects.filter(id__in=ids)

    def get_serializer(self, *args, **kwargs):
        kwargs['many'] = True
        return super(ProposeEmployeeListView, self).get_serializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
        return self.get(request, *args, **kwargs)

    def perform_create(self, serializer):
        employees = self.get_queryset()
        self.assignment.propose(self.request.user, employees)
        

class ConfirmEmployeeListView(APIView):
    http_method_names = ['post']
    def post(self, request, employee_list):
        employee_list = models.ProposedEmployeeList.objects.get(id=employee_list)
        if employee_list.is_latest:
            employee_list.confirm(request.user)
        else:
            raise PermissionDenied('You may not confirm older version')
        return HttpAccepted()


class EndorseEmployeeListView(APIView):
    http_method_names = ['post']    
    def post(self, request, employee_list):
        employee_list = models.ProposedEmployeeList.objects.get(id=employee_list)
        if employee_list.is_latest:
            employee_list.endorse(request.user)
        else:
            raise PermissionDenied('You may not endorse older version')
        return HttpAccepted()


class ActiveWorkerView(EmployeeListView):
    def get_queryset(self):
        queryset = super(ActiveWorkerView, self).get_queryset()
        date = datetime.datetime.combine(parse_date(self.request.GET['date']), datetime.time(0, 0, 0, 0))
        end_of_the_date = date + datetime.timedelta(hours=23, minutes=59)
        return queryset.filter(assignments__start_datetime__range=(date, end_of_the_date))
    