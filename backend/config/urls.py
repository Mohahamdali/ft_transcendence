from django.contrib import admin
from django.urls import path
from apps.core.views import health

urlpatterns = [
    path('api/health/', health, name='health'),
    path('admin/', admin.site.urls),
]
