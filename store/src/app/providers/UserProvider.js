'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { userService } from '@/api/userService';

const UserContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  refetch: () => {}
});

export function UserProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    loading: true,
    isClient: false
  });

  //useRef для хранения кэша между рендерами
  const userCache = useRef({
    data: null,
    timestamp: 0
  });

  useEffect(() => {
    //загружаем пользователя при монтировании
    loadUserOnMount();
  
  }, []);


  const loadUserOnMount = async () => {
    // Проверяем кэш (5 минут)
    const now = Date.now();
    if (userCache.current.data && (now - userCache.current.timestamp) < 5 * 60 * 1000) {
      setState({
        user: userCache.current.data,
        loading: false,
        isClient: true
      });
      return;
    }

    // Загружаем API-ключ из localStorage
    const savedApiKey = userService.loadApiKeyFromStorage();
    
    if (savedApiKey) {
      userService.setApiKey(savedApiKey);
      loadUser(savedApiKey);
    } else {
      setState(prev => ({ ...prev, loading: false, isClient: true }));
    }
  };

  const loadUser = async (apiKey) => {
    try {
      const userData = await userService.getUser(apiKey);
      // Сохраняем в кэш
      userCache.current = {
        data: userData,
        timestamp: Date.now()
      };
      
      setState({
        user: userData,
        loading: false,
        isClient: true
      });
    } catch (error) {
      console.error('Failed to load user:', error);
      clearAuth();
    }
  };

  const login = async (apiKey) => {
    userService.setApiKey(apiKey);
    await loadUser(apiKey);
  };

  const logout = async () => {
    try {
      await userService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Очищаем кэш
      userCache.current = { data: null, timestamp: 0 };
      
      clearAuth();
      window.location.href = '/';
    }
  };

  const clearAuth = () => {
    setState({
      user: null,
      loading: false,
      isClient: true
    });
  };

  const refetch = () => {
    // Очищаем кэш и загружаем заново
    userCache.current = { data: null, timestamp: 0 };
    const apiKey = userService.loadApiKeyFromStorage();
    if (apiKey) loadUser(apiKey);
  };

  const contextValue = {
    user: state.isClient ? state.user : null,
    loading: state.isClient ? state.loading : true,
    login,
    logout,
    refetch,
    clearAuth
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);