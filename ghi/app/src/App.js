import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerForm from './Customer';
import SalesPersonForm from './SalesPerson';
import SaleRecord from './SaleRecord';

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
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
