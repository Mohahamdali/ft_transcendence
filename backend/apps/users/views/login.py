
from django.core.exceptions import ValidationError
from rest_framework.decorators import api_view
from ..validators import (
    validate_username,
    validate_user_password,
)
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate
from django.contrib.auth import login
from django.views.decorators.http import require_POST

# abkaram mat9arbch lhna
#   9ra JSON ! hadi dartha
#  Validate username and password ! hadi dartha
#  Authenticate user ! hadi dartha
#  Create secure session ! hadi dartha
#  Return HTTP response !hadi dartha
@require_POST
@api_view(["POST"])
def login_view(request) :
    try :
        data = json.loads(request.body)
    except (json.JSONDecodeError,json.UnicodeDecodeError) :
        return JsonResponse(
            {"Error" :"Invalid json"},
            status = 400
        )
    if not isinstance(data,dict) :
        return JsonResponse(
            {"Error" :"Expected a JSON object"},
            status = 400
        )
    username =  data.get("username")
    password =  data.get("password")
    if not isinstance(username, str) or not username.strip():
        return JsonResponse(
            {"error": "Invalid input"},
            status=400
        )
    if not isinstance(password, str) or not password:
        return JsonResponse(
            {"error": "Invalid input"},
            status=400
        )
    user  = authenticate (username=username,password= password)
    if user is None:
        return JsonResponse(
        {"error": "Invalid credentials"},
        status=401
        )
    login(request,user)
    return JsonResponse(
    {
        "message": "Login successful",
        "id": user.id,
        "username": user.username
    },
    status=200
)