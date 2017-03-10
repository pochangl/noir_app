from rest_framework import serializers
from . import models
from account.serializers import EmployeeSerializer
from account.models import Employee


class DayOffSerializer(serializers.ModelSerializer):
    employee = EmployeeSerializer()
    start_datetime = serializers.DateTimeField()

    class Meta:
        model = models.DayOff
        fields = ('id', 'start_datetime', 'employee', 'end_datetime')

    def create(self, validated_data):
        data = dict(validated_data)
        employee = self.initial_data['employee']['id']
        data['employee'] = Employee.objects.get(id=employee)
        return models.DayOff.objects.create(**data)