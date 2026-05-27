import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import FloorPlan from './components/FloorPlan';
import AdminPanel from './components/AdminPanel';
import './styles/App.css';

function App() {
  const [entrance, setEntrance] = useState('front');

  return (
    <BrowserRouter basename="/navigation-project">
      <div className="App">
        <Routes>
          <Route path="/" element={<MainMenu setEntrance={setEntrance} />} />
          <Route path="/floor" element={<FloorPlan entrance={entrance} />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;