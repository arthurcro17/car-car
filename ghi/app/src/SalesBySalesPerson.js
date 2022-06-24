import React from 'react';
import { Link } from 'react-router-dom';

class ListSalesBySalesPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
            salesPeople: [],
            salesPerson: '',
        }
        this.handleSalesPeopleChange = this.handleSalesPeopleChange.bind(this);
        this.handleSalesChange = this.handleSalesChange.bind(this);
        this.handleSubmitChange = this.handleSubmitChange.bind(this);
    }

    async handleSubmitChange(event) {
        event.preventDefault();
    }

    handleSalesPeopleChange(event){
        const value = event.target.value;
        this.setState({salesPerson: value})
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
                this.setState({sales: data.sale_records});
            }
            const salesPeopleUrl = 'http://localhost:8090/api/salespeople/';
            const salesPeopleResponse = await fetch(salesPeopleUrl);
            if (salesPeopleResponse.ok) {
                const salesPeopleData = await salesPeopleResponse.json();
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
                <form onChange={this.handleSubmitChange} id="select-vin-form">
                    <select onChange={this.handleSalesPeopleChange} value={this.state.salesPerson} required name="name" id="name" className="form-select">
                        <option value="">Choose a sales person</option>
                        {this.state.salesPeople.map(sales_person => {
                            return (
                                <option key={sales_person.employee_number} value={sales_person.employee_number}>
                                    {sales_person.name}
                                </option>
                            );
                        })}
                    </select>
                    <br></br>
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
                            if (this.state.salesPerson) {
                                if (sale.sale_person.employee_number == this.state.salesPerson) {
                                    return (
                                        <tr key={sale.id}>
                                            <td>{sale.automobile.vin}</td>
                                            <td>$ { new Intl.NumberFormat().format(sale.sales_price) }</td>
                                            <td>{sale.sale_person.name}</td>
                                            <td>{sale.sale_person.employee_number}</td>
                                            <td>{sale.customer.name}</td>
                                        </tr>
                                    )
                                }
                            }
                            else {
                                return (
                                    <tr key={sale.id}>
                                        <td>{sale.automobile.vin}</td>
                                        <td>$ { new Intl.NumberFormat().format(sale.sales_price) }</td>
                                        <td>{sale.sale_person.name}</td>
                                        <td>{sale.sale_person.employee_number}</td>
                                        <td>{sale.customer.name}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                <Link to="/sales/" className="btn btn-success btn-md">View all sales</Link>
            </>
        )
    }
}

export default ListSalesBySalesPerson;