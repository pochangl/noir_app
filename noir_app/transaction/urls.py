from django.conf.urls import url
from . import views

urlpatterns = (
    url(r'^personal_account_balance/', views.PersonalAccountBalanceListView.as_view()),
)
