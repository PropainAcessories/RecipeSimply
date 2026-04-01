from django.http import JsonResponse
from core.models import Message

def hello(request):
    msg = Message.objects.first()
    return JsonResponse({"message": msg.text})


# Create your views here.
