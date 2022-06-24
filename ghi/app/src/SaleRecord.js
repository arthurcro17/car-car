import React from 'react';

class SaleRecord extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            automobiles: [],
            automobile: '',
            salePrice: '',
            customers: [],
            customer: '',
            salesPeople: [],
            salesPerson: '',
            success: 'd-none',
            form: '',
            message: '',
            autoName: '',
        }
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPeopleChange = this.handleSalesPeopleChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event){
        event.preventDefault();
        const data = {...this.state}
        data.sales_price = data.salePrice
        data.sale_person = data.salesPerson
        delete data.salePrice;
        delete data.salesPerson;
        delete data.salesPeople;
        delete data.automobiles;
        delete data.customers;
        delete data.form;
        delete data.message;
        delete data.success;
        delete data.autoName;
        //console.log("check submit data: ", data);
        const saleRecordUrl = 'http://localhost:8090/api/salerecord/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleRecordUrl, fetchConfig);
        if (response.ok) {
            const newSaleRecord = await response.json();


            const car = document.getElementById("automobile");
            console.log("checking car: ", car);
            const success = {
                success: '',
                form: 'd-none',
                message: `${this.state.autoName}'s sale record has been created successfully.`,
            }
            this.setState(success);

            const cleared = {
                automobile: '',
                salePrice: '',
                customer: '',
                salesPerson: '',

            }
            this.setState(cleared);
        }
        else {
            console.log("response failed")
        }
    }

    handleAutomobileChange(event){
        const value = event.target.value;
        // use autoIndex to get the values that were passed into the auto dropdown
        var autoIndex = event.target.selectedIndex;
        const autoName = event.target[autoIndex].text;
        this.setState({
            automobile: value,
            autoName: autoName,
        })
    }

    handleSalePriceChange(event){
        const value = event.target.value;
        this.setState({salePrice: value})
    }

    handleCustomerChange(event){
        const value = event.target.value;
        this.setState({customer: value})
    }

    handleSalesPeopleChange(event){
        const value = event.target.value;
        this.setState({salesPerson: value})
    }

    async componentDidMount () {
        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            const autoData = await automobileResponse.json();
            this.setState({automobiles: autoData.automobiles});
        }

        const customerUrl = 'http://localhost:8090/api/customer/';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            this.setState({customers: customerData.customers})
        }

        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        const salesPeopleResponse = await fetch(salesPeopleUrl);
        if (salesPeopleResponse.ok) {
            const salesPeopleData = await salesPeopleResponse.json();
            this.setState({salesPeople: salesPeopleData.sales_person})
        }
    }


    render(){
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.success}>
                        <div className="alert alert-success mt-3" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.form}>
                        <div className="shadow p-4 mt-4">
                            <h1>Record a new sale</h1>
                            <form onSubmit={this.handleSubmitChange} id="create-location-form">
                            <div className="form-floating mb-3">
                                <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose an automobile</option>
                                    {this.state.automobiles.map(automobile =>{
                                        return (
                                            <option key={automobile.id} value={automobile.id}>
                                                {automobile.model.manufacturer.name} / {automobile.model.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleSalePriceChange} value={this.state.salePrice} placeholder="sale price" required type="number" name="salePrice" id="salePrice" className="form-control"/>
                                <label htmlFor="salePrice">Sale price</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a customer</option>
                                    {this.state.customers.map(customer =>{
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleSalesPeopleChange} value={this.state.salesPerson} required name="sales_people" id="sales_people" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {this.state.salesPeople.map(sales_person =>{
                                        return (
                                            <option key={sales_person.employee_number} value={sales_person.employee_number}>
                                                {sales_person.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-success">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleRecord;