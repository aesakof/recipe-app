from rest_framework import serializers
from recipe_app.models import Recipe

class RecipeSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="author.user_name", read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'recipe_name', 'username', 'photo', 'life_story', 'prep_time', 'cook_time', 'servings', 'ingredients', 'equipment', 'directions', 'published_date', 'updated_date', 'rating')
