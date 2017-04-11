from django.contrib import admin
from .models import  BaseAccountBalance, AccountBalance, OthersAccountBalance, PersonalAccountBalance, PersonalWithdraw, Salary


class AccountBalanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'balance', 'income', 'expense', 'date', 'is_settled')

class PersonalAccountBalanceAdmin(admin.ModelAdmin):
    list_display = ('id', 'employee', 'balance', 'income', 'expense', 'date', 'is_settled')


admin.site.register(BaseAccountBalance, AccountBalanceAdmin)
admin.site.register(AccountBalance, AccountBalanceAdmin)
# admin.site.register(OthersAccountBalance)
admin.site.register(PersonalAccountBalance, PersonalAccountBalanceAdmin)
admin.site.register(PersonalWithdraw, AccountBalanceAdmin)
admin.site.register(Salary)

        