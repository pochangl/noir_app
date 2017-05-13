from django.contrib import admin
from .models import Project, Assignment, EmployeeAssignment, ProposedEmployeeList, Pay


class EmployeeAssignmenAdmin(admin.ModelAdmin):
    list_display = ("id", "employee", "assignment", "hours", "overtime")
    list_filter = ("employee",)
    list_editable = tuple()


class PayAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee_assignment', 'salary', 'balance', 'income', 'expense', 'date', 'is_settled')
    list_filter = ("employee",)
    
    
# Register your models here.
admin.site.register(Project)
admin.site.register(Assignment)
admin.site.register(EmployeeAssignment, EmployeeAssignmenAdmin)
admin.site.register(ProposedEmployeeList)
admin.site.register(Pay, PayAdmin)
