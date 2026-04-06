import { useContext, useMemo } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useUserProfile = () => {
  const { user } = useContext(AuthContext);

  const profile = useMemo(() => {
    if (!user) return null;
    return {
      profile_picture: user.profile_picture || null,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      username: user.username || '',
      email: user.email || '',
    };
  }, [user]);

  const getDisplayName = () => {
    if (!user) return 'Guest';
    
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    if (user.first_name) {
      return user.first_name;
    }
    return user.username || 'User';
  };

  return { profile, getDisplayName };
};
