# Generated by Django 4.1.5 on 2023-10-14 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0023_remove_ingredient_ingredients_ingredient_description_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='description',
            field=models.CharField(default='bananas', max_length=50),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='order',
            field=models.IntegerField(default=1),
        ),
    ]
