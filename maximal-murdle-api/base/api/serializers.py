from rest_framework.serializers import ModelSerializer
from base.models import Leaderboard

from rest_framework import serializers
from django.contrib.auth.models import User


class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(max_length=50, min_length=6)
    username = serializers.CharField(max_length=50, min_length=6)
    password = serializers.CharField(max_length=150, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')

    def validate(self, args):
        email = args.get('email', None)
        username = args.get('username', None)
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {'email': ('email already exists')})
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError(
                {'username': ('username already exists')})

        return super().validate(args)

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LeaderboardSerializer(ModelSerializer):
    user = serializers.CharField()

    class Meta:
        model = Leaderboard
        fields = '__all__'

    def create(self, validated_data):
        author = User.objects.get(username=validated_data["user"])
        validated_data["user"] = author
        """
            Create and return a new `leaderboard` instance, given the validated data.
            """
        return Leaderboard.objects.create(**validated_data)
