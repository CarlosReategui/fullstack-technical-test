from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


"""
MODELOS DE USUARIOS
"""


class UserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, role, password=None, *args, **kwargs):
        if not email:
            raise ValueError("El usuario debe tener un email.")
        if not first_name:
            raise ValueError("El usuario debe tener un nombre.")
        if not last_name:
            raise ValueError("El usuario debe tener un apellido.")
        if not role:
            raise ValueError("El usuario debe tener un rol.")

        user = self.model(email=self.normalize_email(email))
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.role = role
        user.set_password(password)
        user.is_admin = False
        user.is_staff = False
        user.is_active = True
        user.is_superuser = False
        user.save(using=self._db)
        return user

    def create_superuser(self, email, first_name, last_name, role, password=None, *args, **kwargs):
        if not email:
            raise ValueError("El usuario debe tener un email.")
        if not first_name:
            raise ValueError("El usuario debe tener un nombre.")
        if not last_name:
            raise ValueError("El usuario debe tener un apellido.")
        if not role:
            raise ValueError("El usuario debe tener un rol.")

        user = self.model(email=self.normalize_email(email))
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.role = role
        user.set_password(password)
        user.is_admin = True
        user.is_staff = True
        user.is_active = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'ADMIN', 'Admin'
        ADOPTANTE = 'ADOPTANTE', 'Adoptante'
        VOLUNTARIO = 'VOLUNTARIO', 'Voluntario'

    base_role = Role.ADMIN

    role = models.CharField(max_length=15, choices=Role.choices, null=False)
    email = models.CharField(max_length=255, unique=True, null=False)
    first_name = models.CharField(max_length=255, null=False)
    last_name = models.CharField(max_length=255, null=False)
    is_active = models.BooleanField(default=True, null=False)
    username = models.CharField(max_length=255, null=True, blank=True)

    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']
    USERNAME_FIELD = 'email'

    user = UserManager()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
            return super().save(*args, **kwargs)


class AdoptanteManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.ADOPTANTE)


class Adoptante(User):
    class Meta:
        proxy = True

    base_role = User.Role.ADOPTANTE

    adoptante = AdoptanteManager()


class VoluntarioManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.VOLUNTARIO)


class Voluntario(User):
    class Meta:
        proxy = True

    base_role = User.Role.VOLUNTARIO

    adoptante = VoluntarioManager()


"""
MODELO ANIMAL
"""


class Animal(models.Model):
    class Meta:
        verbose_name_plural = "Animales"

    nombre = models.CharField(max_length=255, null=False)
    edad = models.IntegerField(null=False)
    raza = models.CharField(max_length=63, null=False)

    class Tipo(models.TextChoices):
        PERRO = 'PERRO', 'Perro'
        GATO = 'GATO', 'Gato'

    tipo = models.CharField(max_length=15, choices=Tipo.choices, null=False)

    class Estado(models.TextChoices):
        ADOPTADO = 'ADOPTADO', 'Adoptado'
        EN_ADOPCION = 'EN_ADOPCION', 'En adopción'
        EN_ESPERA_DE_ADOPCION = 'EN_ESPERA_DE_ADOPCION', 'En espera de adopción'

    estado = models.CharField(
        max_length=31, choices=Estado.choices, null=False)

    def __str__(self):
        return self.nombre


"""
MODELO ADOPCION
"""


class Adopcion(models.Model):
    class Meta:
        verbose_name_plural = "Adopciones"

    adoptante = models.ForeignKey(
        Adoptante, on_delete=models.CASCADE, related_name="Adoptante", null=False)
    animal = models.ForeignKey(
        Animal, on_delete=models.CASCADE, related_name="Animal", null=False)
    voluntario = models.ForeignKey(
        Voluntario, on_delete=models.CASCADE, related_name="Voluntario", null=False)
    finalizado = models.BooleanField(default=False)
    fecha = models.DateField(null=False)

    def __str__(self):
        return f'{self.adoptante.email} - {self.voluntario.email} - {self.animal.nombre}'
