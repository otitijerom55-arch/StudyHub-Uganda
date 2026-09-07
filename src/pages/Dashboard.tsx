import { motion } from 'framer-motion';
import type { Page } from '../App';
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
  Zap
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const quickActions = [
  { id: 'flashcards' as Page, label: 'Flashcards', icon: CreditCard, color: 'from-blue-500 to-cyan-500', desc: 'Review & memorize' },
  { id: 'pomodoro' as Page, label: 'Study Timer', icon: Timer, color: 'from-orange-500 to-red-500', desc: 'Focus sessions' },
  { id: 'tasks' as Page, label: 'Tasks', icon: CheckSquare, color: 'from-green-500 to-emerald-500', desc: 'Stay organized' },
  { id: 'resources' as Page, label: 'Resources', icon: BookOpen, color: 'from-purple-500 to-violet-500', desc: 'Learn & explore' },
  { id: 'wellness' as Page, label: 'Wellness', icon: Heart, color: 'from-pink-500 to-rose-500', desc: 'Mind & body' },
  { id: 'goals' as Page, label: 'Goals', icon: Target, color: 'from-indigo-500 to-blue-500', desc: 'Track progress' },
];

const stats = [
  { label: 'Study Hours', value: '12.5', change: '+2.3h', icon: Clock },
  { label: 'Tasks Done', value: '24', change: '+8', icon: CheckSquare },
  { label: 'Streak', value: '7 days', change: '🔥', icon: Zap },
  { label: 'Avg Score', value: '87%', change: '+5%', icon: TrendingUp },
];

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-gray-900"
        >
          Welcome back, Student! 👋
        </motion.h1>
        <p className="text-gray-500 mt-1">Here's your study overview for today</p>
      </div>

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

      {/* Today's Schedule & Recent Activity */}
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
            Today's Schedule
          </h3>
          <div className="space-y-3">
            {[
              { time: '9:00 AM', task: 'Math Review - Calculus', done: true },
              { time: '11:00 AM', task: 'Physics Lab Report', done: true },
              { time: '2:00 PM', task: 'History Essay Draft', done: false },
              { time: '4:00 PM', task: 'CS Assignment #5', done: false },
              { time: '7:00 PM', task: 'Flashcard Review', done: false },
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
            Study Tips & Resources
          </h3>
          <div className="space-y-3">
            {[
              { tip: 'Use spaced repetition for better long-term memory retention', tag: 'Memory', page: 'flashcards' as Page },
              { tip: 'Take 5-minute breaks every 25 minutes to maintain focus', tag: 'Focus', page: 'pomodoro' as Page },
              { tip: 'Track your study goals and celebrate milestones', tag: 'Goals', page: 'goals' as Page },
              { tip: 'Take care of your mind and body for better performance', tag: 'Health', page: 'wellness' as Page },
              { tip: 'Organize tasks by priority and deadline for efficiency', tag: 'Strategy', page: 'tasks' as Page },
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
    </div>
  );
}
