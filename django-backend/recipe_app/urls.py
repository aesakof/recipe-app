from django.urls import path
from django.views.generic import TemplateView

app_name = 'recipe_app'

urlpatterns = [
    path('', TemplateView.as_view(template_name="recipe_app/index.html")),
]