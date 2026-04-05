from django.urls import path
from .views import recipe_list, recipe_detail

urlpatterns = [
    path("recipes/", recipe_list),
    path("recipes/<int:pk>/", recipe_detail),
]
