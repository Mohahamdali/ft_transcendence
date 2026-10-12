from django.conf import settings
from django.db import connection
from redis import Redis
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    # Development-only diagnostic endpoint. Restrict details in production.
    with connection.cursor() as cursor:
        cursor.execute('SELECT 1')
    with Redis.from_url(settings.REDIS_URL) as redis:
        redis.ping()
    return Response({'status': 'ok', 'database': 'ok', 'redis': 'ok', 'version': '0.0.1'})
