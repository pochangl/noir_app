from django.conf.urls import patterns, url
from account.views import LoginView, logout, MainMenuView


urlpatterns = (
    url(r'^accounts/login/$', LoginView.as_view(), name='login'),
    url(r'^accounts/logout/$', logout, name='logout'),
    url(r'^main_menu/$', MainMenuView.as_view(), name='main_menu'),
)
