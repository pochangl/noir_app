# from rest_framework import generics
from rest_framework import generics, viewsets, mixins
from . import serializers, models, filters
from rest_framework.views import APIView
from account.models import Employee
from project.models import Pay
from transaction.models import BaseAccountBalance, PersonalAccountBalance
import datetime


class BaseAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.BaseAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.BaseAccountBalanceSerializer
    filter_class = filters.BaseAccountBalanceFilter
    
    
class PersonalAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.PersonalAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.PersonalAccountBalanceSerializer
#     filter_class = filters.PersonalAccountBalanceFilter

 
class SettleAccountListView(viewsets.ModelViewSet, generics.ListAPIView):
    http_method_names = ['get', 'put']
    queryset = models.BaseAccountBalance.objects.order_by("-date").filter(is_settled=False)
    serializer_class = serializers.BaseAccountBalanceSerializer
    select_settle_date = datetime.datetime(year=2017, month=4, day=5)

#     def get_queryset(self):
#         queryset = super(SettleAccountListView, self).get_queryset()
#         print self.request.settled_date
#         settled_date = datetime.datetime.combine(parse_date(self.request.GET['settled_date']), datetime.time(0, 0, 0, 0))
#         return settled_date
    
    @property
    def latest_settled_date(self):
        return BaseAccountBalance.objects.all()[0].latest_settled_date
        
    @property
    def unsettled_pays(self):
        # use gte, in case interrupt.
        return Pay.objects.order_by("-date").filter(is_settled=False, date__gte=self.latest_settled_date, date__lte=self.select_settle_date)

    @property
    def unsettled_balances(self):
        return PersonalAccountBalance.objects.order_by("-date").filter(is_settled=False, date__gte=self.latest_settled_date, date__lte=self.select_settle_date)
    
    def get(self, *args, **kwargs):
        return self.get(*args, **kwargs)
    
    #this action will settle all accounts.
    def put(self, request, *args, **kwargs):
        unsettled_records = models.BaseAccountBalance.objects.filter(is_settled=False, date__lte=self.select_settle_date)
        
        #recalculate each employee's pays, and then calculate the balances
        #recalculate all pays
        for pay in self.unsettled_pays:
            pay.recalculate_income()
        
        #calculate each employee's PersonalAccountBalance's balance
        for balance in self.unsettled_balances:
            balance.rebalance()
        
        #settle all accounts
        for record in unsettled_records:
            record.settle_all_records()

        return self.get(request, *args, **kwargs)
    