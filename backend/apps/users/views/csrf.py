from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET

@require_GET
@ensure_csrf_cookie
def csrf_token(request):
    return JsonResponse({"message": "CSRF cookie set"})