
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'member';
  country: 'india' | 'america';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data with updated passwords
const mockUsers: { [key: string]: { user: User; password: string } } = {
  'admin@example.com': {
    user: { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin', country: 'india' },
    password: 'admin123'
  },
  'manager.india@example.com': {
    user: { id: '2', name: 'Manager India', email: 'manager.india@example.com', role: 'manager', country: 'india' },
    password: 'manager123'
  },
  'manager.america@example.com': {
    user: { id: '3', name: 'Manager America', email: 'manager.america@example.com', role: 'manager', country: 'america' },
    password: 'manager123'
  },
  'member.india@example.com': {
    user: { id: '4', name: 'Member India', email: 'member.india@example.com', role: 'member', country: 'india' },
    password: 'member123'
  },
  'member.america@example.com': {
    user: { id: '5', name: 'Member America', email: 'member.america@example.com', role: 'member', country: 'america' },
    password: 'member123'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    const userRecord = mockUsers[email];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('user', JSON.stringify(userRecord.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
