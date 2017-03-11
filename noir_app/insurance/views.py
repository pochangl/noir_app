import datetime
from django.utils import timezone
from django.db.models import Max, F
from django.utils.dateparse import parse_date
from rest_framework import mixins, generics, views
from . import serializers, models, filters
from account.views import EmployeeListView, EmployeeView


class RecentInsuranceListView(generics.ListAPIView):
    queryset = models.Insurance.objects.all()
    serializer_class = serializers.InsuranceSerializer
    filter_class = filters.InsuranceFilter


class InsuranceEmployeeListView(EmployeeListView):
    def get_queryset(self):
        date = parse_date(self.request.GET['date'])
        queryset = super(InsuranceEmployeeListView, self).get_queryset()
        ids = [ employee.id for employee in queryset if models.Insurance.is_insuranced(employee, date)]
        return queryset.filter(id__in=ids)


class AddInsuranceView(EmployeeView):
    @property
    def employee(self):
        return self.queryset.model.objects.get(id=self.request.data['id'])

    @property
    def date(self):
        return parse_date(self.request.data['date'])

    @property
    def insurance(self):
        try:
            return models.Insurance.objects.get(employee=employee, date=self.date)
        except models.Insurance.DoesNotExist:
             return models.Insurance.objects.create(employee=employee, date=self.date, action='add')

    def perform_create(self, serializer):
        insurance = self.insurance
        insurance.action = 'add'
        insurance.save()


class RemoveInsuranceView(AddInsuranceView):
    def perform_create(self, serializer):
        insurance = self.insurance
        insurance.action = 'remove'
        insurance.save()
