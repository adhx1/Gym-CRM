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


class OwnerLoginSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["gym_name"] = user.gym_name
        token["email"] = user.email

        return token
