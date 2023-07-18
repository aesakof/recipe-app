from rest_framework import generics, viewsets, filters, status
from rest_framework.decorators import permission_classes, api_view
from rest_framework.response import Response
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from .permissions import IsOwner
from recipe_app.models import Recipe, Rating
from .serializers import RecipeSerializer, RatingSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Min, Max, Avg, Count, F
from rest_framework.response import Response
from datetime import date
from .filters import RecipeFilter, RatingFilter

class RecipePagination(PageNumberPagination):
    page_size = 12


class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer
    pagination_class = RecipePagination
    lookup_field = "id"
    filter_backends = [DjangoFilterBackend]
    filterset_class = RecipeFilter 
    # filterset_fields = ('user__user_name','date')

    queryset = Recipe.objects.all()

    def get_queryset(self):
        return Recipe.objects.annotate(avg_rating=Avg('ratings__rating')).annotate(num_ratings=Count('ratings'))

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
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


class RatingViewSet(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    lookup_fields = ('id', 'recipe')
    filter_backends = [DjangoFilterBackend]
    filterset_class = RatingFilter 
    # filterset_fields = ('user__user_name','date')

    queryset = Rating.objects.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
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
    
    
@api_view(['GET'])
def UserRating(request):
    recipe_id = request.query_params.get('recipe_id')

    try:
        rating = Rating.objects.filter(recipe=recipe_id, user=request.user).latest('updated_date')
        serializer = RatingSerializer(rating)

        return Response(serializer.data, status=status.HTTP_200_OK)
    except Rating.DoesNotExist:
        return Response({})
    

