from django.http import JsonResponse


def chat_health(request):
    return JsonResponse({
        'service': 'chat',
        'status': 'ok',
    })
