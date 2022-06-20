import React from 'react'
import { Link } from 'react-router-dom'


class ServiceListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      serviceColumns: [[], [], []],
    }
  }

  async onChange(event, id, change) {
    if(window.confirm(`Are you sure you want to change this appointment statsus to ${change}?`)){
      const serviceUrl = `http://localhost:8080/api/services/${id}`
      const fetchConfig = {
        method: "PUT",
        body: {'status': change}
    }
    const response = await fetch(serviceUrl, fetchConfig)

    if (response.ok) {
        console.log('ok response')
        const columns = this.state.serviceColumns.map(column => column.filter(function(service) {
            return service.id !== id
        }))
        console.log(columns)
        this.setState({serviceColumns: columns})
        console.log('set the state')
    }
  }}


  async componentDidMount() {
    const url = 'http://localhost:8080/api/services/'
    try {
      const response = await fetch(url)
      if (response.ok) {

        const data = await response.json()

        const requests = [];
        for (let service of data.services) {
          const detailUrl = `http://localhost:8080/api/services/${service.id}/`
          requests.push(fetch(detailUrl))
        }
        const responses = await Promise.all(requests)

        const serviceColumns = [[], [], []];

        let i = 0
        for (const serviceResponse of responses) {
          if (serviceResponse.ok) {
            const details = await serviceResponse.json()
            serviceColumns[i].push(details)
            i = i + 1
            if (i > 2) {
              i = 0
            }
          } else {
            console.error(serviceResponse)
          }
        }

        this.setState({serviceColumns: serviceColumns})
      }
    } catch (e) {
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
              <Link to="/hats/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new service!</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Pending services</h2>
          <div className="row">
            {this.state.serviceColumns.map((list, key) => {
              return (
                <div className="col" key={key}>
                {list.map(service => {
                  return (
                    <div key={service.id} className="card mb-3 shadow">
                      {/* <img src={service.} className="card-img-top" /> */}
                      <div className="card-body">
                        <h5 className="card-text">VIN: {service.vin}</h5>
                        <h5 className="card-text">Owner: {service.owner}</h5>
                        <h5 className="card-text">Reason: {service.reason}</h5>
                        <h5 className="card-text">Date: {service.date}</h5>
                        <h5 className="card-text">Technician: {service.technician.name}</h5>
                        <h5 className="card-text">Status: {service.status}</h5>
                      </div>
                      <div className="card-footer">
                          <h5>Location</h5>
                          <h6>Closet Name: {hat.location.closet_name}</h6>
                          <h6>Section Number: {hat.location.section_number}</h6>
                          <h6>Shelf Number: {hat.location.shelf_number}</h6>
                      </div>
                      <button className="btn btn-primary btn-lg px-4 gap-3" onClick={e => this.onDelete(e,hat.id)}>Remove this hat</button>
                    </div>
                  )
                })}
                </div>
              )
            })}
            
          </div>
        </div>
      </>
    );
  }
}

export default MainPage