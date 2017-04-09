from django.contrib import admin
from .models import  BaseAccountBalance, AccountBalance, OthersAccountBalance, PersonalAccountBalance, PersonalWithdraw, Salary


admin.site.register(BaseAccountBalance)
admin.site.register(AccountBalance)
# admin.site.register(OthersAccountBalance)
admin.site.register(PersonalAccountBalance)
admin.site.register(PersonalWithdraw)
admin.site.register(Salary)

        