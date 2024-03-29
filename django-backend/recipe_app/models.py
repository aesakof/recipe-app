from django.db import models
from django.db.models import Avg
from django.db.models.query import QuerySet
from django.forms import IntegerField
from django.conf import settings
from django.utils import timezone
from datetime import date

# Create your models here.


class Recipe(models.Model):
    
    class RecipeObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    recipe_name = models.CharField(max_length=50)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='images/recipes/', blank=True)
    life_story = models.CharField(max_length=500)
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()
    servings = models.IntegerField()
    # ingredients_old = models.CharField(max_length=500)
    equipment = models.CharField(max_length=500)
    directions = models.CharField(max_length=500)
    published_date = models.DateField(default=date.today)
    updated_date = models.DateField(default=date.today)
    # rating = models.IntegerField()
    objects = models.Manager() # default manager
    recipeobjects = RecipeObjects() # custom manager


class Rating(models.Model):

    # class RatingObjects(models.Manager):
    #     def get_queryset(self):
    #         return super().get_queryset()
        
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    rating = models.IntegerField()
    review = models.CharField(max_length=500)
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE, related_name='ratings')
    published_date = models.DateField(default=date.today)
    updated_date = models.DateField(default=date.today)
    photo = models.ImageField(upload_to='images/ratings/', blank=True)


class Ingredient(models.Model):
    
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE, related_name='ingredients')
    description = models.CharField(max_length=50, default="bananas")
    header = models.BooleanField(default=False)
    order = models.IntegerField(default=1)
    
    # ingredients = models.JSONField(blank=True, default=None, null=True)