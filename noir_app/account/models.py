#-*- coding: utf-8 -*-
import uuid
import hmac
from hashlib import sha1

from django.conf import settings
from django.db import models
from django.utils.timezone import now, timedelta
from utils.models import TimeStampModel
from django.utils.decorators import classonlymethod


# Create your models here.
class Contact(TimeStampModel):
    name = models.CharField(max_length=128)
    title = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    phone = models.IntegerField()
    mobile = models.IntegerField()
    pid = models.CharField(max_length=128)
    birthday = models.DateField()
    
    def __str__(self):
        return self.name


class Client(TimeStampModel):
    company = models.CharField(max_length=128)

    def __str__(self):
        return self.company


class Employee(TimeStampModel):
    contact = models.ForeignKey(Contact, related_name='employees')
    title = models.CharField(max_length=128)

    def __str__(self):
        return self.contact.name


class Skill(TimeStampModel):
    employee = models.ForeignKey(Employee, related_name='skills')
    name = models.CharField(max_length=128)

    def __str__(self):
        return "%s - %s" % (self.employee.contact.name, self.name)


class RegistrationToken(TimeStampModel):
    """
        註冊token的table
        fields:
            user - 註冊帳號
            token - 註冊用token
            used - 使用日期, None為未使用
            expiration - 過期日
    """
    user = models.ForeignKey("auth.User", related_name="reg_tokens")
    token = models.CharField(max_length=16)
    used = models.DateTimeField(blank=True, null=True, default=None)
    expiration = models.DateTimeField()

    class Meta:
        unique_together = (("user", "token"),)
 
    def is_valid(self):
        return not self.used and self.expiration > now()

    def generate_key(self):
        # Get a random UUID.
        new_uuid = uuid.uuid4()
        # Hmac that beast.
        return hmac.new(new_uuid.bytes, digestmod=sha1).hexdigest()[:settings.REG_TOKEN_LENGTH]

    def save(self, *args, **kwargs):
        if not self.token:
            self.token = self.generate_key()
            self.expiration = now() + timedelta(seconds = settings.REG_EXP_DURATION)
            
        return super(RegistrationToken, self).save(*args, **kwargs)

