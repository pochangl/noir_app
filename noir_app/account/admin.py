from django.contrib import admin
from .models import Contact
from .models import Client
from .models import Employee
from .models import Skill
# Register your models here.

admin.site.register(Contact)
admin.site.register(Client)
admin.site.register(Employee)
admin.site.register(Skill)

