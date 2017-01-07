from django.contrib import admin
from .models import Project, Assignment, EmployeeAssignment, Unassigned


class EmployeeAssignmenAdmin(admin.ModelAdmin):
    list_display = ("id", "employee", "assignment", "check_in")
    list_filter = ("employee",)
    list_editable = tuple()


# Register your models here.
admin.site.register(Project)
admin.site.register(Assignment)
admin.site.register(EmployeeAssignment, EmployeeAssignmenAdmin)
admin.site.register(Unassigned)
