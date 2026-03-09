import { formatDistanceToNow, formatDate } from 'date-fns';

export const getMoistureStatus = (moisture) => {
  if (moisture >= 60) return { status: 'Healthy', color: '#4CAF50' };
  if (moisture >= 40) return { status: 'Good', color: '#87CEEB' };
  return { status: 'Needs Water', color: '#FF6B6B' };
};

export const formatLastWatered = (date) => {
  if (!date) return 'Never';
  const dateObj = new Date(date);
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

export const getTimeAgo = (date) => {
  if (!date) return 'N/A';
  return formatLastWatered(date);
};

export const getMoistureLabel = (moisture) => {
  if (moisture >= 70) return 'Very Wet';
  if (moisture >= 50) return 'Moist';
  if (moisture >= 30) return 'Dry';
  return 'Very Dry';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const generatePlantColor = (index) => {
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E2',
  ];
  return colors[index % colors.length];
};

export const getPlantInitials = (name) => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};

export const sortPlantsByMoisture = (plants, order = 'desc') => {
  return [...plants].sort((a, b) => {
    return order === 'desc' ? b.moisture - a.moisture : a.moisture - b.moisture;
  });
};

export const sortPlantsByLastWatered = (plants) => {
  return [...plants].sort((a, b) => {
    const dateA = new Date(a.lastWatered || 0);
    const dateB = new Date(b.lastWatered || 0);
    return dateB - dateA; // Most recent first
  });
};

export const filterPlantsByStatus = (plants, status) => {
  if (status === 'all') return plants;
  if (status === 'healthy') return plants.filter(p => p.moisture >= 60);
  if (status === 'needsWater') return plants.filter(p => p.moisture >= 40 && p.moisture < 60);
  if (status === 'unhealthy') return plants.filter(p => p.moisture < 40);
  return plants;
};

export const searchPlants = (plants, query) => {
  if (!query) return plants;
  const lowerQuery = query.toLowerCase();
  return plants.filter(
    plant =>
      plant.name.toLowerCase().includes(lowerQuery) ||
      plant.location.toLowerCase().includes(lowerQuery) ||
      plant.type.toLowerCase().includes(lowerQuery)
  );
};
