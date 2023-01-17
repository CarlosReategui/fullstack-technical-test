from .models import Adoptante, Voluntario, Animal, Adopcion
from rest_framework import serializers


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
