from rest_framework import serializers
from account.serializers import EmployeeSerializer

from . import models


class PersonalAccountBalanceSerializer(serializers.ModelSerializer):
#     employee = EmployeeSerializer(read_only=True)
    employee = EmployeeSerializer()
    
    class Meta:
        model = models.PersonalAccountBalance
        fields = ('balance', 'income', 'expense', 'note', 'date', 'employee',)

class BaseAccountBalanceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.BaseAccountBalance
        fields = ('balance', 'income', 'expense', 'note', 'date',)
        