from django.urls import path


from django.urls import path
from .views.register import register
from .views.login import login_view
from .views.logout import logout_view
from .views.me import current_user

from.views.csrf import csrf_token 
urlpatterns = [
    path("register/", register, name="register"),
    path("login/", login_view, name="login") ,
    path("logout/",logout_view, name ="logout") ,
    path("me/",current_user, name="current_user"),
    path("csrf/", csrf_token, name="csrf"),
]