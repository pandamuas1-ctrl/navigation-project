import React, { useState, useEffect } from 'react';
import { loadData, saveCabinets } from '../utils/data';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [data, setData] = useState({ floors: [], cabinets: [] });
  const [editCabinet, setEditCabinet] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      loadData().then(setData);
    }
  }, [authenticated]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Неверный пароль');
    }
  };

  const handleSave = () => {
    saveCabinets(data.cabinets);
    alert('Данные сохранены!');
    navigate('/');
  };

  const updateDoctor = (cabId, newDoctor) => {
    const newCabinets = data.cabinets.map(cab =>
      cab.id === cabId ? { ...cab, doctor: newDoctor } : cab
    );
    setData({ ...data, cabinets: newCabinets });
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <h2>Вход в админ-панель</h2>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Войти</button>
        <button onClick={() => navigate('/')}>Назад</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Редактирование врачей в кабинетах</h2>
      <p>⚠️ Внимание: изменения сохранятся в браузере. Для реальной работы нужен сервер.</p>
      <table>
        <thead>
          <tr><th>Кабинет</th><th>Этаж</th><th>Врач</th><th>Действие</th></tr>
        </thead>
        <tbody>
          {data.cabinets.map(cab => (
            <tr key={cab.id}>
              <td>{cab.id}</td>
              <td>{cab.floor}</td>
              <td>
                <input
                  value={cab.doctor}
                  onChange={(e) => updateDoctor(cab.id, e.target.value)}
                />
              </td>
              <td>✏️ редактируется</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Сохранить и выйти</button>
      <button onClick={() => navigate('/')}>Отмена</button>
    </div>
  );
}