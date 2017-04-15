from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'base_account_balance', views.BaseAccountBalanceViewSet)
router.register(r'personal_account_balance', views.PersonalAccountBalanceViewSet)

urlpatterns = (
    url(r'^', include(router.urls)),
    url(r'settle_account/(?P<pk>\d+)/', views.SettleAccountListView.as_view({'get': 'list'})),
)
