from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import RegistrationAPIView

urlpatterns = [
    path('', views.getRoutes),
    path('leaderboard/', views.LeaderboardList.as_view()),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('register/', RegistrationAPIView.as_view(), name='register'),
]
