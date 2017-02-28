from django.conf.urls import patterns, url, include
from . import views
from rest_framework import routers
router = routers.DefaultRouter()

router.register(r'insurance', views.InsuranceViewSet)


urlpatterns = (
    url(r'^', include(router.urls)),
)
