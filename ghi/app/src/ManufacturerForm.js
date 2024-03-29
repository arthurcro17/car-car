import React from "react";
import { Link } from 'react-router-dom'


class ManufacturerForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            message: '',
            error: 'd-none',
            success: 'd-none',
            form: 'shadow p-4 mt-4',

        };
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset(event) {
        event.preventDefault()
        const cleared = {
            name: '',
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
        delete data.message
        delete data.error
        delete data.success
        delete data.form
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturersUrl, fetchConfig);
        if (response.ok) {

            const newServices = await response.json();

            const successful = {
                name: '',
                success: '',
                form: 'd-none',
                error: 'd-none',
                message: `New Manufacturer created: ${this.state.name}`
            }

            this.setState(successful)  
        }
        else {
            const errorMessage = {
                name: '',
                error: '',
                message: `${this.state.name} is already in the database`
            }
            this.setState(errorMessage)
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.success}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message} <br />
                            <button onClick={this.reset} className="btn btn-success">Create another manufacturer</button>  
                        </div>
                    </div>
                    <div className={this.state.error}>
                        <div className="alert alert-danger mt-4" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.form}>
                        <h1>Create a new Manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-success">Create</button>
                        </form>
                    </div>
                    <div className='text-center'>
                        <Link to="/inventory/manufacturers/" className="btn btn-success btn-md px-3 gap-3">Back to manufacturers</Link>
                    </div>
                    
                </div>
                
            </div>
        )
    } 
}

export default ManufacturerForm;