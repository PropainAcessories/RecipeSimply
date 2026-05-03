from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
User = get_user_model()

class Recipe(models.Model):
    author = models.ForeignKey(User, 
                               on_delete=models.CASCADE, 
                               related_name="recipes",
                               null=True,
                               blank=True
                               )
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ingredients = models.TextField()
    steps = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    

class Comment(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="comments")
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Like(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="likes")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Meta:
    unique_together = ("recipe", "user")
    indexes = [
        models.Index(fields=["recipe", "user"]),
    ]
