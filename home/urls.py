from django.urls import path
from . import views

app_name = 'home'

urlpatterns = [
    path('', views.redirectHome),
    path('home', views.home),
]
