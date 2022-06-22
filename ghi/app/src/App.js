import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './Customer';
import SalesPersonForm from './SalesPerson';
import SaleRecord from './SaleRecord';
import ListSales from './ListSales';
import ListSalesBySalesPerson from './SalesBySalesPerson';

import ServiceHistoryPage from './ServiceHistory';
import ServiceListPage from './ServiceList';
import ServiceForm from './ServiceForm';
import TechnicianForm from './TechnicianForm';
import ServiceHistory2Page from './ServiceHistory2';



function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="sales">
            <Route path="customer" element={<CustomerForm />} />
            <Route path="salesperson" element={<SalesPersonForm />} />
            <Route path="salerecord" element={<SaleRecord />} />
            <Route path="" element={<ListSales />} />
            <Route path="bysalesperson" element={<ListSalesBySalesPerson />} />
          </Route>
          <Route path='services'>
            <Route path='' element={<ServiceListPage />} />
            <Route path='new' element={<ServiceForm />} />
            <Route path='history' element={<ServiceHistoryPage />} />
            <Route path='history2' element={<ServiceHistory2Page />} />
            <Route path='technicians'>
              <Route path = 'new' element={<TechnicianForm />} />
            </Route>
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
