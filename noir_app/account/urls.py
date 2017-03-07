from django.conf.urls import url, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register(r'contact', views.ContactView)
router.register(r'employee', views.EmployeeView)
router.register(r'company', views.CompanyView)

urlpatterns = (
    url(r'^', include(router.urls)),
    url(r'^user/$', views.UserView.as_view(), name='user'),
    url(r'^signup/$', views.SignupView.as_view(), name='signup'),
    url(r'^auth/$', views.AuthView.as_view(), name='auth'),
)
