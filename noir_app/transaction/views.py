# from rest_framework import generics
from rest_framework import generics, viewsets, mixins
from . import serializers, models, filters
from rest_framework.views import APIView


class BaseAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.BaseAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.BaseAccountBalanceSerializer
#     filter_class = filters.BaseAccountBalanceFilter
    
    
class PersonalAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.PersonalAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.PersonalAccountBalanceSerializer
#     filter_class = filters.PersonalAccountBalanceFilter

 
class SettleAccountListView(viewsets.ModelViewSet, generics.ListAPIView):
    http_method_names = ['get', 'post']
    queryset = models.BaseAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.BaseAccountBalanceSerializer

    def get(self, *args, **kwargs):
        return self.get(*args, **kwargs)
    
    def post(self, *args, **kwargs):
        return self.create(*args, **kwargs)
    