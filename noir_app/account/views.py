from rest_framework import generics
from . import models
from . import serializers


class EmployeeListView(generics.ListAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.filter(is_active=True)


class EmployeeView(generics.RetrieveDestroyAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()

    def perform_destroy(self, instance):
        instance.is_active = True
        instance.save()
