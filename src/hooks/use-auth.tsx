
import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "@/api/client";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных аутентификации при инициализации
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("auth_user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Функция входа
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(email, password);
      
      setToken(response.token);
      setUser(response.user);
      
      // Сохранение в localStorage
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_user", JSON.stringify(response.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при входе");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Функция выхода
  const logout = async () => {
    setIsLoading(true);
    
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    } finally {
      // Очистка данных аутентификации
      setToken(null);
      setUser(null);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setIsLoading(false);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    isAdmin: user?.role === "admin",
    isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
