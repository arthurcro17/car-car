import React from 'react'
import { Link } from 'react-router-dom'

class ServiceListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      services: [],
    }
  }

  async onChange(event, id, change) {
    if(window.confirm(`Are you sure you want to change this appointment status to ${change}?`)){
      const serviceUrl = `http://localhost:8080/api/services/${id}`
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify({'status': change})
    }
    console.log('before')
    const response = await fetch(serviceUrl, fetchConfig)
    console.log('after')
    if (response.ok) {
        console.log('ok response')
        const new_services = this.state.services.filter(function(service) {
            return service.id !== id
        })

        this.setState({services: new_services})
        console.log('set the state')
    }
  }}

  vipCheck(check) {
    if (check) {
      return (
        <td>VIP</td>
      )
    }
    else {
      return <td></td>
    }
  }


  async componentDidMount() {
    const url = 'http://localhost:8080/api/services/'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({services: data.services})
        console.log(this.state)
      }
    } 
    catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" alt="" width="600" />
          <h1 className="display-5 fw-bold">Service Appointments</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
                Here are all of the pending services!
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link to="/services/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new service</Link>
              <Link to="/services/history" className="btn btn-primary btn-lg px-4 gap-3">Vehicle History</Link>
              <Link to="/services/technicians/new" className="btn btn-primary btn-lg px-4 gap-3">Create a new Technician</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Pending services</h2>
          <div className="row">
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th></th>
                  <th>VIN</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Technician</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>VIP</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.services.map(service => {
                    return (
                      
                
                      <tr key={service.id}>
                        <td>
                          <button className="btn btn-primary btn-lg px-4 gap-3" onClick={e => this.onChange(e,service.id, 'Finished')}>Finish</button>
                        </td>
                        <td>{service.vin}</td>
                        <td>{service.owner}</td>
                        <td>{service.date.slice(0,10)}</td>
                        <td>{service.date.slice(11,16)}</td>
                        <td>{service.technician.name}</td>
                        <td>{service.reason}</td>
                        <td>{service.status}</td>
                        {this.vipCheck(service.vip)}
                        <td>
                          <button className="btn btn-secondary btn-lg px-4 gap-3" onClick={e => this.onChange(e,service.id, 'Cancelled')}>Cancel</button>
                        </td>
                      </tr> 
                      
                    )
                })}
              </tbody>
            </table>            
          </div>
        </div>
      </>
    );
  }
}

export default ServiceListPage