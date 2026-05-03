from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView

def health(request):
    return JsonResponse({"status": "ok"})

# App internal routes. (People, settings, users/accounts, and searching)
urlpatterns = [
    path("", TemplateView.as_view(template_name="index.html")),
    path("api-auth/", include("rest_framework.urls")),
    path("health/", health),
    path("api/auth/", include("apps.users.urls")),
    path("api/users/", include("apps.users.profile_urls")),
    path("api/", include("apps.api.urls")),
    path("admin/", admin.site.urls),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)