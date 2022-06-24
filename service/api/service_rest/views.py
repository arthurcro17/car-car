from django.db import IntegrityError
from common.json import ModelEncoder
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import AutoVO, Service, Technician
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

class ServiceEncoder(ModelEncoder):
    model= Service
    properties = [
        'id',
        'vin',
        'owner',
        'date',
        'technician',
        'reason',
        'status',
        'vip',
    ]
    encoders = {
        'technician': TechnicianEncoder()
    }

@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == 'GET':
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder = TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            technician = Technician.objects.create(**content)
            print('trying')
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe = False
        )
        except IntegrityError:
            print('except')
            response = JsonResponse({'message': 'Number already in use'})
            response.status_code = 400
            return response
        


@require_http_methods(['GET', 'POST'])
def api_list_services(request, vin=None):
    if request.method == 'GET':
        if vin is not None:
            try:
                services = Service.objects.filter(vin=vin)
            except Service.DoesNotExist:
                return JsonResponse(
                    {'message': 'Invalid VIN'}
                )
        else:
            services = Service.objects.filter(status='Pending')
        return JsonResponse(
            {'services': services},
            encoder=ServiceEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content['technician']
            technician = Technician.objects.get(employee_number=technician_id)
            content['technician'] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid technician ID'},
                status=400
            )
        if AutoVO.objects.filter(vin=content['vin']):
            content['vip'] = True
        service = Service.objects.create(**content)
        return JsonResponse(
            service,
            encoder=ServiceEncoder,
            safe=False
        )


@require_http_methods(["GET", "PUT"])
def api_update_service(request, pk):
    if request.method == 'GET':
        service = Service.objects.get(id=pk)
        return JsonResponse(
            service,
            encoder = ServiceEncoder,
            safe=False
        )

    else:
        content = json.loads(request.body)
        try:
            service = Service.objects.get(id=pk)
        except Service.DoesNotExist:
            return JsonResponse({"Message": "Invalid service ID"})
        if 'status' in content:
            Service.objects.filter(id=pk).update(status=content['status'])
            updated_service = Service.objects.filter(id=pk)
            return JsonResponse(
                updated_service,
                encoder = ServiceEncoder,
                safe = False
                )
