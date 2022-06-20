from django.contrib import admin
from .models import AutoVO, Technician, ServiceAppointment

# Register your models here.
@admin.register(AutoVO)
class AutoVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(ServiceAppointment)
class ServiceAppointment(admin.ModelAdmin):
    pass