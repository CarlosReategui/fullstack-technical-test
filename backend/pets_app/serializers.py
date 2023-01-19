from .models import Adoptante, Voluntario, Animal, Adopcion, User
from django.contrib.auth import get_user_model

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active']
        read_only_fields = ['id']


class AdoptanteSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Adoptante
        fields = ['id', 'email', 'first_name',
                  'last_name', 'is_active', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        adoptante = Adoptante.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='ADOPTANTE'
        )
        adoptante.save()
        return adoptante


class VoluntarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Voluntario
        fields = ['id', 'email', 'first_name',
                  'last_name', 'is_active', 'password']
        read_only_fields = ['id']

    def create(self, validated_data):
        voluntario = Voluntario.objects.create_user(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            password=validated_data['password'],
            role='VOLUNTARIO'
        )
        voluntario.save()
        return voluntario


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'
        read_only_fields = ['id']


class AdopcionSerializer(serializers.ModelSerializer):
    adoptante = AdoptanteSerializer()
    animal = AnimalSerializer()
    voluntario = VoluntarioSerializer()

    class Meta:
        model = Adopcion
        fields = '__all__'
        read_only_fields = ['id']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['email'] = user.email
        token['role'] = user.role

        # ...

        return token
