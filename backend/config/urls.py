from django.contrib import admin
from django.urls import path , include
from apps.core.views import health

urlpatterns = [
    path('api/health/', health, name='health'),
    path('admin/', admin.site.urls),
    path("api/users/",include("apps.users.urls")),
]
