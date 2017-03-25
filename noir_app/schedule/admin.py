from django.contrib import admin
from .models import  DayOff


class DayOffAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'start_datetime', 'end_datetime')

# Register your models here.
admin.site.register(DayOff, DayOffAdmin)