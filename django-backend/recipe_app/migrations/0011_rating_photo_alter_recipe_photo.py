# Generated by Django 4.1.5 on 2023-08-27 21:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0010_rename_author_recipe_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='rating',
            name='photo',
            field=models.ImageField(blank=True, upload_to='images/ratings/'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='photo',
            field=models.ImageField(blank=True, upload_to='images/recipes/'),
        ),
    ]
