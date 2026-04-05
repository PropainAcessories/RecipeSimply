from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    recipe = models.ForeignKey(Recipe, related_name="ingredients", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    amount = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.amount} {self.name}"


class Step(models.Model):
    recipe = models.ForeignKey(Recipe, related_name="steps", on_delete=models.CASCADE)
    order = models.PositiveIntegerField()
    instruction = models.TextField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Step {self.order}"


class UserRecipeFavorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "recipe")

    def __str__(self):
        return f"{self.user.username} → {self.recipe.title}"
