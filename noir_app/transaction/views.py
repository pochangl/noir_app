from rest_framework import generics
from . import serializers, models


class PersonalAccountBalanceListView(generics.ListAPIView):
    serializer_class = serializers.PersonalAccountBalanceSerializer
    queryset = models.PersonalAccountBalance.objects.all()

    def get_queryset(self):
        queryset = super(PersonalAccountBalanceListView, self).get_queryset()
        employee = self.kwargs['employee']
        return queryset.filter(employee=employee)