import React from "react";

class ServiceForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            owner: '',
            vin: '',
            date: '',
            technicians: [],
            reason: '',
        };
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.model_name = data.modelName;
        data.picture_url = data.pictureUrl;
        delete data.modelName;
        delete data.pictureUrl;
        delete data.bins;
        //delete data.modelName;
        console.log("checking submit data: ", data);
        const shoesUrl = 'http://localhost:8080/api/shoes/'
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log("shoesURL: ", shoesUrl, "fetchConfig: ", fetchConfig)
        const response = await fetch(shoesUrl, fetchConfig);
        if (response.ok) {
            const newShoes = await response.json();
            console.log(newShoes);

            const cleared = {
                owner: '',
                vin: '',
                date: '',
                technician: '',
                reason: '',
            }
            this.setState(cleared);
        }
    }

    handleOwnerChange(event) {
        const value = event.target.value;
        this.setState({owner: value});
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value});
    }

    handleDateChange(event) {
        const value = event.target.value;
        this.setState({date: value});
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value});
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({reason: value});
    }

    async componentDidMount () {
        const url = 'http://localhost:8080/api/services/technicians/';

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({technicians: data.technicians});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service Appointment</h1>
                        <form onSubmit={this.handleSubmit} id="create-service-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleOwnerChange} value={this.state.owner} placeholder="Owner" required type="text" name="owner" id="owner" className="form-control"/>
                            <label htmlFor="name">Owner</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control"/>
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="text" name="date" id="date" className="form-control"/>
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="url" name="reason" id="reason" className="form-control"/>
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                                <option value="">Technician</option>
                                {this.state.technicians.map(bin => {
                                    return (
                                    <option key={technician.id} value={technician.id}>
                                        {technician.name}-{technician.id}
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

export default ServiceForm;