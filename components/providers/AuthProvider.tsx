'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: { email: string; password: string; name: string; branch?: string; country?: string }) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  refreshUser: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        setUser(null);
        setToken(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('ccaskesa_token');
    const init = async () => {
      if (stored) {
        window.setTimeout(() => setToken(stored), 0);
      }
      await refreshUser();
      setIsLoading(false);
    };
    init();
  }, [refreshUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('ccaskesa_token', data.data.token);
        toast.success('Welcome back!');
        return true;
      } else {
        toast.error(data.error || 'Login failed.');
        return false;
      }
    } catch {
      toast.error('Network error. Please try again.');
      return false;
    }
  };

  const register = async (formData: { email: string; password: string; name: string; branch?: string; country?: string }): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('ccaskesa_token', data.data.token);
        toast.success('Account created successfully!');
        return true;
      } else {
        toast.error(data.error || 'Registration failed.');
        return false;
      }
    } catch {
      toast.error('Network error. Please try again.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ccaskesa_token');
    fetch('/api/auth/me', { method: 'POST' });
    toast.success('Logged out successfully.');
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, isAuthenticated: !!user, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
