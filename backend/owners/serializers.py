from rest_framework import serializers
from .models import Owner
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class OwnerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Owner
        fields = ("username", "password", "gym_name", "phone")

    def create(self, validated_data):
        password = validated_data.pop("password")
        owner = Owner(**validated_data)
        owner.set_password(password)  # 🔐 hash password
        owner.save()
        return owner


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class OwnerLoginSerializer(TokenObtainPairSerializer):
    username_field = "username"  # ✅ REQUIRED

    def validate(self, attrs):
        # This ensures correct auth handling for custom user
        data = super().validate(attrs)

        data["gym_name"] = self.user.gym_name
        data["username"] = self.user.username

        return data

