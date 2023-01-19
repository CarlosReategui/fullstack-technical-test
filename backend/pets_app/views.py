from .models import Adoptante, Voluntario, Animal, Adopcion
from .serializers import AdoptanteSerializer, MyTokenObtainPairSerializer, VoluntarioSerializer, AnimalSerializer, AdopcionSerializer, UserSerializer

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView


def custom_update(self, request, pk=None):
    instance = self.get_object()
    serializer = self.get_serializer(
        instance, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    self.perform_update(serializer)
    return Response(serializer.data)


class ActionBasedPermission(permissions.AllowAny):
    """
    Grant or deny access to a view, based on a mapping in view.action_permissions
    """

    def has_permission(self, request, view):
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False


class AdoptanteViewSet(viewsets.ModelViewSet):
    queryset = Adoptante.objects.filter(role='ADOPTANTE')
    serializer_class = AdoptanteSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [ActionBasedPermission, ]
    action_permissions = {
        permissions.IsAuthenticated: ['update', 'partial_update', 'list', 'retrieve'],
        permissions.IsAdminUser: ['destroy'],
        permissions.AllowAny: ['create']
    }

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class VoluntarioViewSet(viewsets.ModelViewSet):
    queryset = Voluntario.objects.filter(role='VOLUNTARIO')
    serializer_class = VoluntarioSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [ActionBasedPermission, ]
    action_permissions = {
        permissions.IsAuthenticated: ['update', 'partial_update', 'list', 'retrieve'],
        permissions.IsAdminUser: ['destroy'],
        permissions.AllowAny: ['create']
    }

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class AdopcionViewSet(viewsets.ModelViewSet):
    queryset = Adopcion.objects.all()
    serializer_class = AdopcionSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, pk=None):
        return custom_update(self, request, pk)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class MyAdoptionsViewSet(APIView):
    serializer_class = AdopcionSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        adoptions = Adopcion.objects.filter(adoptante=self.request.user.id)
        serializer = AdopcionSerializer(adoptions, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class NotAdoptedAnimalsViewSet(APIView):
    serializer_class = AnimalSerializer
    authentication_classes = [JWTAuthentication, BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        animals = Animal.objects.filter(estado='EN_ADOPCION')
        serializer = AnimalSerializer(animals, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
