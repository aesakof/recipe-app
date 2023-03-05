from django.db import models
from django.forms import IntegerField
from django.conf import settings

# Create your models here.


class Recipe(models.Model):
    
    class RecipeObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset()

    recipe_name = models.CharField(max_length=50)
    author = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='images/')
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