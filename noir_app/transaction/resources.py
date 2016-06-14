from tastypie.resources import ModelResource, fields
from transaction import models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

#from account.resources import ClientResource


class DebtResource(ModelResource):
    class Meta:
        queryset = models.Debt.objects.all()
        resource_name = "debt"
        fields = ("id", "amount",)
        authentcation = ApiKeyAuthentication()


class ReceivableResource(ModelResource):
    client = fields.OneToOneField("account.ClientResource", attribute="client", related_name="receivables")
    
    class Meta:
        queryset = models.Receivable.objects.all()
        resource_name = "receivable"
        fields = ("id",)
        authentcation = ApiKeyAuthentication()
        
        
class PayCheckResource(ModelResource):
    employee = fields.OneToOneField("account.Employee", attribute="employee", related_name="paychecks")
    
    class Meta:
        queryset = models.PayCheck.objects.all()
        resource_name = "paycheck"
        fields = ("id","amount", "reason_code", "reason", "paycheckcol")
        authentcation = ApiKeyAuthentication()
        
        
class TransactionResource(ModelResource):
    receivable = fields.OneToOneField("transaction.ReceivableResource", attribute="receivable", related_name="transactions")
    paycheck = fields.OneToOneField("transaction.PayCheck", attribute="paycheck", related_name="transactions")
    
    class Meta:
        queryset = models.Transaction.objects.all()
        resource_name = "transaction"
        fields = ("id",)
        authentcation = ApiKeyAuthentication()
