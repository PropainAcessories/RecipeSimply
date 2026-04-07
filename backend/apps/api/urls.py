from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root(request):
    return JsonResponse({"status": "ok", "app": "RecipeSimply API"})

urlpatterns = [
    path("", root),  # Root health check
    path("admin/", admin.site.urls),
    path("api/", include("apps.api.urls")),
]
