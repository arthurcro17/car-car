import React from 'react';

class CustomerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event){
        event.preventDefault();
        const data = {...this.state}
        console.log("check submit data: ", data)
        const customerUrl = 'http://localhost:8090/api/customer/';
        console.log(customerUrl);
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            const cleared = {
                name: '',
                address: '',
            }
            this.setState(cleared);
        }
        else {
            console.log("what is happening")
        }
    }
    
    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value})
    }

    handleAddressChange(event){
        const value = event.target.value;
        this.setState({address: value})
    }

    render(){
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Customer</h1>
                        <form onSubmit={this.handleSubmitChange} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} placeholder="Full Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleAddressChange} value={this.state.address} placeholder="Address" required type="text" name="address" id="address" className="form-control"/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CustomerForm;