from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .serializers import CustomUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny, IsAdminUser
from .models import AppUser


@api_view()
def CheckAuthUser(request):
    if request.user.is_authenticated:
        return Response({
            "message": "Authenticated",
            "username": request.user.user_name
        })
    else:
        return Response({
            "message": "Not authenticated",
        })


@api_view(['POST'])
# @permission_classes([AllowAny])
def CheckEmailExists(request):
    email = request.data.get('email')
    if AppUser.objects.filter(email=email):
        return Response({
            "isAvailable": False
        })
    else:
        return Response({
            "isAvailable": True
        })


@api_view(['POST'])
def CheckUsernameExists(request):
    user_name = request.data.get('user_name')
    if AppUser.objects.filter(user_name=user_name):
        return Response({
            "isAvailable": False
        })
    else:
        return Response({
            "isAvailable": True
        })


class AppUserViewset(viewsets.ModelViewSet):
    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']: # also retrieve
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)