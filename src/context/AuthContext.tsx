import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school?: string;
  grade?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (name: string, email: string, password: string, school: string, grade: string) => { success: boolean; message: string };
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin credentials
const ADMIN_EMAIL = 'otitijerom55@gmail.com';
const ADMIN_PASSWORD = 'Ultramaxjdistro';

const ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Jerome Otim',
  email: ADMIN_EMAIL,
  role: 'admin',
  avatar: '👨‍💼',
};

// Default student accounts for demo
const DEFAULT_STUDENTS = [
  { id: 'student-001', name: 'Nakato Sarah', email: 'student@studyhub.ug', password: 'student123', school: 'Makerere College School', grade: 'Senior 4', role: 'student' as UserRole },
  { id: 'student-002', name: 'Mugisha David', email: 'david@studyhub.ug', password: 'student123', school: 'King\'s College Budo', grade: 'Senior 6', role: 'student' as UserRole },
  { id: 'student-003', name: 'Auma Grace', email: 'grace@studyhub.ug', password: 'student123', school: 'Nabisunsa Girls School', grade: 'Senior 5', role: 'student' as UserRole },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('studyhub_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('studyhub_user');
      }
    }
  }, []);

  const login = (email: string, password: string): { success: boolean; message: string } => {
    // Check admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser(ADMIN_USER);
      localStorage.setItem('studyhub_user', JSON.stringify(ADMIN_USER));
      return { success: true, message: 'Welcome back, Admin!' };
    }

    // Check registered students
    const registeredStudents = JSON.parse(localStorage.getItem('studyhub_students') || '[]');
    const allStudents = [...DEFAULT_STUDENTS, ...registeredStudents];
    const found = allStudents.find(s => s.email === email && s.password === password);

    if (found) {
      const userData: User = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: 'student',
        school: found.school,
        grade: found.grade,
        avatar: '🎓',
      };
      setUser(userData);
      localStorage.setItem('studyhub_user', JSON.stringify(userData));
      return { success: true, message: `Welcome back, ${found.name}!` };
    }

    return { success: false, message: 'Invalid email or password. Please try again.' };
  };

  const register = (name: string, email: string, password: string, school: string, grade: string): { success: boolean; message: string } => {
    const registeredStudents = JSON.parse(localStorage.getItem('studyhub_students') || '[]');
    const allStudents = [...DEFAULT_STUDENTS, ...registeredStudents];

    if (allStudents.some(s => s.email === email)) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    if (email === ADMIN_EMAIL) {
      return { success: false, message: 'This email is reserved.' };
    }

    const newStudent = {
      id: `student-${Date.now()}`,
      name,
      email,
      password,
      school,
      grade,
      role: 'student' as UserRole,
    };

    registeredStudents.push(newStudent);
    localStorage.setItem('studyhub_students', JSON.stringify(registeredStudents));

    const userData: User = {
      id: newStudent.id,
      name: newStudent.name,
      email: newStudent.email,
      role: 'student',
      school: newStudent.school,
      grade: newStudent.grade,
      avatar: '🎓',
    };
    setUser(userData);
    localStorage.setItem('studyhub_user', JSON.stringify(userData));
    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyhub_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
