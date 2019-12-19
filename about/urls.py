from django.urls import path
from .views import about

app_name = 'about'

urlpatterns = [
    path('', about, name='about'),
]
