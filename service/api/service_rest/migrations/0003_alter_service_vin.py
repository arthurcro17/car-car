# Generated by Django 4.0.3 on 2022-06-20 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_service_delete_serviceappointment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='vin',
            field=models.CharField(max_length=17),
        ),
    ]
