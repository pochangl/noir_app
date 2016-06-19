from django.contrib import admin
from .models import  Transaction, PayCheck, Debt, Receivable

# Register your models here.
admin.site.register(Debt)
admin.site.register(Receivable)
admin.site.register(PayCheck)
#admin.site.register(Transaction)
