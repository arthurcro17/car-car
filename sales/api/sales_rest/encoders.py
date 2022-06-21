from common.json import ModelEncoder

from .models import SaleRecord, SalesPerson, UsAddress, Customer, AutomobileVO


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO,
    properties = [
        "id",
        "color",
        "year",
        "vin",
        "model",
    ]


class AddressEnconder(ModelEncoder):
    model = UsAddress,
    properties = [
        "address_1",
        "address_2",
        "zip_code",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer,
    properties = [
        "name",
        "address",
    ]
    encoders = {
        "address": AddressEnconder(),
    }



class SaleRecordEncoder(ModelEncoder):
    model = SaleRecord
    properties = [
        "automobile",
        "sale_price",
        "sales_person",
        "customer",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerEncoder(),
    }