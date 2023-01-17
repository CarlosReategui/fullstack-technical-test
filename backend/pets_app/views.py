from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Adoptante, Voluntario, Animal, Adopcion
from .serializers import AdoptanteSerializer, VoluntarioSerializer, AnimalSerializer, AdopcionSerializer


def custom_update(self, request, pk=None):
    instance = self.get_object()
    serializer = self.get_serializer(
        instance, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    self.perform_update(serializer)
    return Response(serializer.data)


class AdoptanteViewSet(viewsets.ModelViewSet):
    queryset = Adoptante.objects.filter(role='ADOPTANTE')
    serializer_class = AdoptanteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class VoluntarioViewSet(viewsets.ModelViewSet):
    queryset = Voluntario.objects.filter(role='VOLUNTARIO')
    serializer_class = VoluntarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class AdopcionViewSet(viewsets.ModelViewSet):
    queryset = Adopcion.objects.all()
    serializer_class = AdopcionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)
