import React from 'react';

export default function CabinetDetail({ cabinet, entrance, onClose }) {
  let route = '';
  switch (entrance) {
    case 'front':
      route = cabinet.routeFromFront;
      break;
    case 'registry':
      route = cabinet.routeFromRegistry;
      break;
    case 'back':
      route = cabinet.routeFromBack;
      break;
    default:
      route = 'Маршрут не указан';
  }

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Кабинет {cabinet.id}</h2>
        <p><strong>Врач:</strong> {cabinet.doctor}</p>
        <p><strong>Этаж:</strong> {cabinet.floor}</p>
        <p><strong>Как пройти:</strong> {route}</p>
        <div className="photo-placeholder">
          🖼️ Здесь будет фото кабинета (добавите позже)
        </div>
      </div>
    </div>
  );
}