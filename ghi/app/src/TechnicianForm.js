import React from "react";
import { Link } from 'react-router-dom'


class TechnicianForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            employee_number: '',
            message: '',
            error: 'd-none',
            success: 'd-none',
            form: 'shadow p-4 mt-4',

        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset(event) {
        event.preventDefault()
        const cleared = {
            name: '',
            employee_number: '',
            message: '',
            error: 'd-none',
            success: 'd-none',
            form: 'shadow p-4 mt-4',
        }
        this.setState(cleared)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.form
        delete data.error
        delete data.message
        delete data.success
        const servicesUrl = 'http://localhost:8080/api/services/technicians/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(servicesUrl, fetchConfig);
        if (response.ok) {

            const newServices = await response.json();

            
            const successful = {
                name: '',
                employee_number: '',
                success: '',
                form: 'd-none',
                error: 'd-none',
                message: `Technician ${data.name}-${data.employee_number} has been successfully created`
        
            }
            this.setState(successful);
            
        }
        else {
            const errorMessage = {
                employee_number: '',
                error: '',
                message: `${data.employee_number} is already in use. Please use another employee number`,
            }
            this.setState(errorMessage)
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employee_number: value});
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.success}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message}
                            <button onClick={this.reset} className="btn btn-success">Create another technician</button>
                        </div>
                    </div>
                    <div className={this.state.error}>
                        <div className="alert alert-danger mt-4" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.form}>
                        <h1>Create a new Technician</h1>
                        <form onSubmit={this.handleSubmit} id="create-technician-form">
                            <div className="form-floating mb-3">
                                <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={this.handleEmployeeNumberChange} value={this.state.employee_number} placeholder="Employee number" required type="text" name="employee_number" id="employee_number" className="form-control"/>
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    } 
}

export default TechnicianForm;