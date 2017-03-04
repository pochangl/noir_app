from django.contrib import admin
from .models import Insurance


class InsuranceAdmin(admin.ModelAdmin):
    list_display = ("id", "employee", "date", "action", "create_time", "modify_time")


# Register your models here.
admin.site.register(Insurance, InsuranceAdmin)
