from django.contrib import admin
from .models import Contact, Client, Employee, Skill, Project, EmployeeProject, Assignment
from .models import Blacklist, Transaction, PayCheck, Debt, Receivable

# Register your models here.

admin.site.register(Contact)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Skill)
admin.site.register(Project)
admin.site.register(EmployeeProject)
admin.site.register(Assignment)
admin.site.register(Blacklist)
admin.site.register(Transaction)
admin.site.register(PayCheck)
admin.site.register(Debt)
admin.site.register(Receivable)
