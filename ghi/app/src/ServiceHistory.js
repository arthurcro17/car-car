import React from 'react'
import { Link } from 'react-router-dom'


class ServiceHistoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      vin: '',
      vins: [],
      services: [],
    }

    this.handleVinChange = this.handleVinChange.bind(this)
    this.handleServiceChange = this.handleServiceChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleVinChange(event) {
    const value = event.target.value
    this.setState({vin: value})
  }

  handleServiceChange(event) {
    const value = event.target.value
    this.setState({services: value})
  }

  async handleSubmit(event) {
    event.preventDefault()
    const data = {...this.state}
    let serviceUrl = `http://localhost:8080/api/services/${data.vin}`
    try {
        const response = await fetch(serviceUrl)
        if (response.ok) {
            const data = await response.json()
            let matches = data.services.filter(service => service.vin === this.state.vin)
            this.setState({services: matches})
        }
    }
    catch (e) {
        console.error(e)
    }
  }

  async componentDidMount() {
    const url = 'http://localhost:8080/api/services/'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        let vins = data['services'].map(car => car['vin'])
        let uniqueVins = [...new Set(vins)]
        this.setState({vins: uniqueVins})
      }
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <div className="my-5 container">
      <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Service History</h1>
          <form onSubmit={this.handleSubmit} id="search-vin-history-form">
            <div className="mb-3">
              <select value={this.state.vin} onChange={this.handleVinChange} required id="vin" name="vin" className="form-select">
                <option value="">Select a VIN</option>
                {this.state.vins.map(vin => {
                      return (
                          <option value={vin} key={vin}>
                              {vin}
                          </option>
                      )
                  })}
              </select>
            </div>
            <button className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>
    </div>
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>VIN</th>
          <th>Customer Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Technician</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {this.state.services.map(service => {
            return (
              <tr key={service.id}>
                <td>{service.vin}</td>
                <td>{service.owner}</td>
                <td>{service.date}</td>
                <td>{service.date}</td>
                <td>{service.technician.name}</td>
                <td>{service.reason}</td>
                <td>{service.status}</td>
              </tr>  
            )
        })}
      </tbody>
    </table>
    </div>
    );
  }
}

export default ServiceHistoryPage