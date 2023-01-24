# Generated by Django 4.1.5 on 2023-01-15 21:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Recipe',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('recipe_name', models.CharField(max_length=50)),
                ('photo', models.ImageField(upload_to='')),
                ('life_story', models.CharField(max_length=500)),
                ('prep_time', models.IntegerField()),
                ('cook_time', models.IntegerField()),
                ('servings', models.IntegerField()),
                ('ingredients', models.CharField(max_length=500)),
                ('equipment', models.CharField(max_length=500)),
                ('directions', models.CharField(max_length=500)),
                ('published_date', models.DateField()),
                ('updated_date', models.DateField()),
                ('rating', models.IntegerField()),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]