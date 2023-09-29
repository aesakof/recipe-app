from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Recipe)
admin.site.register(models.Rating)
admin.site.register(models.Ingredient)

# @admin.register(models.Fillup)
# class FillupAdmin(admin.ModelAdmin):
#     list_display = ("user", "date", "price_per_gallon", "trip_distance", "gallons", "car", "total_sale", "mpg")