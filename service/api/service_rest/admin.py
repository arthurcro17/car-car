from django.contrib import admin
from .models import AutoVO, Technician, Service

# Register your models here.
@admin.register(AutoVO)
class AutoVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    pass