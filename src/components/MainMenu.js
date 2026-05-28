import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenu({ setEntrance }) {
  const navigate = useNavigate();

  const handleEntrance = (entrance) => {
    setEntrance(entrance);
    navigate('/floor');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  return (
    <div className="main-menu">
      <h1>Навигация по больнице</h1>
      <p>Выберите, где вы сейчас:</p>
      <div className="buttons">
        <button onClick={() => handleEntrance('front')}>🚪 Главный вход</button>
        <button onClick={() => handleEntrance('registry')}>📋 Регистратура</button>
        <button onClick={() => handleEntrance('back')}>🚪 Задний вход</button>
        <button onClick={handleAdmin} className="admin-btn">🔧 Админ меню</button>
      </div>
    </div>
  );
}