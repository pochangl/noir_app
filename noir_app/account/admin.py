from django.contrib import admin
from .models import Contact, Company, Employee, Skill

# Register your models here.
admin.site.register(Contact)
admin.site.register(Company)
admin.site.register(Employee)
admin.site.register(Skill)
