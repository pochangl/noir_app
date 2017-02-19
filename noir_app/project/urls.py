from django.conf.urls import patterns, url, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'assignment', views.AssignmentViewSet)
router.register(r'employee_assignment', views.EmployeeAssignmentViewSet)
router.register(r'project', views.ProjectViewSet)

urlpatterns = (
    url(r'^', include(router.urls)),
    url(r'available_employee/(?P<assignment>\d+)/', views.AvailableEmployeeListView.as_view()),
    url(r'assign_employee/(?P<pk>\d+)/(?P<employee>\d+)/', views.AssignEmployeeView.as_view()),
    url(r'propose_employee/(?P<assignment>\d+)/', views.ProposeEmployeeListView.as_view()),
    url(r'confirm_employee/(?P<employee_list>\d+)/', views.ConfirmEmployeeListView.as_view()),
    url(r'endorse_employee/(?P<employee_list>\d+)/', views.EndorseEmployeeListView.as_view()),
)

