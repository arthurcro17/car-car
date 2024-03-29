from common.json import ModelEncoder

from .models import SaleRecord, SalesPerson, Customer, AutomobileVO


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO,
    properties = [
        "vin",
        "id"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer,
    properties = [
        "name",
        "address",
        "phone_number",
        "id",
    ]



class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "automobile",
        "sales_price",
        "sale_person",
        "customer",
        "id",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sale_person": SalesPersonEncoder(),
        "customer": CustomerEncoder(),
    }

# class AddressEnconder(ModelEncoder):
#     model = UsAddress,
#     properties = [
#         "address_1",
#         "address_2",
#         "zip_code",
#     ]
