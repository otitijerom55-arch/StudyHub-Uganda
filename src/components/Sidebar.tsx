import { motion } from 'framer-motion';
import type { Page } from '../App';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  CreditCard,
  Timer,
  CheckSquare,
  BookOpen,
  Heart,
  Target,
  GraduationCap,
  X,
  LogOut,
  Shield,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'flashcards', label: 'Flashcards', icon: CreditCard },
    { id: 'pomodoro', label: 'Study Timer', icon: Timer },
    { id: 'tasks', label: 'Tasks & Schedule', icon: CheckSquare },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'wellness', label: 'Wellness', icon: Heart },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  if (isAdmin) {
    navItems.push({ id: 'admin', label: 'Admin Panel', icon: Shield });
  }

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 via-red-500 to-black rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">StudyHub</h1>
            <p className="text-xs text-gray-500">Uganda 🇺🇬</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      {user && (
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-lg">
              {user.avatar || '🎓'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">
                {isAdmin ? 'Administrator' : `${user.grade || ''} • ${user.school || ''}`}
              </p>
            </div>
            {isAdmin && (
              <Shield className="w-4 h-4 text-red-500 flex-shrink-0" />
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : item.id === 'admin'
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                isActive ? 'text-indigo-600' : item.id === 'admin' ? 'text-red-500' : 'text-gray-400'
              }`} />
              <span className="text-sm flex-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-2 h-2 rounded-full bg-indigo-600"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        {/* Study Tip */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-indigo-700 mb-1">💡 UNEB Tip</p>
          <p className="text-xs text-gray-600">
            Practice past papers on Cognito.org — interactive lessons for UNEB preparation.
          </p>
          <a
            href="https://cognito.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Try Cognito <ChevronRight className="w-3 h-3" />
          </a>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
