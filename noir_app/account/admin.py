from django.contrib import admin
from .models import Contact, Client, Employee, Skill, EmployeeProject, Blacklist

# Register your models here.
admin.site.register(Contact)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Skill)
admin.site.register(EmployeeProject)
admin.site.register(Blacklist)




