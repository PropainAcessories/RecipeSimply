from django.urls import path
from .views import CurrentUserView, ProfileUpdateView

urlpatterns = [
    path("me/", CurrentUserView.as_view(), name="me"),
    path("me/update/", ProfileUpdateView.as_view(), name="me-update"),
]
