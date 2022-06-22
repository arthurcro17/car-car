import React from "react";
import { Link } from 'react-router-dom'


class ManufacturerForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
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
            if (newServices['message'] === "Could not create the manufacturer") {
                window.alert(`${this.state.name} is already in the inventory`)
                this.setState({name: ''})
            }
            else {
                const cleared = {
                    name: '',
                }
                this.setState(cleared);
            }
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
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Manufacturer</h1>
                        <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                    <div className='text-center'>
                        <Link to="/inventory/manufacturers/" className="btn btn-primary btn-md px-3 gap-3">Back to manufacturers</Link>
                    </div>
                    
                </div>
                
            </div>
        )
    } 
}

export default ManufacturerForm;