from django.conf.urls import patterns, url
from transaction.views import ChooseEmployeeView, ChooseTransactionEmployeeView
from transaction.views import TransactionMakePaycheckView

from transaction.models import PayCheck

urlpatterns = (
    url(r'^$', ChooseEmployeeView.as_view(),name='choose_employee'),
    url(r'^paycheck/', 
        TransactionMakePaycheckView.as_view(model=PayCheck, success_url='/account/main_menu/'),
        name='paycheck'),
)
