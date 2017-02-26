from rest_framework import generics, viewsets, mixins
from . import models
from . import serializers
from account.models import Employee, Company
    
    
class ContactView(viewsets.ModelViewSet):
    serializer_class = serializers.ContactSerializer
    queryset = models.Contact.objects.all()
    
    
class EmployeeListView(generics.ListAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.filter(is_active=True)


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()
    
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
    
    
class CompanyView(viewsets.ModelViewSet):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.all()
    
    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
        
        
class CompanyListView(generics.ListAPIView):
    serializer_class = serializers.CompanySerializer
    queryset = models.Company.objects.filter(is_active=True)
    
    