# Generated by Django 4.1.5 on 2023-07-04 20:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0007_alter_rating_recipe_alter_rating_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='rating',
            old_name='comment',
            new_name='review',
        ),
    ]
