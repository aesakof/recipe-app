from rest_framework import serializers
from recipe_app.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('recipe_name', 'author', 'photo', 'life_story', 'prep_time', 'cook_time', 'servings', 'ingredients', 'equipment', 'directions', 'published_date', 'updated_date', 'rating')
