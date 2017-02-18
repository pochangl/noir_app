from tastypie.resources import ModelResource, fields

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization

from transaction.models import AbstractAccountBalance, AccountBalance, OthersAccountBalance, PersonalAccountBalance, PersonalWithdraw

from account.resources import CompanyResource, EmployeeResource
    
    
class AbstractAccountBalanceResource(ModelResource):
#     previous = fields.ForeignKey(AccountBalanceResource, attribute="previous", related_name="abstract_account_balance")

    class Meta:
#         queryset = AbstractAccountBalance.objects.all()    #AttributeError: type object 'AbstractAccountBalance' has no attribute 'objects'
        resource_name = "abstract_account_balance"
        fields = ("id", "balance", "income", "expense", "note", "date",)
        authentication = ApiKeyAuthentication()


class AccountBalanceResource(AbstractAccountBalanceResource):
    class Meta:
#         queryset = AccountBalance.objects.all()    #AttributeError: type object 'OthersAccountBalance' has no attribute 'objects'
        resource_name = "account_balance"
    

class OthersAccountBalanceResource(AbstractAccountBalanceResource):
    master = fields.ForeignKey(AccountBalanceResource, attribute="master", related_name="others_account_balance")

    class Meta:
#         queryset = OthersAccountBalance.objects.all()    #AttributeError: type object 'OthersAccountBalance' has no attribute 'objects'
        resource_name = "others_account_balance"
        
        
class PersonalAccountBalanceResource(OthersAccountBalanceResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="my_balance")
        
    class Meta:
        queryset = PersonalAccountBalance.objects.all()
        resource_name = "personal_account_balance"
        fields = ("id", "date",)
        allowed_methods = ['get',]

        
class PersonalWithdrawResource(PersonalAccountBalanceResource):
    class Meta:
        queryset = PersonalWithdraw.objects.all()
        resource_name = "personal_withdraw"
        fields = ("id", "signature",)
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        
class SalaryResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="salaries")    
    
    class Meta:
        queryset = PersonalWithdraw.objects.all()
        resource_name = "personal_withdraw"
        fields = ("id", "hourly", "overtime", "start_time")
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        

    