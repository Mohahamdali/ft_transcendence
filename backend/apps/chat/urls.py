from django.urls import path

from .views import chat_health

urlpatterns = [
    path('health/', chat_health),
]
