from django.conf.urls import patterns, url, include
from . import views
urlpatterns = (
    url(r'^recent/$', views.RecentInsuranceListView.as_view()),
    url(r'^add/$', views.AddInsuranceView.as_view()),
    url(r'^remove/$', views.RemoveInsuranceView.as_view()),
)
