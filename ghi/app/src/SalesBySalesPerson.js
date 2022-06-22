import React from 'react';
import { Link } from 'react-router-dom';

class ListSalesBySalesPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            names: [],
            sales: [],
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSalesChange = this.handleSalesChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event) {
        event.preventDefault();
    }

    handleNameChange(event){
        const value = event.target.value;
        this.setState({name: value})
    }

    handleSalesChange(event){
        const value = event.target.value;
        this.setState({sales: value})
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salerecord/'
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                console.log("DATA: ", data);
                this.setState({sales: data.sale_records});
                console.log("STATE: ", this.state);
            }
            const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
            const salesPeopleResponse = await fetch(salesPeopleUrl);
            if (salesPeopleResponse.ok) {
                const salesPeopleData = await salesPeopleResponse.json();
                console.log("SALES PEOPLE DATA: ", salesPeopleData.sales_person);
                this.setState({salesPeople: salesPeopleData.sales_person})
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <>
            <br></br>
                <form onSubmit={this.handleSubmitChange} id="select-vin-form">
                    <select onChange={this.handleNameChange} value={this.state.name} required name="name" id="name" className="form-select">
                        <option value="">Choose a sales person</option>
                        {this.state.names.map(name => {
                            return (
                                <option key={name.employee_number} value={name.employee_number}>
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                    <br></br>
                    <button className="btn btn-success btn-sm">Create</button>
                </form>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Automobile VIN</th>
                            <th>Sale Price</th>
                            <th>Sales Person Name</th>
                            <th>Sales Person Employee Number</th>
                            <th>Purchaser</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.automobile.vin}</td>
                                    <td>$ {sale.sales_price}</td>
                                    <td>{sale.sale_person.name}</td>
                                    <td>{sale.sale_person.employee_number}</td>
                                    <td>{sale.customer.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="sales" className="btn btn-success btn-md">View all sales</Link>
            </>
        )
    }
}

export default ListSalesBySalesPerson;