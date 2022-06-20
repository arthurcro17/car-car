from django.urls import path
from .views import api_list_service_appointments, api_list_technicians, api_update_service_appointments

urlpatterns = [
    path("services/", api_list_service_appointments, name= 'api_list_service_appointments'),
    path('services/<int:pk>/', api_update_service_appointments, name= 'api_update_service_appointments'),
    path("services/technicians/", api_list_technicians, name= 'api_list_technicians')
]
