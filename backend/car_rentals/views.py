from django.http import JsonResponse
import json

from car_rentals.models import PriceTracker


def index(request):
    body = json.loads(request.body)
    airport = body['airport'].upper()
    grid = PriceTracker.getPriceGrid(airport)
    return JsonResponse(grid)
