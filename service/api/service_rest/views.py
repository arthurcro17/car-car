from django.db import IntegrityError
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutoVO, ServiceAppointment, Technician
# Create your views here.


class AutoVOEncoder(ModelEncoder):
    model = AutoVO
    properties = ['vin']

class TechnicianEncoder(ModelEncoder):
    model= Technician
    properties = [
        'name',
        'employee_number',
    ]

class ServiceAppoitmentEncoder(ModelEncoder):
    model= ServiceAppointment
    properties = [
        'id',
        'vin',
        'owner',
        'date',
        'technician',
        'reason',
        'status',
    ]
    encoders = {
        'technician': TechnicianEncoder()
    }

@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == 'GET':
        technicians = Technician.objects.all()
        print('HERE ARE THE TECHS', technicians)
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            print('created tech')
        except IntegrityError:
            print('except triggered')
            return JsonResponse({'message': 'Number already in use'})
        return JsonResponse(
            technician,
            encoder=TechnicianEncoder,
            safe = False
        )


@require_http_methods(['GET', 'POST'])
def api_list_service_appointments(request, vin=None):
    if request.method == 'GET':
        if vin is not None:
            service_appointments = ServiceAppointment.objects.filter(vin=vin)
        else:
            service_appointments = ServiceAppointment.objects.all()
        print('HERE ARE THE APPS', service_appointments)
        return JsonResponse(
            {'service_appointments': service_appointments},
            encoder=ServiceAppoitmentEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content['technician']
            technician = Technician.objects.get(id=technician_id)
            content['technician'] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid technician ID'},
                status=400
            )
        service_appointment = ServiceAppointment.objects.create(**content)
        return JsonResponse(
            service_appointment,
            encoder=ServiceAppoitmentEncoder,
            safe=False
        )


@require_http_methods("PUT")
def api_update_service_appointments(request, pk):
    content = json.loads(request.body)

    try:
        service_appointment = ServiceAppointment.objects.get(id=pk)
    except ServiceAppointment.DoesNotExist:
        return JsonResponse({"Message": "Invalid service appointment ID"})

    if 'status' in content:
        ServiceAppointment.objects.filter(id=pk).update(status=content['status'])
        updated_appointment = ServiceAppointment.objects.filter(id=pk)
        return JsonResponse(
            updated_appointment,
            encoder = ServiceAppoitmentEncoder,
            safe = False
            )
