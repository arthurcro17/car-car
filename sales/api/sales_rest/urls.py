from django.contrib import admin
from django.urls import path, include
from .views import (
    api_sales_people, 
    api_sales_person, 
    api_customer, 
    api_customers,
    api_sale_record,
    api_sale_records,
    )

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('salespeople/', api_sales_people, name="api_sales_people"),
    path('salespeople/<int:pk>/', api_sales_person, name="api_sales_person"),
    path('customer/', api_customers, name="api_customers"),
    path('customer/<int:pk>/', api_customer, name="api_customer"),
    path('salerecord/', api_sale_records, name="api_sale_records"),
    path('salerecord/<int:pk>/', api_sale_record, name="api_sale_record"),
]