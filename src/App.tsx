import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddCarPage from './pages/AddCarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-car" element={<AddCarPage />} />
        <Route path="/services" element={<HomePage />} /> {/* Placeholder */}
        <Route path="/offers" element={<HomePage />} /> {/* Placeholder */}
        <Route path="/recycle-bin" element={<HomePage />} /> {/* Placeholder */}
        <Route path="/contact" element={<HomePage />} /> {/* Placeholder */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
