from django.conf.urls import url, include
from . import views
urlpatterns = (
    url(r'^recent/$', views.RecentInsuranceListView.as_view()),
    url(r'^add/$', views.AddInsuranceView.as_view({'post': 'create'})),
    url(r'^remove/$', views.RemoveInsuranceView.as_view({'post': 'create'})),
    url(r'^employees/$', views.InsuranceEmployeeListView.as_view()),
)
