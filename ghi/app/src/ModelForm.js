import React from "react";
import { Link } from 'react-router-dom'


class ModelForm extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            name: '',
            picture_url: '',
            manufacturers: [],
            manufacturer_id: '',

        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.manufacturers
        console.log(data)
        const modelsUrl = 'http://localhost:8100/api/models/'
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
            if (newServices['message'] === "Could not create the manufacturer") {
                window.alert(`${this.state.name} is already in the inventory`)
                this.setState({name: ''})
            }
            else {
                const cleared = {
                    name: '',
                    picture_url: '',
                    manufacturer_id: '',
                }
                this.setState(cleared);
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({picture_url: value});
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        console.log(value)
        this.setState({manufacturer_id: Number(value)});
    }

    async componentDidMount () {
        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handlePictureUrlChange} value={this.state.picture_url} placeholder="Picture Url" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select onChange={this.handleManufacturerChange} value={this.state.manufacturer_id} required name="manufacturer" id="manufacturer" className="form-select">
                                <option value="manufacturer">Manufacturer</option>
                                {this.state.manufacturers.map(manufacturer => {
                                    return (
                                    <option key={manufacturer.id} value={manufacturer.id}>
                                        {manufacturer.name}
                                    </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                    <div className='text-center'>
                        <Link to="/inventory/models/" className="btn btn-primary btn-md px-3 gap-3">Back to models</Link>
                    </div>
                    
                </div>
                
            </div>
        )
    } 
}

export default ModelForm;