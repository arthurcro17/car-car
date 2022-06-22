import React from 'react'
import { Link } from 'react-router-dom'

class ModelListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      models: [],
    }
  }


  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/'
    try {
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        this.setState({models: data.models})
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
          <h1 className="display-5 fw-bold">Models</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
                Here are all of the models!
            </p>
          </div>
          <Link to="/inventory/models/new" className="btn btn-primary btn-lg px-4 gap-3">Add a new Model</Link>
        </div>
        <div className="container">
          <h2>Models</h2>
          <div className="row">
            <table className='table table-striped table-image'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Manufacturer</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {this.state.models.map(model => {
                    return (
                      <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <td>
                            <div> 
                                <img style={{height:100}} src={model.picture_url}/>
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

export default ModelListPage