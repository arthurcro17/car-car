import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ServiceHistoryPage from './ServiceHistory';
import ServiceListPage from './ServiceList';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path='services'>
            <Route path='' element={<ServiceListPage />} />
            <Route path='history' element={<ServiceHistoryPage />} />
          </Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
