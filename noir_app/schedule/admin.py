from django.contrib import admin
from .models import  DayOff, EmployeePreference, ProjectPreference


# Register your models here.
admin.site.register(DayOff)
admin.site.register(EmployeePreference)
admin.site.register(ProjectPreference)
