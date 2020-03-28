from django.urls import path
from .views import HomeView, redirectHome

app_name = 'home'

urlpatterns = [
    path('', redirectHome),
    path('home', HomeView.as_view(), name="home"),
]
