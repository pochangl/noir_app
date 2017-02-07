from rest_framework import serializers
from . import models


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ('id', 'name')


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ('id', 'name')


class EmployeeSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()

    class Meta:
        model = models.Employee
        fields = ('id', 'contact')
