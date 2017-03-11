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
    def get_employee(self):
        return self.queryset.model.objects.get(id=self.request.data['id'])

    def get_date(self):
        return parse_date(self.request.data['date'])

    def perform_create(self, serializer):
        models.Insurance.add([self.get_employee()], self.get_date())


class RemoveInsuranceView(AddInsuranceView):
    def perform_create(self, serializer):
        models.Insurance.remove([self.get_employee()], self.get_date())

