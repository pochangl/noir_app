from django.contrib import admin
from .models import Contact, Client, Employee, Skill

# Register your models here.
admin.site.register(Contact)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Skill)
