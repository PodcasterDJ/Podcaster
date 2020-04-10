from django.urls import path
from . import views

app_name = 'joinnewsletter'

urlpatterns = [
    path('', views.newsletter, name='joinnewsletter'),
]