# Generated by Django 4.1.5 on 2023-10-10 02:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe_app', '0016_remove_ingredient_ingredient'),
    ]

    operations = [
        migrations.AddField(
            model_name='ingredient',
            name='ingredient',
            field=models.CharField(default='banana', max_length=50),
            preserve_default=False,
        ),
    ]
