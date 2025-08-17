import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'professor' | 'admin' | 'superadmin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: Partial<User> & { password: string }) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock authentication - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email
      const mockUser: User = {
        id: '1',
        name: email.includes('student') ? 'John Student' : 
              email.includes('professor') ? 'Dr. Smith' : 
              email.includes('admin') ? 'Admin User' : 'Jane Doe',
        email,
        role: email.includes('student') ? 'student' : 
              email.includes('professor') ? 'professor' : 
              email.includes('admin') ? 'admin' : 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        studentId: email.includes('student') ? 'STU001' : undefined,
        department: 'Computer Science'
      };
      
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (userData: Partial<User> & { password: string }) => {
    setLoading(true);
    try {
      // Mock signup - replace with real API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Math.random().toString(36),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'student',
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`,
        studentId: userData.role === 'student' ? `STU${Math.floor(Math.random() * 1000)}` : undefined,
        department: userData.department || 'Computer Science'
      };
      
      setUser(newUser);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
