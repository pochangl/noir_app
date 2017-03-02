import datetime
from django.utils import timezone
from rest_framework import mixins, generics
from . import serializers, models
from account.views import EmployeeListView


class RecentInsuranceListView(generics.ListAPIView):
    serializer_class = serializers.InsuranceSerializer
    queryset = models.Insurance.objects.all()

    def get_queryset(self):
        now = timezone.now()
        yesterday = now.date() - datetime.timedelta(day=1)
        return super(RecentInsuranceListView, self).get_queryset().filter(time_created__gte=yesterday)


class AddInsuranceView(mixins.CreateModelMixin, EmployeeListView):
    def get_queryset(self):
        ids = [employee['id'] for employee in self.request.data]
        return Employee.objects.filter(id__in=ids)

    def get_serializer(self, *args, **kwargs):
        kwargs['many'] = True
        return super(ProposeEmployeeListView, self).get_serializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        self.create(request, *args, **kwargs)
        return self.get(request, *args, **kwargs)

    def perform_create(self, serializer):
        Insurance.add(self.get_queryset())


class RemoveInsuranceView(AddInsuranceView):
    def perform_create(self, serializer):
        Insurance.remove(self.get_queryset())

