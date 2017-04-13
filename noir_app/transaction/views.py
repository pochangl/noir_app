# from rest_framework import generics
from rest_framework import generics, viewsets
from . import serializers, models, filters


# class PersonalAccountBalanceListView(generics.ListAPIView):
class PersonalAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.PersonalAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.PersonalAccountBalanceSerializer
    filter_class = filters.PersonalAccountBalanceFilter
