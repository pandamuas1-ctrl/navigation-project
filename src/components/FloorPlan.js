import React, { useState, useEffect } from 'react';
import { loadData, findCabinetsByDoctor } from '../utils/data';
import CabinetDetail from './CabinetDetail';

export default function FloorPlan({ entrance }) {
  const basename = window.location.pathname.split('/')[1];
  const imgPath = `/${basename}/images/floors/floor${currentFloor}.png`;
  const [data, setData] = useState({ floors: [], cabinets: [] });
  const [currentFloor, setCurrentFloor] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadData().then(setData);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const results = findCabinetsByDoctor(data, searchTerm);
    setSearchResults(results);
  };

  const handleCabinetClick = (cabinet) => {
    setSelectedCabinet(cabinet);
    setDrawerOpen(true);
  };

  const cabinetsOnCurrentFloor = data.cabinets.filter(cab => cab.floor === currentFloor);

  return (
    <div className="floor-plan">
      <div className="floor-tabs">
        {data.floors.map(floor => (
          <button
            key={floor.number}
            className={currentFloor === floor.number ? 'active' : ''}
            onClick={() => setCurrentFloor(floor.number)}
          >
            {floor.name}
          </button>
        ))}
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Введите фамилию врача"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Найти</button>
      </div>

      {searchResults.length > 0 ? (
        <div className="search-results">
          <h3>Результаты поиска</h3>
          {searchResults.map(cab => (
            <div key={cab.id} className="cabinet-card" onClick={() => handleCabinetClick(cab)}>
              <strong>Кабинет {cab.id}</strong> – {cab.doctor}
            </div>
          ))}
        </div>
      ) : (
        <div className="cabinet-grid">
          <h3>Этаж {currentFloor}</h3>
          <div className="cabinet-list">
            {cabinetsOnCurrentFloor.map(cab => (
              <div key={cab.id} className="cabinet-card" onClick={() => handleCabinetClick(cab)}>
                Каб. {cab.id}<br />
                <small>{cab.doctor}</small>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="floor-plan-image">
        <img
          src={`/navigation-project/images/floors/floor${currentFloor}.png`}
          alt={`План ${currentFloor} этажа`}
          style={{ width: '100%', borderRadius: '12px', marginBottom: '20px' }}
          onError={(e) => { e.target.style.display = 'none' }} // скрыть, если файла нет
        />
      </div>

      {drawerOpen && selectedCabinet && (
        <CabinetDetail
          cabinet={selectedCabinet}
          entrance={entrance}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </div>
  );
}