from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from base.models import Leaderboard

from rest_framework import generics
from .serializers import RegistrationSerializer, LeaderboardSerializer
from rest_framework import serializers
from rest_framework import status
import uuid
from base.api.permisssions import IsOwnerOrReadOnly


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/register/',

        '/api/token/',
        '/api/token/refresh/',
        '/api/leaderboard/',
    ]

    return Response(routes)


class LeaderboardList(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    serializer_class = LeaderboardSerializer

    def get_queryset(self):
        queryset = Leaderboard.objects.all()
        return queryset.order_by('-score')[:30]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegistrationAPIView(generics.GenericAPIView):

    serializer_class = RegistrationSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if (serializer.is_valid()):
            serializer.save()
            return Response({
                "RequestId": str(uuid.uuid4()),
                "Message": "User created successfully",

                "User": serializer.data}, status=status.HTTP_201_CREATED
            )

        # return Response({"Errors": serializers.errors}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"Errors": 'Username is minimum 6 characters long. Email must be unique'}, status=status.HTTP_400_BAD_REQUEST)
