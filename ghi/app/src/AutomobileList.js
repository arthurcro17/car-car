import React from 'react'
import { Link } from 'react-router-dom'

class AutomobileListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      automobiles: [],
    }
  }


  async componentDidMount() {
    const url = 'http://localhost:8100/api/automobiles/'
    try {
      const response = await fetch(url)
      if (response.ok) {
        
        const data = await response.json()
        console.log(data)
        this.setState({automobiles: data.automobiles})
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
          <h1 className="display-5 fw-bold">Automobiles</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
                Here are all of the automobiles!
            </p>
          </div>
          <Link to="/inventory/automobiles/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new Automobile</Link>
        </div>
        <div className="container">
          <h2>Automobiles</h2>
          <div className="row">
            <table className='table table-striped table-image'>
              <thead>
                <tr>
                  <th>Vin</th>
                  <th>Color</th>
                  <th>Year</th>
                  <th>Model</th>
                  <th>Manufacturer</th>
                  <th>Model Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.automobiles.map(automobile => {
                    return (
                      <tr key={automobile.vin}>
                        <td>{automobile.vin}</td>
                        <td>{automobile.color}</td>
                        <td>{automobile.year}</td>
                        <td>{automobile.model.name}</td>
                        <td>{automobile.model.manufacturer.name}</td>
                        <td>
                            <div> 
                                <img style={{height:100}} src={automobile.model.picture_url}/>
                            </div>
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

export default AutomobileListPage