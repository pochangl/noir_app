#-*- coding: utf-8 -*-
from django.test import Client, TestCase
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.utils.timezone import now
import copy


class UserSetupMixin(object):
    """
        test mixin for generating user related model
    """
    def get_password(self, username):
        """
            從username計算出
        """
        return "%s_psw" % username

    def create_username(self):
        """
            創造使用者名稱
        """
        if not hasattr(self, "user_count"):
            self.user_count = 0
        self.user_count = self.user_count + 1
        return "name_%d" % self.user_count

    def get_user(self, user):
        """
           傳回最新的user物件 
        """
        return get_user_model().objects.get(pk=user.pk)

    def create_user(self, username=None, **old_kwargs):
        """
            創造使用者
            params:
                username - 使用者帳號, 如果沒有就自動生成
                **old_kwargs - 建立帳號時要順便設定的User參數
            return:
                User Model
            
        """
        username = self.create_username()
        kwargs = copy.deepcopy(old_kwargs)
        kwargs.update({
            "password": kwargs.get("password", self.get_password(username)),
            "username": username,
            "email": kwargs.get("email", "%s@example.com" % username),
        })
        user = get_user_model().objects.create_user(**kwargs)
        user.save()
        return user

    def get_anonymous_client(self):
        """
            創造未登入的客戶端
        """
        return Client()


    def get_logged_in_client(self, user=None):
        """
            創造己登入的客戶端
            params:
                user - 登入帳號, 未提供的話就建個新的
                       user為匿名帳號的話就回傳未登入帳號
        """
        if user is None:
            user = self.create_user()
        elif user.is_anonymous():
            return self.get_anonymous_client()

        client = Client()
        client.post(reverse('login'), {
            "username": user.username,
            "password": self.get_password(user.username)})
        return client

class RegistrationTokenTest(UserSetupMixin, TestCase):
    url = "%s?format=json" % reverse("api_dispatch_detail", kwargs={"api_name": "v1", "resource_name": "registration"})

    def test_registration(self):
        """
            測試正確流程. 成生帳號 -> 成生registration token -> 透過api註冊 -> 回傳username跟api_token
        """
        user = self.create_user()
        token = user.reg_tokens.create()
        client = self.get_logged_in_client(user=user)
        response = client.post(self.url, {"username": user.username, "token": token.token}) # 註冊
        self.assertEqual(response.status_code, 202, "status code not Accepted") # 必需是Http 202 accepted
        api_key = self.get_user(user=user).api_key.key # 刷新 user 資料

        # 檢查API KEY正確性
        r_api_key = response.json()["api_key"]
        self.assertEqual(r_api_key, api_key, "Api Key: '%s' does Not match '%s'" % (api_key, r_api_key))
        
