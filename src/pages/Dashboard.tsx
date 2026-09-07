import { motion } from 'framer-motion';
import type { Page } from '../App';
import { useAuth } from '../context/AuthContext';
import {
  CreditCard,
  Timer,
  CheckSquare,
  BookOpen,
  Heart,
  Target,
  TrendingUp,
  Clock,
  Star,
  Zap,
  GraduationCap
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const quickActions = [
  { id: 'flashcards' as Page, label: 'Flashcards', icon: CreditCard, color: 'from-blue-500 to-cyan-500', desc: 'UNEB revision' },
  { id: 'pomodoro' as Page, label: 'Study Timer', icon: Timer, color: 'from-orange-500 to-red-500', desc: 'Focus sessions' },
  { id: 'tasks' as Page, label: 'Tasks', icon: CheckSquare, color: 'from-green-500 to-emerald-500', desc: 'Stay organized' },
  { id: 'resources' as Page, label: 'Resources', icon: BookOpen, color: 'from-purple-500 to-violet-500', desc: 'Open learning' },
  { id: 'wellness' as Page, label: 'Wellness', icon: Heart, color: 'from-pink-500 to-rose-500', desc: 'Mind & body' },
  { id: 'goals' as Page, label: 'Goals', icon: Target, color: 'from-indigo-500 to-blue-500', desc: 'Track progress' },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth();

  const stats = [
    { label: 'Study Hours', value: '12.5', change: '+2.3h', icon: Clock },
    { label: 'Tasks Done', value: '24', change: '+8', icon: CheckSquare },
    { label: 'Streak', value: '7 days', change: '🔥', icon: Zap },
    { label: 'UNEB Readiness', value: '78%', change: '+12%', icon: TrendingUp },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          {user?.role === 'admin' ? (
            <span className="flex items-center gap-2">
              Admin Panel
              <span className="text-xs font-medium bg-red-100 text-red-700 px-2 py-1 rounded-full">ADMIN</span>
            </span>
          ) : (
            <span>Webale nnyo, {user?.name?.split(' ')[0] || 'Student'}! 👋</span>
          )}
        </motion.h1>
        <p className="text-gray-500 mt-1">
          {user?.school ? `${user.school} • ${user.grade}` : "Here's your study overview for today"}
        </p>
      </div>

      {/* UNEB Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-gradient-to-r from-yellow-400 via-red-500 to-black rounded-2xl p-5 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-lg">UNEB Preparation Hub</h2>
            <p className="text-white/80 text-sm">Aligned with Uganda National Examinations Board curriculum for O-Level & A-Level</p>
          </div>
          <button
            onClick={() => onNavigate('resources')}
            className="hidden md:block px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors"
          >
            View Resources
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(action.id)}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center group"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-900">{action.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{action.desc}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule & Study Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            Today's Study Plan
          </h3>
          <div className="space-y-3">
            {[
              { time: '8:00 AM', task: 'Mathematics - Calculus Revision', done: true },
              { time: '10:00 AM', task: 'Physics - Mechanics (UNEB 2024 Q5)', done: true },
              { time: '1:00 PM', task: 'English - Essay Writing Practice', done: false },
              { time: '3:00 PM', task: 'Biology - Genetics Flashcards', done: false },
              { time: '5:00 PM', task: 'Chemistry - Organic Chemistry Notes', done: false },
              { time: '7:00 PM', task: 'History of East Africa - Review', done: false },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${item.done ? 'bg-gray-50' : 'bg-indigo-50/50'}`}>
                <span className="text-xs font-mono text-gray-500 w-16">{item.time}</span>
                <span className={`text-sm flex-1 ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                  {item.task}
                </span>
                {item.done && <Star className="w-4 h-4 text-yellow-500" />}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Study Tips */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            UNEB Study Tips
          </h3>
          <div className="space-y-3">
            {[
              { tip: 'Practice past UNEB papers regularly for exam familiarity', tag: 'UNEB', page: 'resources' as Page },
              { tip: 'Use Cognito.org for interactive video lessons in sciences', tag: 'Digital', page: 'resources' as Page },
              { tip: 'Group study with classmates to teach and learn together', tag: 'Social', page: 'flashcards' as Page },
              { tip: 'Use flashcards for quick revision of key concepts', tag: 'Memory', page: 'flashcards' as Page },
              { tip: 'Focus on understanding, not memorizing — apply concepts', tag: 'Strategy', page: 'pomodoro' as Page },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => onNavigate(item.page)}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-indigo-50 transition-colors w-full text-left group"
              >
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 group-hover:bg-indigo-100 px-2 py-1 rounded-full whitespace-nowrap transition-colors">
                  {item.tag}
                </span>
                <p className="text-sm text-gray-600 group-hover:text-indigo-700 transition-colors">{item.tip}</p>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Subjects Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
      >
        <h3 className="font-semibold text-gray-900 mb-4">📚 UNEB Subjects — Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {[
            { name: 'Mathematics', emoji: '📐', color: 'bg-blue-50 text-blue-700 border-blue-200' },
            { name: 'Physics', emoji: '⚡', color: 'bg-purple-50 text-purple-700 border-purple-200' },
            { name: 'Chemistry', emoji: '🧪', color: 'bg-green-50 text-green-700 border-green-200' },
            { name: 'Biology', emoji: '🧬', color: 'bg-pink-50 text-pink-700 border-pink-200' },
            { name: 'English', emoji: '📝', color: 'bg-orange-50 text-orange-700 border-orange-200' },
            { name: 'History', emoji: '📜', color: 'bg-amber-50 text-amber-700 border-amber-200' },
            { name: 'Geography', emoji: '🌍', color: 'bg-teal-50 text-teal-700 border-teal-200' },
            { name: 'Computer St.', emoji: '💻', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
            { name: 'Kiswahili', emoji: '🗣️', color: 'bg-red-50 text-red-700 border-red-200' },
            { name: 'Literature', emoji: '📖', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
            { name: 'Economics', emoji: '📊', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { name: 'Entrepreneur.', emoji: '💡', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
          ].map((subject) => (
            <button
              key={subject.name}
              onClick={() => onNavigate('flashcards')}
              className={`p-3 rounded-xl border text-center hover:scale-105 transition-transform ${subject.color}`}
            >
              <span className="text-xl block mb-1">{subject.emoji}</span>
              <span className="text-xs font-medium">{subject.name}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
