
from django.contrib.auth import logout
from django.http import JsonResponse, HttpResponseNotAllowed

def logout_view(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    logout(request)

    return JsonResponse(
        {"message": "Logged out successfully"},
        status=200
    )