from rest_framework import generics
from . import models
from . import serializers


class ContactView(generics.RetrieveUpdateAPIView):
    serializer_class = serializers.ContactSerializer
    queryset = models.Contact.objects.all()
    http_method_names = ['post', 'put']
        
    def put(self, *args, **kwargs):
        return self.create(*args, **kwargs)
    
    
class EmployeeListView(generics.ListAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.filter(is_active=True)


class EmployeeView(generics.RetrieveUpdateAPIView):
    http_method_names = ['post', 'put']
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()

    def perform_destroy(self, instance):
        instance.is_active = True
        instance.save()
    