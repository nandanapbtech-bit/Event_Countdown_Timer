from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event

        fields = [
            "id",
            "title",
            "target_date",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "created_at",
        ]


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "username",
            "password",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )