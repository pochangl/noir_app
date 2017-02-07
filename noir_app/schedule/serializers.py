from rest_framework import serializers
from . import models
from account.serailizers import EmployeeSerializer


class DayOffResource(serializers.ModelSerializer):
    employee = EmployeeSerializer()

    class Meta:
        fields = ('id', 'start_datetime', 'end_datetime') 
