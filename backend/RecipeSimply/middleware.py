from django.conf import settings
from django.http import HttpResponsePermanentRedirect

class DisableSSLRedirectForHealth:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # If this is the health check, do NOT redirect to HTTPS
        if request.path == "/health/":
            return self.get_response(request)

        # Otherwise, apply normal SECURE_SSL_REDIRECT behavior
        if settings.SECURE_SSL_REDIRECT and not request.is_secure():
            return HttpResponsePermanentRedirect("https://" + request.get_host() + request.get_full_path())

        return self.get_response(request)
