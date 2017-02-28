from django.conf.urls import patterns, url, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'contact', views.ContactView)
router.register(r'employee', views.EmployeeView)
router.register(r'company', views.CompanyView)

urlpatterns = (
    url(r'^', include(router.urls)),
)
