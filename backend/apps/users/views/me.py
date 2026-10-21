from django.http import JsonResponse
from django.views.decorators.http import require_GET

@require_GET
def current_user(request):
    if not request.user.is_authenticated:
        return JsonResponse(
            {"error": "Authentication required"},
            status=401
        )

    return JsonResponse(
        {
            "id": request.user.id,
            "username": request.user.username,
            "is_authenticated": True
        },
        status=200
    )