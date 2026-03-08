import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PlantContext } from '../context/PlantContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within PlantProvider');
  }
  return context;
};
