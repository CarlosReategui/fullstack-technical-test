from .views import AdoptanteViewSet, VoluntarioViewSet, AnimalViewSet, AdopcionViewSet, MyTokenObtainPairView, MyAdoptionsViewSet, NotAdoptedAnimalsViewSet, MakeAdoptionViewSet

from rest_framework.routers import DefaultRouter
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView
)

router = DefaultRouter()
router.register(r'adoptantes', AdoptanteViewSet)
router.register(r'voluntarios', VoluntarioViewSet)
router.register(r'animales', AnimalViewSet)
router.register(r'adopciones', AdopcionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('misAdopciones/',
         MyAdoptionsViewSet.as_view(), name='mis_adopciones'),
    path('animalesNoAdoptados/', NotAdoptedAnimalsViewSet.as_view(),
         name='animales_no_adoptados'),
    path('adoptanteCrearAdopcion/', MakeAdoptionViewSet.as_view(),
         name='adoptante_crear_adopcion')
]
