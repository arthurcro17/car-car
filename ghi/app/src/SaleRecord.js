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
        console.log("check submit data: ", data);
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
            console.log(newSaleRecord);

            const cleared = {
                automobile: '',
                salePrice: '',
                customer: '',
                salesPerson: '',

            }
            this.setState(cleared);
        }
        else {
            console.log("what is happening")
        }
    }

    handleAutomobileChange(event){
        const value = event.target.value;
        this.setState({automobile: value})
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
            console.log("AUTO DATA: ", autoData.automobiles);
            this.setState({automobiles: autoData.automobiles});
        }

        const customerUrl = 'http://localhost:8090/api/customer/';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerData = await customerResponse.json();
            console.log("CUSTOMER DATA: ", customerData.customers);
            this.setState({customers: customerData.customers})
        }

        const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
        const salesPeopleResponse = await fetch(salesPeopleUrl);
        if (salesPeopleResponse.ok) {
            const salesPeopleData = await salesPeopleResponse.json();
            console.log("SALES PEOPLE DATA: ", salesPeopleData.sales_person);
            this.setState({salesPeople: salesPeopleData.sales_person})
        }
    }


    render(){
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Sales Record</h1>
                        <form onSubmit={this.handleSubmitChange} id="create-location-form">
                        <div className="form-floating mb-3">
                            <select onChange={this.handleAutomobileChange} value={this.state.automobile} required name="automobile" id="automobile" className="form-select">
                                <option value="">Car make / model</option>
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
                            <label htmlFor="salePrice">Sale Price</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={this.handleCustomerChange} value={this.state.customer} required name="customer" id="customer" className="form-select">
                                <option value="">Customer</option>
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
                                <option value="">Sales Person</option>
                                {this.state.salesPeople.map(sales_person =>{
                                    return (
                                        <option key={sales_person.employee_number} value={sales_person.employee_number}>
                                            {sales_person.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SaleRecord;