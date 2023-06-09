from rest_framework import serializers
from recipe_app.models import Recipe, Rating


class RatingSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.user_name", read_only=True)
    date_published = serializers.DateField(source="published_date", read_only=True)

    class Meta:
        model = Rating
        fields = ('id', 'username', 'rating', 'comment', 'recipe', 'date_published')


class RecipeSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="author.user_name", read_only=True)
    date_published = serializers.DateField(source="published_date", read_only=True)
    date_last_updated = serializers.DateField(source="updated_date", read_only=True)
    ratings = RatingSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ('id', 'recipe_name', 'username', 'photo', 'life_story', 'prep_time', 'cook_time', 'servings', 'ingredients', 'equipment', 'directions', 'date_published', 'date_last_updated', 'ratings')
