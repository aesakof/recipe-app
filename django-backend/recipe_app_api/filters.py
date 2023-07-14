from rest_framework import generics
from django_filters import rest_framework as filters
from recipe_app.models import Recipe, Rating


class RecipeFilter(filters.FilterSet):
    # date = filters.DateFromToRangeFilter()

    class Meta:
        model = Recipe
        fields = ['author__user_name']


class RatingFilter(filters.FilterSet):

    class Meta:
        model = Rating
        fields = ['user__user_name','recipe']