from rest_framework import generics, viewsets, mixins
from . import models
from . import serializers
from account.models import Employee
    
    
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
        instance.is_active = True
        instance.save()
    