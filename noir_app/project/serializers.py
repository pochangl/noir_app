from rest_framework import serializers
from account.serializers import CompanySerializer, EmployeeSerializer
from . import models
from utils.serializers import PositiveFloatField


class ProjectSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = models.Project
        fields = ('id', 'name', 'company')
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            },
        }


class BaseAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Assignment
        fields = ('id', )


class ProposedEmployeeList(serializers.ModelSerializer):
    employees = EmployeeSerializer(many=True)
    class Meta:
        model = models.ProposedEmployeeList
        fields = ('id', 'proposer', 'confirmer', 'endorser', 'employees')


class AssignmentSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    employees = EmployeeSerializer(many=True, read_only=True)
    proposed = ProposedEmployeeList(source="latest_proposed_employee_list", read_only=True, allow_null=True)

    class Meta:
        model = models.Assignment
        fields = ('id', 'start_datetime', 'end_datetime', 'number_needed', 'project', 'employees', 'proposed')

    def create(self, validated_data):
        data = dict(validated_data)
        data['project'] = models.Project.objects.get(id=data['project']['id'])
        return models.Assignment.objects.create(**data)


class EmployeeAssignmentSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer(read_only=True)
    assignment = AssignmentSerializer(read_only=True)
    hours = PositiveFloatField()
    overtime = PositiveFloatField()

    class Meta:
        model = models.EmployeeAssignment
        fields = ('id', 'employee', 'hours', 'overtime', 'assignment', 'work_date')

class PaySerializer(serializers.ModelSerializer):
    employee_assignment = EmployeeAssignmentSerializer(read_only=True)
    employee = EmployeeSerializer(read_only=True)
 
    class Meta:
        model = models.Pay
        fields = ('id', 'balance', 'income', 'expense', 'note', 'date', 'employee_assignment', 'employee', 'salary')
        