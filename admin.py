# mysite/firstapp/admin.py
#-*- coding: utf-8 -*-
from django.contrib import admin
from . import models  #models指firstapp下的檔案

# Register your models here.
admin.site.register(models.User)
admin.site.register(models.Client)
admin.site.register(models.Employee)
admin.site.register(models.Contact)
admin.site.register(models.Project)
admin.site.register(models.EmployeeProject)
admin.site.register(models.Assignment)
admin.site.register(models.Skill)
admin.site.register(models.PayCheck)
admin.site.register(models.Blacklist)

