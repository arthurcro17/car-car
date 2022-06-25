# CarCar

Team:

* Arthur - Services
* Emily - Sales

## Design:

## Service microservice

There are two models which are needed for the Service microservice: Technician and Service. For each model, I created views which would either list out the instances for the models ('GET') or create a new instance for the models ('POST'). For the Service model, I also created another view which would edit a specific instance, changing the status between Pending, Canceled, or Finished ('PUT'). 

For the Technician Model, I have two fields: 'name' & 'employee_number'. I allowed any name of less than 100 characters to be inputed, but limited the employee number to a unique positive integer, so no two employees have the same ID, and so there is no issue with negative ID values.

For the Service Model, I have 7 models: 'vin', 'owner', 'date', 'technician', 'reason', 'status', and 'vip'. The 'vin' field is limited to 17 characters, so as to match the actual length for VINs. The 'owner' field must be less than 100 characters. For the 'date', the input must be an actual date-time combination, and the default value is set to the current date/time. For the 'technician' field, we have a many-to-one relationship with our Technician Model (many services can be done by a single technician, but only one technicain per service), and if a technician is deleted, I decided that the service should not be deleted, because the history of all services needs to be kept in case the company gets audited or something (this may have issues where if you delete a technician from the database, and then make a new technician with the same employee number, it will look like this new employee did all of the old employees services. I would rather have this issue, which could propably be fixed, than delete historical services). The 'reason' field only has a limit of 200 characters. The status field has a default of 'Pending', with the ability to change to either 'Finished' or 'Canceled'. The 'vip' field is a booling, which refers to wether or not the car being serviced was in the company's inventory, which brings us to how this microservice is linked to the inventory.

As mentioned prior, the Services Microservice is linked to the Inventory through the Service model, which has a field 'vip' which states wether the car being services is in the companys inventory database. To get the inventory data into the Services Microservice, there is a third Model created (AutoVO) which has one field, 'vin'. Instances of AutoVO are created by a poller which is looping through the automobiles API and pulling the 'vin' number from each autombole in the inventory. Now that the Service Microservices has all of the vins from the inventory, every time a service is created, if the inputed 'vin' matches the 'vin from any instance of AutoVO, the 'vip' status for that service is changed to true (one issue with this system is that if a service is created for a vin, and then later that car is added to the inventory, the service vip status will not retroactively be changed to true).

In Order to fully utlize this microservice, there must be some initial set up. First, you must create an instasnce of the Manufacturer model. Then, you must create a instance of the Model model (Model instance requires a Manufacturer instance). Then, you can create an instance of the Automobile model (Autmobile model requires a Model instance). Now you have an autombile in the inventory. The next step would be to create an instance of the Technician model. Now that you have an instance of the Autmobile Model and the Technicai model, you have the ability to create an instance of the Service model and utlize all of the Service microservice. 

## Sales microservice

I built 3 models that are unique to the Sales Microservice: Customer, SalesPerson, and SaleRecord. There are create, list, detail, update, and delete (CRUD) views in sales/api/sales_rest/views.py for each of these models. The model parameters are as follows: Customer (name, address, phone_number), SalesPerson (name, employee_number), and SaleRecord (sales_price, automobile, customer, sale_person). In this context, Customer, SalesPerson, and AutomobileVO are both Aggregate Roots of SaleRecord.

To connect Sales Microservice to Inventory Microservice, I built a AutomobileVO model (a value object), which has a vin parameter, matching the Automobile model in inventory/api/inventory_rest.models.py. To ensure that information from Inventory api model Automobile flows to Sales Microservice, I built a function get_autos in sales/poll/poller.py that pulls all Automobile instances from Inventory API and saves these instances as AutomobileVO objects in the Sales Microservice. 

Customer, SalesPerson, and AutomobileVO are all independent entities - they do not depend on each other to exist. However, SaleRecord is an Aggregate of these 3 and is dependent on them in order to create an instance. Therefore in order to create a SaleRecord, at least one instance of each Customer, SalesPerson, and AutomobileVO must be saved in the database.
