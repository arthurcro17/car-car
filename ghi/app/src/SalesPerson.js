import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            employeeNumber: '',
            success: 'd-none',
            form: '',
            error: 'd-none',
            message: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event){
        event.preventDefault();
        const data = {...this.state}
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;
        delete data.form;
        delete data.error;
        delete data.message;
        delete data.success;
        const salesUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            const success = {
                success: '',
                form: 'd-none',
                error: 'd-none',
                message: `${this.state.name} has been added successfully.`,
            }
            this.setState(success);

            const cleared = {
                name: '',
                employeeNumber: '',
            }
            this.setState(cleared);
        }
        else {
            const errorMessage = {
                error: '',
                message: 'Sorry, that employee number is already taken. Please try again with a different number.'
            }

            this.setState(errorMessage);
        }
    }

    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value})
    }

    handleEmployeeNumberChange(event){
        const value = event.target.value;
        this.setState({employeeNumber: value})
    }

    render() {
        return(
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.success}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.error}>
                        <div className="alert alert-danger mt-4" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.form}>
                        <div className="shadow p-4 mt-4">
                            <h1>Create a new Sales Person</h1>
                            <form onSubmit={this.handleSubmitChange} id="create-location-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Full Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number">Employee Number</label>
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

export default SalesPersonForm;