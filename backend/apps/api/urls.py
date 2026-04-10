from django.urls import path
from .views import recipe_list, recipe_detail

# App external facing routes. (ex. pages, forums, etc)
urlpatterns = [
    path("recipes/", recipe_list, name="recipe-list"),
    path("recipes/<int:pk>/", recipe_detail, name="recipe-detail"),
]
