import React from "react";


class ServiceForm extends React.Component {
    constructor(props){
        super(props);
        let today = new Date()
        let yyyy = today.getFullYear()
        let mm = today.getMonth()+1
        let dd = today.getDate()
        if (dd < 10) {dd = '0' + dd}
        if (mm < 10) {mm = '0' + mm}
        today = yyyy + '-' +  mm + '-' + dd

        this.state = {
            owner: '',
            vin: '',
            date: today,
            time: '',
            technicians: [],
            reason: '',
        };
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        delete data.technicians;
        console.log("checking submit data: ", data);
        console.log(typeof data.date)
        let year = data.date.slice(0,4)
        let month = data.date.slice(5,7)
        let day = data.date.slice(8-10)
        let hour = data.time.slice(0,2)
        let minute = data.time.slice(3)
        let formated_date = new Date(Date.UTC(year, month, day, hour, minute))
        console.log(formated_date)
        data['date'] = formated_date
        delete data.time
        const servicesUrl = 'http://localhost:8080/api/services/'
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
            console.log(newServices);

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

    handleTimeChange(event) {
        const value = event.target.value;
        this.setState({time: value});
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
                        <div className="form-floating mb-3 datepicker">
                            <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="date" name="date" id="date" className="form-control"/>
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="form-floating mb-3 timepicker">
                            <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="time" name="time" id="time" className="form-control"/>
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control"/>
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={this.handleTechnicianChange} value={this.state.technician} required name="technician" id="technician" className="form-select">
                                <option value="">Technician</option>
                                {this.state.technicians.map(technician => {
                                    return (
                                    <option key={technician.employee_number} value={technician.employee_number}>
                                        {technician.name}-{technician.employee_number}
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