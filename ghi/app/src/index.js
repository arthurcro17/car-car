import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

async function loadInventory() {
  let servicesData
  let salesData
  const servicesResponse = await fetch('http://localhost:8080/api/services/')
  // const salesResponse = await fetch('http://localhost:8090/api/sales/')
  if (servicesResponse.ok) {
    servicesData = await servicesResponse.json()
  }
  else {
    console.log('service data not okay')
  }
  // if (salesResponse.ok) {
  //   salesData = await salesResponse.json()
  // }
  // else {
  //   console.log('sales data not okay')
  // }
  root.render(
    <React.StrictMode>
      <App services={servicesData} /> 
    </React.StrictMode>
  )
}

loadInventory()
