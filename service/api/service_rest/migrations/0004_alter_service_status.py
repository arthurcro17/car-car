# Generated by Django 4.0.3 on 2022-06-21 01:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_alter_service_vin'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Finished', 'Finished'), ('Cancelled', 'Cancelled')], default='Pending', max_length=9),
        ),
    ]
