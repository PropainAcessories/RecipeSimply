from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", health),
    path("", TemplateView.as_view(template_name="index.html")),
    path('admin/', admin.site.urls),
    path('api/', include('apps.api.urls')),
]

# React catch‑all (must NOT catch static or assets)
urlpatterns += [
   re_path(r"^(?!api/|static/|assets/|$).*", TemplateView.as_view(template_name="index.html")),
]
