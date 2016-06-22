from django.conf.urls import patterns, url
from transaction.views import ChooseTransactionView, ChooseTransactionEmployeeView
from transaction.views import TransactionMakePaycheckView

from transaction.models import PayCheck

urlpatterns = (
    url(r'^$', 
        ChooseTransactionView.as_view(), 
        name='transaction_choose_project'),
    url(r'^(?P<project_pk>[0-9]+)/$', 
        ChooseTransactionEmployeeView.as_view(), 
        name='transaction_choose_employee'),
    url(r'^(?P<project_pk>[0-9]+)/(?P<employee_pk>[0-9]+)/$', 
        TransactionMakePaycheckView.as_view(model=PayCheck, success_url='/account/main_menu/'),
        name='transaction_make_paycheck'),
)
