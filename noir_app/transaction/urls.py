from django.conf.urls import patterns, url
from . import views

urlpatterns = (
    url(r'^personal_account_balance/(?P<employee>\d+)/$', views.PersonalAccountBalanceListView.as_view()),
)
