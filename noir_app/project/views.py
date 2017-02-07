from django.db.models import Q
from rest_framework import generics, viewsets, mixins
from . import models, serializers, filters
from account.models import Employee
from account.views import EmployeeListView
from django.utils.functional import cached_property


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


class ConfirmedEmployeeListView(EmployeeListView):
    def get_queryset(self):
        assignmment  = models.Assignment.objects.get(id=self.kwargs['assignment'])


class AssignEmployeeView(mixins.CreateModelMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Assignment.objects.all()
    serializer_class = serializers.BaseAssignmentSerializer
    http_method_names = ['post', 'delete']

    def post(self, *args, **kwargs):
        return self.create(*args, **kwargs)

    @cached_property
    def employee(self):
        return Employee.objects.get(id=self.kwargs['employee'])

    @cached_property
    def assignment(self):
        return self.get_object()

    def perform_create(self, serializers):
        models.EmployeeAssignment.objects.create(assignment=self.assignment, employee=self.employee)

    def perform_destroy(self, instance):
        models.EmployeeAssignment.objects.filter(assignment=self.assignment, employee=self.employee).delete()


class EmployeeAssignmentViewSet(viewsets.ModelViewSet):
    queryset = models.EmployeeAssignment.objects.all()
    serializer_class = serializers.EmployeeAssignmentSerializer
    filter_class = filters.EmployeeAssignmentFilter

