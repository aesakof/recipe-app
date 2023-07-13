from django.urls import path, include
from rest_framework import urlpatterns
from rest_framework.routers import SimpleRouter, DefaultRouter

from .views import RecipeViewSet, RatingViewSet, UserRating


app_name = 'recipe_app_api'

router = DefaultRouter()
router.register(r'recipes', RecipeViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user-rating/', UserRating, name='user_rating')
]