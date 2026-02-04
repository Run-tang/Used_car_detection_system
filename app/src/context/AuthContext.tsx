import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { currentUser } from '@/data/mock';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(currentUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // 模拟登录验证
    if (username && password) {
      setUser({
        ...currentUser,
        role,
      });
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
