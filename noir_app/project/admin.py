from django.contrib import admin
from .models import Project, Assignment, EmployeeAssignment


# Register your models here.
admin.site.register(Project)
admin.site.register(Assignment)
admin.site.register(EmployeeAssignment)
