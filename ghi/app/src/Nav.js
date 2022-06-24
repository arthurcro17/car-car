import { NavLink, Link } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <DropdownButton variant="success" id="dropdown-basic-button" title="Inventory">
                {/* <Dropdown.Item as={Link} to="/inventory/">View all inventory</Dropdown.Item> */}
                <Dropdown.Item as={Link} to="/inventory/manufacturers">View all manufacturers</Dropdown.Item>
                <Dropdown.Item as={Link} to="/inventory/manufacturers/new">Add a new manufacturer</Dropdown.Item>
                <Dropdown.Item as={Link} to="/inventory/models">View all models</Dropdown.Item>
                <Dropdown.Item as={Link} to="/inventory/models/new">Add a new model</Dropdown.Item>
                <Dropdown.Item as={Link} to="/inventory/automobiles">View all automobiles</Dropdown.Item>
                <Dropdown.Item as={Link} to="/inventory/automobiles/new">Add a new automobile</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="success" id="dropdown-basic-button" title="Sales">
                <Dropdown.Item as={Link} to="/sales/customer">Add a potential customer</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sales/salesperson">Add a sales person</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sales/salerecord">Create a new sale record</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sales/">View all sales</Dropdown.Item>
                <Dropdown.Item as={Link} to="/sales/bysalesperson">Sales by sales person</Dropdown.Item>
            </DropdownButton>
            <DropdownButton variant="success" id="dropdown-basic-button" title="Services">
              <Dropdown.Item as={Link} to="/services">View all services</Dropdown.Item>
                <Dropdown.Item as={Link} to="/services/new">Add a new service</Dropdown.Item>
                <Dropdown.Item as={Link} to="/services/history">Vehicle history</Dropdown.Item>
                <Dropdown.Item as={Link} to="/services/technicians/new">Add a new technician</Dropdown.Item>
            </DropdownButton>
            {/* <li className="nav-item">
                <NavLink className="nav-link" to="/sales/customer">Add a potential customer</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/salesperson">Add a sales person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/salerecord">Create new sale record</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/">View all sales</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sales/bysalesperson">Sales by sales person</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">Services</NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/inventory">Inventory</NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
