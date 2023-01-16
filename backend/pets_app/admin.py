from django.contrib import admin
from .models import User, Adoptante, Voluntario, Animal, Adopcion

# Register your models here.
admin.site.register(User)
admin.site.register(Adoptante)
admin.site.register(Voluntario)
admin.site.register(Animal)
admin.site.register(Adopcion)
