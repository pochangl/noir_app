from tastypie.resources import ModelResource, fields
#from django.db import models

from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization

from account.models import Contact, Client, Employee, Skill


class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = "contact"
        fields = ("id", "name")
        authentcation = ApiKeyAuthentication()


class ClientResource(ModelResource):
    class Meta:
        queryset = Client.objects.all()
        resource_name = "client"
        fields = ("id", "company",)
        authentcation = ApiKeyAuthentication()


class EmployeeResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="employees",full=True)
    
    class Meta:
        queryset = Employee.objects.all()
        resource_name = "employee"
        fields = ("id","title",)
        authentcation = ApiKeyAuthentication()
       
   
class SkillResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="skills")
    
    class Meta:
        queryset = Skill.objects.all()
        resource_name = "skill"
        fields = ("id","name",)
        authentcation = ApiKeyAuthentication()
             