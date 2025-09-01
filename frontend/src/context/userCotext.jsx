import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "../services/request";
const UserContext = createContext();
const USER_STORAGE_KEY = 'sf4_user_data';

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const getUser = await apiRequest('/user/me', "GET");
      if (getUser) {
        setUser(getUser);
      }
    } catch (error) {
      if (error.status === 401) {
        setUser(null);
      } else {
        console.error("Unexpected error fetching user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  fetchUser();
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