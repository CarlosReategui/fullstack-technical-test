# Generated by Django 4.1.5 on 2023-01-17 15:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pets_app', '0002_adopcion'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='adopcion',
            options={'verbose_name_plural': 'Adopciones'},
        ),
        migrations.AlterModelOptions(
            name='animal',
            options={'verbose_name_plural': 'Animales'},
        ),
    ]
