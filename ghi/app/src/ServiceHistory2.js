import React from 'react'



class ServiceHistory2Page extends React.Component {
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
    console.log('part 1')
    event.preventDefault()

    console.log(this.state.vin)
    let serviceUrl = `http://localhost:8080/api/services/history/${this.state.vin}`
    try {
        const response = await fetch(serviceUrl)
        if (response.ok) {
            const data = await response.json()
            let matches = data.services.filter(service => service.vin === this.state.vin)
            this.setState({services: matches})
        }
    }
    catch (e) {
        console.log('caught error')
        window.alert(`${this.state.vin} has no service history`)
        console.log('caught error')
        console.error(e)
    }
  }

//   async componentDidMount() {
//     const url = 'http://localhost:8080/api/services/'
//     try {
//       const response = await fetch(url)
//       if (response.ok) {
//         const data = await response.json()
//         console.log(data)
//         let vins = data['services'].map(car => car['vin'])
//         let uniqueVins = [...new Set(vins)]
//         this.setState({vins: uniqueVins})
//       }
//     } catch (e) {
//       console.error(e)
//     }
//   }

  render() {
    return (
      <div className="my-5 container">
      <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Service History</h1>
          <form onSubmit={this.handleSubmit} id="search-vin-history-form">
            <div className="mb-3">
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleVinChange} placeholder="Vin" name="vin" required type="text" id="vin" className="form-control"/>
                <label htmlFor="vin">VIN</label>
              </div>
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

export default ServiceHistory2Page