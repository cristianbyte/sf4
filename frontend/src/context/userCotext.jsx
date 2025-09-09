import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiRequest } from "../services/request";
const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);
  const randomNames = ["Invitado", "Visitante", "Participante", "Luchador", "Retador", "Espectador", "Explorador", "Aliado", "Observador", "Curioso", "Anonimo"];

  const saveUserToStorage = (userData) => {
    try {
      const userString = JSON.stringify(userData);
      localStorage.setItem('user', userString);
      sessionStorage.setItem('user', userString);
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  };

  const getUserFromStorage = () => {
    try {
      const localUser = localStorage.getItem('user');
      const sessionUser = sessionStorage.getItem('user');

      if (localUser) {
        return JSON.parse(localUser);
      } else if (sessionUser) {
        return JSON.parse(sessionUser);
      }
      return null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  };


  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    const storedUser = getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
      setIsLoading(false);
      return;
    }

    try {
      const getUser = await apiRequest('/user/me', "GET");
      if (getUser) {
        const updatedUser = {
          ...getUser,
          votes: getUser.votes || []
        };
        setUser(updatedUser);
        saveUserToStorage(updatedUser);
        return;
      }
    } catch (error) {
      if (error.response?.data?.status === 401 || error.response?.data?.status === 404) {
        try {
          const randomName = `${randomNames[Math.floor(Math.random() * randomNames.length)]}${Math.floor(Math.random() * 1000)}`;

          const newGuest = await apiRequest('/user/guest', "POST", {
            name: randomName,
            role: "GUEST"
          });

          if (newGuest) {
            setUser(newGuest);
            saveUserToStorage(newGuest);
          }
        } catch (guestError) {
          console.error("Error creating guest:", guestError);
        }
      } else {
        console.error("Unexpected error fetching user:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [reloadFlag]);

  const reloadUser = () => setReloadFlag((prev) => prev + 1);

  const updateUser = (userData) => {
    setUser(userData);
    saveUserToStorage(userData);
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
    <UserContext.Provider value={{ user, setUser: updateUser, reloadUser, logout, setIsLoading }}>
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