from rest_framework import serializers
from account import serializers as account_serializers
from . import models

class InsuranceSerializer(serializers.ModelSerializer):
    employees = account_serializers.EmployeeSerializer(many=True)

    class Meta:
        model = models.Insurance
        fields = ('employees', 'create_time', 'date')
