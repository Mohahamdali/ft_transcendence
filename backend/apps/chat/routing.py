from django.urls import path

from .consumers import EchoConsumer

websocket_urlpatterns = [
    path('ws/chat/echo/', EchoConsumer.as_asgi()),
]
