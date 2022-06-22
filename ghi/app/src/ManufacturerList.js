import React from 'react'
import { Link } from 'react-router-dom'

class ManufacturerListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      manufacturers: [],
    }
  }


  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({manufacturers: data.manufacturers})
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
          <h1 className="display-5 fw-bold">Manufacturers</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
                Here are all of the manufacturers!
            </p>
          </div>
          <Link to="/inventory/manufacturers/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new Manufacturer</Link>
        </div>
        <div className="container">
          <h2>Manufacturers</h2>
          <div className="row">
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.manufacturers.map(manufacturer => {
                    return (
                      <tr key={manufacturer.id}>
                        <td>{manufacturer.name}</td>
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

export default ManufacturerListPage