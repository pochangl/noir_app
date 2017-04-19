# from rest_framework import generics
from rest_framework import generics, viewsets, mixins, status
from . import serializers, models, filters
from rest_framework.views import APIView
from account.models import Employee
from project.models import Pay
from transaction.models import BaseAccountBalance, PersonalAccountBalance
# import datetime, time
from django.http.response import HttpResponse
from datetime import date, datetime


class BaseAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.BaseAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.BaseAccountBalanceSerializer
    
    
class PersonalAccountBalanceViewSet(viewsets.ModelViewSet, generics.ListAPIView):
    queryset = models.PersonalAccountBalance.objects.all().order_by("date")
    serializer_class = serializers.PersonalAccountBalanceSerializer
#     filter_class = filters.PersonalAccountBalanceFilter

 
class SettleAccountListView(viewsets.ModelViewSet):
    queryset = models.BaseAccountBalance.objects.order_by("-date").filter(is_settled=False)
    serializer_class = serializers.BaseAccountBalanceSerializer
    filter_class = filters.BaseAccountBalanceFilter
    
    @property
    def latest_settled_date(self):
        return BaseAccountBalance.objects.all()[0].latest_settled_date
        
    #this action will settle all accounts.
    def create(self, request, *args, **kwargs):
        get_settle_date = request.query_params.get('select_settle_date', date)
        select_settle_date = datetime.strptime(get_settle_date, "%Y-%m-%dT%H:%M:%SZ").date()
        today_date = datetime.now().date()
        if today_date < select_settle_date:
            raise Exception("Oops! Please Check The Selected Settle Date.")

        unsettled_records = models.BaseAccountBalance.objects.filter(is_settled=False, date__lte=select_settle_date)
        unsettled_pays = Pay.objects.order_by("-date").filter(is_settled=False, date__gte=self.latest_settled_date, date__lte=select_settle_date)
        unsettled_balances = PersonalAccountBalance.objects.order_by("-date").filter(is_settled=False, date__gte=self.latest_settled_date, date__lte=select_settle_date)
        
        #recalculate each employee's pays, and then calculate the balances
        #recalculate all pays
        for pay in unsettled_pays:
            pay.recalculate_income()
        
        #calculate each employee's PersonalAccountBalance's balance
        for balance in unsettled_balances:
            balance.rebalance()
        
        #settle all accounts
        for record in unsettled_records:
            record.settle_all_records()

        return HttpResponse(status=status.HTTP_204_NO_CONTENT)
    