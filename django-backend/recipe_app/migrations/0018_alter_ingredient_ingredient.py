# Generated by Django 4.1.5 on 2023-10-10 02:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0017_ingredient_ingredient'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='ingredient',
            field=models.JSONField(null=True),
        ),
    ]
