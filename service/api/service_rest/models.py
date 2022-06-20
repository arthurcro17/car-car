from django.db import models

# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

class AutoVO(models.Model):
    vin = models.PositiveIntegerField()

class ServiceAppointment(models.Model):
    vin = models.PositiveIntegerField()
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    technician = models.ForeignKey(Technician, related_name='appointments', on_delete=models.DO_NOTHING)
    reason = models.CharField(max_length=200)
    status = models.CharField(choices=['Pending', 'Finsihed', 'Canceled'], default='Pending')

