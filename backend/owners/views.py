from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import OwnerLoginSerializer
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from .models import Owner
from .serializers import OwnerSerializer

class RegisterOwnerView(CreateAPIView):
    queryset = Owner.objects.all()
    serializer_class = OwnerSerializer
    permission_classes = [AllowAny]

class LoginOwnerView(TokenObtainPairView):
    serializer_class = OwnerLoginSerializer
    permission_classes = [AllowAny]