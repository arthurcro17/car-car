import React from 'react'
import { Link } from 'react-router-dom'

function InventoryMainPage() {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">CarCar</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Select what inventory you would like to access
          </p>
          <Link to="/inventory/manufacturers/" className="btn btn-primary btn-lg px-4 gap-3">Manufacturers</Link>
          <Link to="/inventory/models/" className="btn btn-primary btn-lg px-4 gap-3">Models</Link>
          <Link to="/inventory/automobiles/" className="btn btn-primary btn-lg px-4 gap-3">Automobiles</Link>

        </div>
      </div>
    );
  }
  
  export default InventoryMainPage;
  