# Generated by Django 4.1.5 on 2023-10-11 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0020_remove_recipe_ingredients_old'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='ingredient',
            field=models.JSONField(blank=True, default=None, null=True),
        ),
    ]
