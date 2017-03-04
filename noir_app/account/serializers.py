from rest_framework import serializers
from . import models


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ('id', 'name', 'title', 'address', 'phone', 'mobile', 'ssn', 'birthday')
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            },
        }


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ('id', 'name', 'is_active')


class EmployeeSerializer(serializers.ModelSerializer):
    contact = ContactSerializer(read_only=True)

    class Meta:
        model = models.Employee
        fields = ('id', 'contact', 'is_active')

    def create(self, validated_data):
        data = dict(validated_data)
        data['contact'] = models.Contact.objects.get(id=self.initial_data['contact']['id'])
        return models.Employee.objects.create(**data)
