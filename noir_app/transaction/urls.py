from django.conf.urls import patterns, url
from transaction.views import ChooseTransactionView, ChooseTransactionEmployeeView
from transaction.views import TransactionMakePaycheckView

from transaction.models import PayCheck

urlpatterns = (
    url(r'^$', 
        TransactionMakePaycheckView.as_view(model=PayCheck, success_url='/account/main_menu/'),
        name='paycheck'),
)
