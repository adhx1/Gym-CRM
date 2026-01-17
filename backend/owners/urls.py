from django.urls import path
from .views import RegisterOwnerView, LoginOwnerView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterOwnerView.as_view()),
    path("login/", LoginOwnerView.as_view()),
    path("refresh/", TokenRefreshView.as_view()),
]
