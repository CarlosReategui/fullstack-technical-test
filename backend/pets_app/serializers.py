from .models import Adoptante, Voluntario, Animal, Adopcion

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class AdoptanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adoptante
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active']
        read_only_fields = ['id']


class VoluntarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voluntario
        fields = ['id', 'email', 'first_name', 'last_name', 'is_active']
        read_only_fields = ['id']


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = '__all__'
        read_only_fields = ['id']


class AdopcionSerializer(serializers.ModelSerializer):
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
