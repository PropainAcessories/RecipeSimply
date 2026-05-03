from django.urls import path
from .views.recipe import RecipeListCreateView, RecipeDetailView
from .views.comment import CommentListCreateView
from .views.like import LikeToggleView
from .views.feed import FeedView
from .views.profile import UserRecipesView, UserLikedRecipesView

# App specific routes, feed, forum, comments/likes

urlpatterns = [
    # Feed
    path("recipes/feed/", FeedView.as_view(), name="recipe-feed"),

    # Recipes
    path("recipes/", RecipeListCreateView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),

    # Comments
    path("recipes/<int:recipe_id>/comments/", CommentListCreateView.as_view(), name="recipe-comments"),

    # Likes
    path("recipes/<int:recipe_id>/like/", LikeToggleView.as_view(), name="recipe-like"),

    path("users/me/recipes/", UserRecipesView.as_view(), name="user-recipes"),
    
    path("users/me/likes/", UserLikedRecipesView.as_view(), name="user-liked-recipes"),
]
