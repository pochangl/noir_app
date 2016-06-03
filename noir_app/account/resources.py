from tastypie.resources import ModelResource, fields
from account import models
from account import models as account_models
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

#from transaction.resources import DebtResource


class ContactResource(ModelResource):
    class Meta:
        queryset = models.Contact.objects.all()
        resource_name = "contact"
        fields = ("id", "name", "title", "address", "phone", "mobile", "pid", "birthday",)
        authentcation = ApiKeyAuthentication()


class ClientResource(ModelResource):
    class Meta:
        queryset = models.Client.objects.all()
        resource_name = "client"
        fields = ("id", "company",)
        authentcation = ApiKeyAuthentication()


class EmployeeResource(ModelResource):
    contact = fields.OneToOneField("Account.ContactResource", attribute="contact", related_name="projects")
    debt = fields.ForeignKey("Transaction.DebtResource", attribute="debt", related_name="employees")
    
    class Meta:
        queryset = models.Employee.objects.all()
        fields = ("id","title",)
        