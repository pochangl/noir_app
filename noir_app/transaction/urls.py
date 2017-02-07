from django.conf.urls import patterns, url
from transaction.views import TranChooseEmployeeView, ChooseTransactionEmployeeView
# from transaction.views import TransactionMakePaycheckView

# from transaction.models import PayCheck

urlpatterns = (
    url(r'^$', TranChooseEmployeeView.as_view(),name='tran_choose_employee'),
#     url(r'^paycheck/', 
#         TransactionMakePaycheckView.as_view(model=PayCheck, success_url='/account/main_menu/'),
#         name='paycheck'),
)
