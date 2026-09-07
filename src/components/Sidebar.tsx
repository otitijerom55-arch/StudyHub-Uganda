import { motion } from 'framer-motion';
import type { Page } from '../App';
import {
  LayoutDashboard,
  CreditCard,
  Timer,
  CheckSquare,
  BookOpen,
  Heart,
  Target,
  GraduationCap,
  X
} from 'lucide-react';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'flashcards', label: 'Flashcards', icon: CreditCard },
  { id: 'pomodoro', label: 'Study Timer', icon: Timer },
  { id: 'tasks', label: 'Tasks & Schedule', icon: CheckSquare },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'goals', label: 'Goals', icon: Target },
];

export default function Sidebar({ currentPage, onNavigate, isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-lg leading-tight">StudyHub</h1>
            <p className="text-xs text-gray-500">Your study companion</p>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-gray-100">
          <X className="w-5 h-5" />
        </button>
      </div>

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
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className="text-sm">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-2 h-2 rounded-full bg-indigo-600"
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button
          onClick={() => onNavigate('pomodoro')}
          className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 text-left hover:from-indigo-100 hover:to-purple-100 transition-colors"
        >
          <p className="text-xs font-semibold text-indigo-700 mb-1">💡 Study Tip</p>
          <p className="text-xs text-gray-600">
            Use the Pomodoro technique: 25 min focus, 5 min break for optimal learning.
          </p>
          <p className="text-xs text-indigo-500 mt-2 font-medium">Try it now →</p>
        </button>
        <a
          href="https://www.coursera.org/articles/study-tips"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 text-left hover:from-green-100 hover:to-emerald-100 transition-colors"
        >
          <p className="text-xs font-semibold text-green-700">📚 More Study Tips</p>
          <p className="text-xs text-gray-500 mt-0.5">Explore expert advice →</p>
        </a>
      </div>
    </aside>
  );
}
