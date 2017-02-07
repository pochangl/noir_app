#-*- coding: utf-8 -*-

import json
from tastypie.resources import Resource, ModelResource, fields, url, trailing_slash
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization, Authorization

from .models import Contact, Company, Employee, RegistrationToken
from tastypie.exceptions import Unauthorized, NotFound
from tastypie.http import HttpAccepted
from tastypie.models import create_api_key
from django.contrib.auth import get_user_model
from django.db.models import signals



class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = "contact"
        fields = ("id", "name")
        authentication = ApiKeyAuthentication()
        include_resource_uri = False


class CompanyResource(ModelResource):
    class Meta:
        queryset = Company.objects.all()
        resource_name = "company"
        fields = ("id", "name",)
        authentication = ApiKeyAuthentication()


class BasicEmployeeResource(ModelResource):
    class Meta:
        queryset = Employee.objects.all()
        fields = ("id",)


class EmployeeResource(BasicEmployeeResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="employees", full=True)

    class Meta:
        queryset = Employee.objects.all()
        resource_name = "employee"
        fields = ("id","title", )
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        include_resource_uri = False
             