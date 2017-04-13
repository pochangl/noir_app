# from django.conf.urls import url
from django.conf.urls import url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'personal_account_balance', views.PersonalAccountBalanceViewSet)

urlpatterns = (
    url(r'^', include(router.urls)),
#     url(r'^personal_account_balance/', views.PersonalAccountBalanceListView.as_view()),
)
