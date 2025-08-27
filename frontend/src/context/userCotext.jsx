import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "../services/request";
const UserContext = createContext();
const USER_STORAGE_KEY = 'sf4_user_data';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  };

  const logout = async () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      setIsLoading(true)
      try {
        await apiRequest('/user/logout', 'GET');
        setUser(null);
        localStorage.removeItem(USER_STORAGE_KEY);
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Error al cerrar sesión. Inténtalo de nuevo.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout, setIsLoading }}>
      {children}
      {isLoading && (
        <div className="isLoading">
          <div className="isLoading-loader"></div>
        </div>
      )}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}