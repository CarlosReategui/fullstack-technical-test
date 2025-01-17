# Generated by Django 4.1.5 on 2023-01-17 16:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pets_app', '0003_alter_adopcion_options_alter_animal_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='adopcion',
            name='adoptante',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Adoptante', to='pets_app.adoptante'),
        ),
        migrations.AlterField(
            model_name='adopcion',
            name='animal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Animal', to='pets_app.animal'),
        ),
        migrations.AlterField(
            model_name='adopcion',
            name='voluntario',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Voluntario', to='pets_app.voluntario'),
        ),
    ]
