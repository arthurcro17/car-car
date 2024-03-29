from django.db import models
from django.urls import reverse


# Create your models here.
class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    # def __str__(self):
    #     return self.name
    
    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.employee_number})


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin

    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})


class SaleRecord(models.Model):
    sales_price=models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
    )
    sale_person = models.ForeignKey(
        SalesPerson,
        related_name="sale_person",
        on_delete=models.PROTECT,
    )
    def get_api_url(self):
        return reverse("api_customer", kwargs={"pk": self.id})
    


# class State(models.Model):
#     id = models.PositiveIntegerField(primary_key=True)
#     name = models.CharField(max_length=40)
#     abbreviation = models.CharField(max_length=2, unique=True)

#     def __str__(self):
#         return f"{self.abbreviation}"

#     class Meta:
#         ordering = ("abbreviation",)  # Default ordering for State


# class UsAddress(models.Model):
#     address_1 = models.CharField("Address line 1", max_length=200)
#     address_2 = models.CharField("Address line 2", max_length=200)
#     zip_code = models.CharField("ZIP / Postal code", max_length=12)
#     city = models.CharField("City", max_length=100)
#     state = models.ForeignKey(
#         State,
#         related_name="+",  # do not create a related name on State
#         on_delete=models.PROTECT,
#     )
#     def get_api_url(self):
#         return reverse("", kwargs={"pk": self.pk})