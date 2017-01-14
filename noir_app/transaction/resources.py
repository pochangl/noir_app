from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization

from transaction.models import Debt, Receivable, PayCheck, Transaction

from account.resources import ClientResource, EmployeeResource


class TransactionResource(ModelResource):

    class Meta:
        queryset = Transaction.objects.all()
        resource_name = "transaction"
        fields = ("id", "amount", "note", "sign_recoreds", "happened_date",)
        authentication = ApiKeyAuthentication()
        
        
class DebtResource(TransactionResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="debts", full=True, readonly=True)
    
    class Meta:
        queryset = Debt.objects.all()
        resource_name = "debt"
        include_resource_uri = False
        fields = ("id", "amount", "note", "sign_recoreds", "create_time", "modify_time", "happened_date",)
        filtering = {
            "employee": ('exact',),
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()


class ReceivableResource(TransactionResource):
    client = fields.ForeignKey(ClientResource, attribute="client", related_name="receivables")
    
    class Meta:
        queryset = Receivable.objects.all()
        resource_name = "receivable"
        fields = ("id", "amount", "note",)
        authentication = ApiKeyAuthentication()
        
        
class PayCheckResource(TransactionResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="paychecks", full=True, readonly=True)

    class Meta:
        always_return_data = True
        queryset = PayCheck.objects.all()
        resource_name = "paycheck"
        include_resource_uri = False
        fields = ("id", "amount", "reason_code", "reason", "signature", "create_time", "modify_time", "happened_date", "normal_work_hour", "overtime_work_hour", "is_payed",)
        filtering = {
            "employee": ('exact',),
            "is_payed": ALL,
        }
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        
