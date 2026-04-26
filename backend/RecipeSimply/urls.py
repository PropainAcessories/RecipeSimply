from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

# App internal routes. (People, settings, users/accounts, and searching)
urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("api-auth/", include("rest_framework.urls")),
    path("health/", health),
    path('api/', include('apps.api.urls')),
    path("api/", include("apps.users.urls")),  
    path("admin/", admin.site.urls),
]
