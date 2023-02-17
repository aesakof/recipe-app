from django.contrib import admin
from . import models

# Register your models here.
admin.site.register(models.Recipe)

# @admin.register(models.Fillup)
# class FillupAdmin(admin.ModelAdmin):
#     list_display = ("user", "date", "price_per_gallon", "trip_distance", "gallons", "car", "total_sale", "mpg")