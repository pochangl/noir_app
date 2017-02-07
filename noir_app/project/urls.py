from django.conf.urls import patterns, url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'assignment', views.AssignmentViewSet)
router.register(r'employee_assignment', views.EmployeeAssignmentViewSet)

urlpatterns = (
    url('^', include(router.urls)),
    url(r'available_employee/(?P<assignment>\d+)/', views.AvailableEmployeeListView.as_view()),
    url(r'confirmed_employee/(?P<assignment>\d+)/', views.ConfirmedEmployeeListView.as_view()),
    url(r'assign_employee/(?P<pk>\d+)/(?P<employee>\d+)/', views.AssignEmployeeView.as_view()),
)

