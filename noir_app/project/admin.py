from django.contrib import admin
from .models import Project
from .models import EmployeeProject
from .models import Assignment
from .models import Blacklist

# Register your models here.

admin.site.register(Project)
admin.site.register(EmployeeProject)
admin.site.register(Assignment)
admin.site.register(Blacklist)

