import json
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.http import HttpResponseNotAllowed
# for validation username a mhamdali
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..validators import (
    validate_username,
    validate_user_password,
)
#mat9arbch lhadchi a abkaram!!
#register(request):
#1. Read username and password from HTTP request#
# 2. Validate input#
# - Is username valid?
# #- Is password valid?
    #- Does username already exist?

#   3. Create user
       #- Hash password
       #- Insert user into PostgreSQL

    #4. Return HTTP response
       #- 201 if user created
       #- 400 if input invalid
       #- 409 if username already exists
#regex


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    try:
        data = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse(
            {"error": "Invalid JSON"},
            status=400
        )

    if not isinstance(data, dict):
        return JsonResponse(
            {"error": "Expected a JSON object"},
            status=400
        )

    username = data.get("username")
    password = data.get("password")

    try:
        validate_username(username)
        validate_user_password(password)
    except (ValueError, ValidationError) as e:
        return JsonResponse(
            {"error": str(e)},
            status=400
        )

    User = get_user_model()

    if User.objects.filter(username=username).exists():
        return JsonResponse(
            {"error": "Username already exists"},
            status=409
        )

    try:
        user = User.objects.create_user(
            username=username,
            password=password
        )
    except IntegrityError:
        return JsonResponse(
            {"error": "Username already exists"},
            status=409
        )

    return JsonResponse(
        {
            "message": "User registered successfully",
            "id": user.id,
            "username": user.username
        },
        status=201
    )