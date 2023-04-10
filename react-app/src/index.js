// Root of the site
// This file handles routing and shouldn't require any changes
// unless we add more pages

// global npm requirements
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Order from "./pages/Order";
import NoPage from "./pages/NoPage";
import Admin from "./pages/Admin";
import OrderInfo from "./pages/OrderInfo"
import Contact from "./pages/Contact"
import Fire from "./pages/Fire"

//          <Route path="dashboard" element={<Admin />} />

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="order" element={<Order />} />
          <Route path="orderInfo" element={<OrderInfo />} />
          <Route path="admin" element={<Admin />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="fire" element={<Fire/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);