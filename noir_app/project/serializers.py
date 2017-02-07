from rest_framework import serializers
from account.serializers import CompanySerializer, EmployeeSerializer

from . import models


class ProjectSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = models.Project
        fields = ('id', 'name', 'company')


class BaseAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Assignment
        fields = ('id', )


class AssignmentSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    employees = EmployeeSerializer(many=True)

    class Meta:
        model = models.Assignment
        fields = ('id', 'start_datetime', 'end_datetime', 'number_needed', 'project', 'employees')


class EmployeeAssignmentSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)

    class Meta:
        model = models.EmployeeAssignment
        fields = ('id', 'employee', 'hours', 'overtime')
