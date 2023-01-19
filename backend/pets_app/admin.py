from django.contrib import admin
from .models import User, Adoptante, Voluntario, Animal, Adopcion
from django import forms
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(
        label='Password confirmation', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ('email',)

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm

    list_display = ('id', 'email', 'first_name', 'last_name',
                    'role', 'is_active', 'is_staff')
    list_filter = ('role', 'is_active', 'is_staff')

    ordering = ('email',)

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'role', 'password1', 'password2')}
         ),)

    filter_horizontal = ()

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    exclude = ('groups', 'user_permissions')


class AnimalAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'edad', 'estado')

# Register your models here.


admin.site.register(User, UserAdmin)
admin.site.register(Adoptante, UserAdmin)
admin.site.register(Voluntario, UserAdmin)
admin.site.register(Animal, AnimalAdmin)
admin.site.register(Adopcion)
