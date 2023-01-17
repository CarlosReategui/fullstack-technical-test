from .views import AdoptanteViewSet, VoluntarioViewSet, AnimalViewSet, AdopcionViewSet

from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'adoptantes', AdoptanteViewSet)
router.register(r'voluntarios', VoluntarioViewSet)
router.register(r'animales', AnimalViewSet)
router.register(r'adopciones', AdopcionViewSet)

urlpatterns = [
    path('', include(router.urls))
]
