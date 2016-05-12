from django.contrib import admin
from .models import Transaction
from .models import PayCheck
from .models import Debt
from .models import Receivable

# Register your models here.

admin.site.register(Transaction)
admin.site.register(PayCheck)
admin.site.register(Debt)
admin.site.register(Receivable)

