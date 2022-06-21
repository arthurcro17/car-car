from django.urls import path
from .views import api_list_services, api_list_technicians, api_update_service

urlpatterns = [
    path("services/", api_list_services, name= 'api_list_services'),
    path("services/history/<str:vin>", api_list_services, name= 'api_list_service_history'),
    path('services/<int:pk>', api_update_service, name= 'api_update_service'),
    path("services/technicians/", api_list_technicians, name= 'api_list_technicians')
]
