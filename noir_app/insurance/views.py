from rest_framework import viewsets, mixins 
from . import serializers, models


class InsuranceViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.InsuranceSerializer
    queryset = models.Insurance.objects.all()
    filter_fields = ("date",)

    def post(self, *args, **kwargs):
        employee = self.request.data['id']
        date = self.request.data['date']
        obj = models.Insurance.objects.get_or_create(employee=employee, date=date)
        return self.get(pk=obj.id, *args, **kwargs)
