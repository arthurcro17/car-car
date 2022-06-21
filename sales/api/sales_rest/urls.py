from django.contrib import admin
from django.urls import path, include
from .views import api_sales_people, api_sales_person

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('salespeople/', api_sales_people, name="api_sales_people"),
    path('salespeople/<int:pk>/', api_sales_person, name="api_sales_person"),
]