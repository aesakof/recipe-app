from rest_framework import generics, viewsets, filters
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwner
from recipe_app.models import Recipe
from .serializers import RecipeSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Min, Max, Avg, Count, F
from rest_framework.response import Response
from datetime import date
# from .filters import RecipeFilter

class RecipePagination(PageNumberPagination):
    page_size = 12


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    pagination_class = RecipePagination
    lookup_field = "id"
    filter_backends = [DjangoFilterBackend]
    # filterset_class = RecipeFilter 
    # filterset_fields = ('user__user_name','date')

    queryset = Recipe.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        # serializer.save(published_date=date.today())
        # serializer.save(updated_date=date.today())

    def perform_update(self, serializer):
        serializer.save(updated_date=date.today())

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']: # also retrieve
            self.permission_classes = [IsAuthenticated, IsOwner]
        elif self.action in ['create']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()