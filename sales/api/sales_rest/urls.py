from django.contrib import admin
from django.urls import path, include
from .views import api_sales_people, api_sales_person, api_customer, api_customers

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('salespeople/', api_sales_people, name="api_sales_people"),
    path('salespeople/<int:pk>/', api_sales_person, name="api_sales_person"),
    path('customer/', api_customers, name="api_customers"),
    path('customer/<int:pk>/', api_customer, name="api_customer"),
]