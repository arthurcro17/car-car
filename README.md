# CarCar

Team:

* Arthur - Services
* Emily - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

I built 3 models that are unique to the Sales Microservice: Customer, SalesPerson, and SaleRecord. There are create, list, detail, update, and delete (CRUD) views in sales/api/sales_rest/views.py for each of these models. The model parameters are as follows: Customer (name, address, phone_number), SalesPerson (name, employee_number), and SaleRecord (sales_price, automobile, customer, sale_person). In this context, Customer, SalesPerson, and AutomobileVO are both Aggregate Roots of SaleRecord.

To connect Sales Microservice to Inventory Microservice, I built a AutomobileVO model (a value object), which has a vin parameter, matching the Automobile model in inventory/api/inventory_rest.models.py. To ensure that information from Inventory api model Automobile flows to Sales Microservice, I built a function get_autos in sales/poll/poller.py that pulls all Automobile instances from Inventory API and saves these instances as AutomobileVO objects in the Sales Microservice. 

Customer, SalesPerson, and AutomobileVO are all independent entities - they do not depend on each other to exist. However, SaleRecord is an Aggregate of these 3 and is dependent on them in order to create an instance. Therefore in order to create a SaleRecord, at least one instance of each Customer, SalesPerson, and AutomobileVO must be saved in the database.
