from django.urls import reverse
from django.db import models

# Create your models here.

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveIntegerField(unique=True)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_technician", kwargs={"pk": self.employee_number})

class AutoVO(models.Model):
    vin = models.PositiveIntegerField()

class Service(models.Model):
    vin = models.CharField(max_length=17)
    owner = models.CharField(max_length=100)
    date = models.DateTimeField()
    technician = models.ForeignKey(Technician, related_name='services', on_delete=models.DO_NOTHING)
    reason = models.CharField(max_length=200)
    status = models.CharField(max_length=9, choices=[("Pending", 'Pending'), ('Finished', 'Finished'), ('Cancelled', 'Cancelled')], default='Pending')
    vip = models.BooleanField(default=False)

    # def get_api_url(self):
    #     return reverse("api_service", kwargs={"pk": self.pk})

    def __str__(self):
        return self.owner + ': ' + self.reason + ' (' + str(self.date) + ')'