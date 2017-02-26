from rest_framework import serializers
from . import models
    
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Contact
        fields = ('id', 'name', 'title', 'address', 'phone', 'mobile', 'ssn', 'birthday')

#     def create(self, validated_data):
#         data = dict(validated_data)
#         data['contact'] = models.Contact.objects.all()
#         return models.Contact.objects.create(**data)
    
    
class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Company
        fields = ('id', 'name')


class EmployeeSerializer(serializers.HyperlinkedModelSerializer):
    contact = ContactSerializer(many=False, read_only=True)
    
    class Meta:
        model = models.Employee
        fields = ('id', 'contact', 'is_active')

    def create(self, validated_data):
        data = dict(validated_data)
        data['contact'] = models.Contact.objects.get(id=data['contact']['id'])
        return models.Employee.objects.create(**data)
    