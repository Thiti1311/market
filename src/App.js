import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import BagPage from './pages/BagPage';
import { BagProvider } from './contexts/BagContext'; 

const App = () => {
  return (
    <BagProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/bag" element={<BagPage />} />
        </Routes>
      </Router>
    </BagProvider>
  );
};

export default App;
