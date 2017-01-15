from django.contrib import admin
from .models import  Transaction, PayCheck, Receivable


admin.site.register(Receivable)
admin.site.register(PayCheck)
admin.site.register(Transaction)
