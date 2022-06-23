import React from 'react';
import { Link } from 'react-router-dom'

class ListSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales: [],
        }
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salerecord/'
        try {
            const response = await fetch(url)
            if (response.ok) {
                const data = await response.json();
                this.setState({sales: data.sale_records});
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <>
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
                <Link to="bysalesperson" className="btn btn-success btn-md">Search records by sales person</Link>
            </>
        )
    }
}

export default ListSales;


