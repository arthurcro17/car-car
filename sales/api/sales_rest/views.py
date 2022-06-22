
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from .encoders import SalesPersonEncoder, CustomerEncoder, SaleRecordEncoder
from .models import AutomobileVO, SalesPerson, Customer, SaleRecord


# Create your views here.
@require_http_methods(["GET", "POST"])
def api_sales_people(request):
    if request.method == "GET":
        sales_person = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sales person"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sales_person(request, pk):
    if request.method == "GET":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Sales person does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sales_person = SalesPerson.objects.get(id=pk)
            sales_person.delete()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            return JsonResponse({"message": "Sales person does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.get(id=pk)

            props = ["name"]
            for prop in props:
                if prop in content:
                    setattr(sales_person, prop, content[prop])
            sales_person.save()
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
        except SalesPerson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the customer"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_customer(request, pk):
    if request.method == "GET":
        try:
            customer = Customer.objects.get(id=pk)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Customer does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=pk)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Customer does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            content = json.loads(request.body)
            customer = Customer.objects.get(id=pk)
            Customer.objects.filter(id=pk).update(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response


@require_http_methods(["GET", "POST"])
def api_sale_records(request):
    if request.method == "GET":
        sale_records = SaleRecord.objects.all()
        return JsonResponse(
            {"sale_records": sale_records},
            encoder=SaleRecordEncoder
        )
    else:
        try:
            content = json.loads(request.body)

            # employee info
            employee = content["sale_person"]
            sale_person = SalesPerson.objects.get(employee_number=employee)
            content["sale_person"] = sale_person

            # customer info
            customer_id = content["customer"]
            customer = Customer.objects.get(pk=customer_id)
            content["customer"] = customer

            # auto info
            autovin = content["automobile"]
            print("autovin: ", autovin)
            automobile = AutomobileVO.objects.get(id=autovin)
            print("automobile: ", automobile)
            content["automobile"] = automobile
            print(content["automobile"])
            sale_records = SaleRecord.objects.create(**content)
            print(sale_records)
            return JsonResponse(
                sale_records,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the sale record"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE", "GET", "PUT"])
def api_sale_record(request, pk):
    if request.method == "GET":
        try:
            sale_record = SaleRecord.objects.get(id=pk)
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False
            )
        except SaleRecord.DoesNotExist:
            response = JsonResponse({"message": "Sale record does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale_record = SaleRecord.objects.get(id=pk)
            sale_record.delete()
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except SaleRecord.DoesNotExist:
            return JsonResponse({"message": "Sale record does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            content = json.loads(request.body)
            print("this is the content: ", content)
            print("this is the pk: ", pk)
            sale_record = SaleRecord.objects.get(id=pk)
            print("ONE RECORD: ", sale_record)
            print("SALE RECORD: ", sale_record.id, sale_record.customer)
            SaleRecord.objects.filter(id=pk).update(**content)
            return JsonResponse(
                sale_record,
                encoder=SaleRecordEncoder,
                safe=False,
            )
        except SaleRecord.DoesNotExist:
            response = JsonResponse({"message": "Sale record does not exist"})
            response.status_code = 404
            return response