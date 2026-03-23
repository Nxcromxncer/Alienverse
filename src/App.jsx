import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BackgroundFX from './components/BackgroundFX';
import Home from './pages/Home';
import AlienPage from './pages/Alien';
import About from './pages/About';

const App = () => {
  return (
    <BrowserRouter>
      {/* Ben10 Recalibrated style background */}
      <BackgroundFX />

      {/* Large circular Omnitrix dial sidebar */}
      <Sidebar />

      {/* Page content — left padding to clear sidebar (~110px visible) */}
      <main className="relative z-10" style={{ paddingLeft: '90px' }}>
        <Routes>
          <Route path="/"       element={<Home />} />
          <Route path="/aliens" element={<AlienPage />} />
          <Route path="/about"  element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
