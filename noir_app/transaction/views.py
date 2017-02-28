from rest_framework import generics
from . import serializers, models, filters


class PersonalAccountBalanceListView(generics.ListAPIView):
    queryset = models.PersonalAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.PersonalAccountBalanceSerializer
    filter_class = filters.PersonalAccountBalanceFilter
