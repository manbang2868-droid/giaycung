import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  user_metadata: {
    role: string;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS = [
  { 
    id: '1',
    email: 'admin@giaycung.com',
    password: 'admin123',
    user_metadata: { role: 'admin' }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      throw new Error('Sai email hoặc mật khẩu');
    }
    
    const mockUser: User = {
      id: foundUser.id,
      email: foundUser.email,
      user_metadata: foundUser.user_metadata
    };
    
    // Save to localStorage
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = async () => {
    localStorage.removeItem('mockUser');
    setUser(null);
  };

  const isAdmin = user?.user_metadata?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // During hot reload, context might be temporarily undefined
    const isHotReload = new Error().stack?.includes('scheduleRefresh');
    
    if (isHotReload) {
      // Return safe defaults during hot reload
      return {
        user: null,
        loading: false,
        signIn: async () => {},
        signOut: async () => {},
        isAdmin: false
      };
    }
    
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
