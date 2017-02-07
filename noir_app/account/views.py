from rest_framework import generics
from . import models
from . import serializers


class EmployeeListView(generics.ListAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()


class EmployeeView(generics.RetrieveAPIView):
    serializer_class = serializers.EmployeeSerializer
    queryset = models.Employee.objects.all()
