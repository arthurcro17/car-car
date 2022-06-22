# Generated by Django 4.0.3 on 2022-06-21 17:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_service_time_alter_service_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='time',
        ),
        migrations.AlterField(
            model_name='service',
            name='date',
            field=models.DateTimeField(default=datetime.datetime.now),
        ),
    ]
