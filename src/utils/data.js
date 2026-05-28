// Загружает данные из JSON и объединяет с сохранёнными в localStorage правками админа
export async function loadData() {
  const response = await fetch('/data.json');
  const defaultData = await response.json();
  
  const saved = localStorage.getItem('hospitalData');
  if (saved) {
    const userData = JSON.parse(saved);
    // заменяем кабинеты теми, что сохранил админ
    defaultData.cabinets = userData.cabinets || defaultData.cabinets;
  }
  return defaultData;
}

// Сохраняет данные из админ-панели в localStorage
export function saveCabinets(cabinets) {
  const saved = localStorage.getItem('hospitalData');
  let fullData = saved ? JSON.parse(saved) : {};
  fullData.cabinets = cabinets;
  localStorage.setItem('hospitalData', JSON.stringify(fullData));
}

// Поиск кабинета по врачу
export function findCabinetsByDoctor(data, doctorName) {
  const lowerName = doctorName.toLowerCase();
  return data.cabinets.filter(cab => cab.doctor.toLowerCase().includes(lowerName));
}

// Поиск кабинета по ID
export function findCabinetById(data, id) {
  return data.cabinets.find(cab => cab.id === id);
}