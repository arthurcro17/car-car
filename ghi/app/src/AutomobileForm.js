import React from "react";
import { Link } from 'react-router-dom'


class AutomobileForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            vin: '',
            color: '',
            year: '',
            models: [],
            model_id: '',
            message: '',
            error: 'd-none',
            success: 'd-none',
            form: 'shadow p-4 mt-4'

        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.reset = this.reset.bind(this)
    }

    reset(event) {
        event.preventDefault()
        const cleared = {
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
        delete data.models
        delete data.message
        delete data.error
        delete data.success
        delete data.form
        const modelsUrl = 'http://localhost:8100/api/automobiles/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(modelsUrl, fetchConfig);
        if (response.ok) {

            const newServices = await response.json();

            const cleared = {
                vin: '',
                color: '',
                year: '',
                model_id: '',
                error: 'd-none',
                form: 'd-none',
                success: '',
                message: `New Automobile created: ${this.state.vin}`
            }
            this.setState(cleared)
        }
        else {
            const errorMessage = {
                vin: '',
                error: '',
                message: `${this.state.vin} is already in the database`
            }
            this.setState(errorMessage)
        }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handleYearChange(event) {
        const value = event.target.value;
        this.setState({year: Number(value)});
    }

    handleModelChange(event) {
        const value = event.target.value;
        this.setState({model_id: Number(value)});
    }

    async componentDidMount () {
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({models: data.models});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className={this.state.success}>
                        <div className="alert alert-success mt-4" role="alert">
                            {this.state.message} <br />
                            <button onClick={this.reset} className="btn btn-success">Create another automobile</button>
                        </div>
                    </div>
                    <div className={this.state.error}>
                        <div className="alert alert-danger mt-4" role="alert">
                            {this.state.message}
                        </div>
                    </div>
                    <div className={this.state.form}>
                        <h1>Create a new Automobile</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVinChange} value={this.state.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control"/>
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleYearChange} value={this.state.year} placeholder="Year" required type="number" name="year" id="year" className="form-control"/>
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={this.handleModelChange} value={this.state.model_id} required name="model" id="model" className="form-select">
                                <option value="Model">Model</option>
                                {this.state.models.map(model => {
                                    return (
                                    <option key={model.id} value={model.id}>
                                        {model.name}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-success">Create</button>
                        </form>
                    </div>
                    <div className='text-center'>
                        <Link to="/inventory/automobiles/" className="btn btn-success btn-md px-3 gap-3">Back to automobiles</Link>
                    </div>
                    
                </div>
                
            </div>
        )
    } 
}

export default AutomobileForm;