from tastypie.resources import ModelResource, fields
from account import models
from account import models as account_models
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
    client = fields.OneToOneField("Account.ClientResource", attribute="client", related_name="receivables")
    
    class Meta:
        queryset = models.Receivable.objects.all()
        resource_name = "receivable"
        fields = ("id",)
        authentcation = ApiKeyAuthentication()
        