from django.db import models
from django.forms import IntegerField

# Create your models here.


class Recipe(models.Model):
    
    class RecipeObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    recipe_name = models.CharField(max_length=50)
    author = models.CharField() #need to update with User foreign key
    photo = models.ImageField()
    life_story = models.CharField(max_length=500)
    prep_time = models.IntegerField()
    cook_time = models.IntegerField()
    servings = models.IntegerField()
    ingredients = models.CharField(max_length=500)
    equipment = models.CharField(max_length=500)
    directions = models.CharField(max_length=500)
    published_date = models.DateField()
    updated_date = models.DateField()
    rating = models.IntegerField()
    objects = models.Manager() # default manager
    recipeobjects = RecipeObjects() # custom manager