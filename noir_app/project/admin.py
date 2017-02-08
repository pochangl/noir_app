from django.contrib import admin
from .models import Project, Assignment, EmployeeAssignment, ProposedEmployeeList


class EmployeeAssignmenAdmin(admin.ModelAdmin):
    list_display = ("id", "employee", "assignment", "hours", "overtime")
    list_filter = ("employee",)
    list_editable = tuple()


# Register your models here.
admin.site.register(Project)
admin.site.register(Assignment)
admin.site.register(EmployeeAssignment, EmployeeAssignmenAdmin)
admin.site.register(ProposedEmployeeList)
