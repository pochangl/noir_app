from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization

from transaction.models import Debt, Receivable, PayCheck, Transaction

from account.resources import ClientResource, EmployeeResource


class TransactionResource(ModelResource):

    class Meta:
        queryset = Transaction.objects.all()
        resource_name = "transaction"
        fields = ("id", "amount", "note")
        authentcation = ApiKeyAuthentication()
        
        
class DebtResource(TransactionResource):
    
    class Meta:
        queryset = Debt.objects.all()
        resource_name = "debt"
        fields = ("id", "amount", "note",)
        authentcation = ApiKeyAuthentication()


class ReceivableResource(TransactionResource):
    client = fields.ForeignKey(ClientResource, attribute="client", related_name="receivables")
    
    class Meta:
        queryset = Receivable.objects.all()
        resource_name = "receivable"
        fields = ("id", "amount", "note",)
        authentcation = ApiKeyAuthentication()
        
        
class PayCheckResource(TransactionResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="paychecks", full=True)
    
    class Meta:
        queryset = PayCheck.objects.all()
        resource_name = "paycheck"
        fields = ("id", "amount", "reason_code", "reason",)
        allowed_methods = ['get','post','put']
        authentcation = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        