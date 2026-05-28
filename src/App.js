import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import FloorPlan from './components/FloorPlan';
import AdminPanel from './components/AdminPanel';
import './styles/App.css';

function App() {
  return (
    <HashRouter>  {/* Убираем basename */}
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu setEntrance={setEntrance} />} />
          <Route path="/floor" element={<FloorPlan entrance={entrance} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;