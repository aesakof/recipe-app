from rest_framework import serializers
from recipe_app.models import Recipe, Rating, Ingredient
import json


class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.user_name", read_only=True)
    date_published = serializers.DateField(source="published_date", read_only=True)
    date_last_updated = serializers.DateField(source="updated_date", read_only=True)

    class Meta:
        model = Rating
        fields = ('id', 'username', 'rating', 'review', 'recipe', 'date_published', 'date_last_updated', 'photo')


class IngredientSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ingredient
        fields = ('id', 'description', 'order', 'header')


class RecipeSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.user_name", read_only=True)
    date_published = serializers.DateField(source="published_date", read_only=True)
    date_last_updated = serializers.DateField(source="updated_date", read_only=True)
    avg_rating = serializers.DecimalField(read_only=True, max_digits=5, decimal_places=1)
    num_ratings = serializers.IntegerField(read_only=True)

    ingredients = IngredientSerializer(many=True, required=False)

    class Meta:
        model = Recipe
        fields = ('id', 'recipe_name', 'username', 'photo', 'life_story', 'ingredients', 'prep_time', 'cook_time', 'servings', 'equipment', 'directions', 'date_published', 'date_last_updated', 'avg_rating', 'num_ratings')

    def create(self, validated_data):

        if 'ingredients' in validated_data:
            ingredients_data = validated_data.pop('ingredients')
        else:
            ingredients_data_str = self.context['request'].POST.get('ingredients', '[]')
            ingredients_data = json.loads(ingredients_data_str)

        recipe = Recipe.objects.create(**validated_data)
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
        return recipe