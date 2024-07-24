from django.urls import path
from . import views

urlpatterns = [
    path('<str:city_name>/', views.get_weather, name='get_weather'),
]
