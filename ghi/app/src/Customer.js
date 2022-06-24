import React from 'react';
import { Link } from 'react-router-dom';

class CustomerForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
            success: 'd-none',
            form: '',
            message: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event){
        event.preventDefault();
        const data = {...this.state}
        data.phone_number = data.phoneNumber;
        delete data.phoneNumber;
        delete data.form;
        delete data.message;
        delete data.success;
        const customerUrl = 'http://localhost:8090/api/customer/';
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

            const success = {
                success: '',
                form: 'd-none',
                message: `${this.state.name} has been added successfully.`,
            }
            this.setState(success);

            const cleared = {
                name: '',
                address: '',
                phoneNumber: '',
            }
            this.setState(cleared);
        }
        else {
            console.log("Submit response failed")
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

    handlePhoneNumberChange(event){
        const value = event.target.value;
        this.setState({phoneNumber: value})
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
                            <div className="form-floating mb-3">
                                <input type="tel" onChange={this.handlePhoneNumberChange} value={this.state.phoneNumber} placeholder="Phone number" required name="phone_number" id="phone_number" className="form-control"/>
                                <label htmlFor="phone_number">Phone number</label>
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

export default CustomerForm;