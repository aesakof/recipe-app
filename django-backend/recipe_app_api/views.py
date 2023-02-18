from rest_framework import generics, viewsets, filters
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwner
from recipe_app.models import Recipe
from .serializers import RecipeSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Min, Max, Avg, Count, F
from rest_framework.response import Response
# from .filters import RecipeFilter


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    lookup_field = "id"
    filter_backends = [DjangoFilterBackend]
    # filterset_class = RecipeFilter 
    # filterset_fields = ('user__user_name','date')

    queryset = Recipe.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy', 'retrieve']:
            self.permission_classes = [IsAuthenticated, IsOwner]
        elif self.action in ['create']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()