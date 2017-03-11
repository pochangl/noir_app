from rest_framework import serializers
from account import serializers as account_serializers
from . import models

class InsuranceSerializer(serializers.ModelSerializer):
    employee = account_serializers.EmployeeSerializer()

    class Meta:
        model = models.Insurance
        fields = ('id', 'employee', 'create_time', 'date', 'action')
