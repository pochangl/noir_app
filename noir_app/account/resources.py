#-*- coding: utf-8 -*-

import json
from tastypie.resources import Resource, ModelResource, fields, url, trailing_slash
from tastypie.authentication import ApiKeyAuthentication
from tastypie.authorization import ReadOnlyAuthorization, DjangoAuthorization, Authorization

from .models import Contact, Client, Employee, Skill, RegistrationToken
from tastypie.exceptions import Unauthorized, NotFound
from tastypie.http import HttpAccepted
from tastypie.models import create_api_key
from django.contrib.auth import get_user_model
from django.db.models import signals

signals.post_save.connect(create_api_key, sender=get_user_model()) # 帳號產生時自動生成API KEY


class RegistrationResource(Resource):
    """
        透過API註冊
        requirement: 要有個人帳號
        params:
            username - 帳號名稱
            token - '註冊用' 一次性token, 使用一次就失效
        returns: (json format)
            api_key - 'api用' 唯一token, 下一次再註冊就會失效(覆蓋)
    """
    class Meta:
        resource_name = "registration"
        detail_allowed_methods = ("post",) # 只使用POST

    def base_urls(self):
        """
            只使用detail
        """
        return [url(r"^(?P<resource_name>%s)%s$" % (self._meta.resource_name, trailing_slash), self.wrap_view('dispatch_detail'), name="api_dispatch_detail")]

    def post_detail(self, request, *args, **kwargs):
        """
            給予API KEY
        """
        try:
            username = request.POST["username"]
            token = request.POST["token"]
            token = RegistrationToken.objects.get(
                        user__username=username, token=token)
        except KeyError: # 輸入訊息不足
            raise Unauthorized()
        except RegistrationToken.DoesNotExist: # 找不到TOKEN
            raise NotFound()
        if not token.is_valid(): # TOKEN 己失效
            raise NotFound()
        token.mark_used()
        user = token.user
        # 重新設定API KEY
        user.api_key.key = False
        user.api_key.save()

        # 回傳API KEY
        return HttpAccepted(json.dumps({"api_key": user.api_key.key}), content_type="application/json")



class ContactResource(ModelResource):
    class Meta:
        queryset = Contact.objects.all()
        resource_name = "contact"
        fields = ("id", "name")
        authentication = ApiKeyAuthentication()


class ClientResource(ModelResource):
    class Meta:
        queryset = Client.objects.all()
        resource_name = "client"
        fields = ("id", "company",)
        authentication = ApiKeyAuthentication()


class EmployeeResource(ModelResource):
    contact = fields.ForeignKey(ContactResource, attribute="contact", related_name="employees",full=True)
    
    class Meta:
        queryset = Employee.objects.all()
        resource_name = "employee"
        fields = ("id","title")
        allowed_methods = ['get','post','put']
        authentication = ApiKeyAuthentication()
        authorization = DjangoAuthorization()
        include_resource_uri = False
       
   
class SkillResource(ModelResource):
    employee = fields.ForeignKey(EmployeeResource, attribute="employee", related_name="skills")
    
    class Meta:
        queryset = Skill.objects.all()
        resource_name = "skill"
        fields = ("id","name",)
        authentication = ApiKeyAuthentication()
             
