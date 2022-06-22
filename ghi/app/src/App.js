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
import ManufacturerListPage from './ManufacturerList';
import InventoryMainPage from './InventoryMainPage';
import ManufacturerForm from './ManufacturerForm';
import ModelListPage from './ModelList';
import ModelForm from './ModelForm';
import AutomobileListPage from './AutomobileList';
import AutomobileForm from './AutomobileForm';


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
            <Route path='technicians'>
              <Route path = 'new' element={<TechnicianForm />} />
            </Route>
          </Route>
          <Route path='inventory/'>
            <Route path='' element={<InventoryMainPage />} />
            <Route path='manufacturers'>
              <Route path=''  element={<ManufacturerListPage />} />
              <Route path='new'  element={<ManufacturerForm />} />
            </Route>
            <Route path='models'>
              <Route path=''  element={<ModelListPage />} />
              <Route path='new'  element={<ModelForm />} />
            </Route>
            <Route path='automobiles'>
              <Route path=''  element={<AutomobileListPage />} />
              <Route path='new'  element={<AutomobileForm />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
