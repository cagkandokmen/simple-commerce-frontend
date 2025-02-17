// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout.tsx';
import LoginPage from '../login-page/LoginPage.tsx';
import ProductPage from '../product-page/ProductPage.tsx';
import BasketPage from '../basket-page/BasketPage.tsx';
import HomePage from '../home-page/HomePage.tsx';
import RegisterPage from '../register-page/RegisterPage.tsx';

import { ProfileProvider } from '../context/ProfileContext.tsx';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          {/* Public Routes (No Navbar) */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes (With Navbar) */}
          <Route path="/main" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductPage />} />
            <Route path="basket" element={<BasketPage />} />
          </Route>
        </Routes>
      </Router>
    </ProfileProvider>
  );
};

export default App;