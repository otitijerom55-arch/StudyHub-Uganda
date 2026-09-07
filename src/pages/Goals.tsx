import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Trophy, TrendingUp, Calendar, Award } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  category: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  milestones: { label: string; completed: boolean }[];
}

const initialGoals: Goal[] = [
  {
    id: 1,
    title: 'Read 20 books this semester',
    category: 'Academic',
    target: 20,
    current: 12,
    unit: 'books',
    deadline: '2026-05-30',
    milestones: [
      { label: '5 books', completed: true },
      { label: '10 books', completed: true },
      { label: '15 books', completed: false },
      { label: '20 books', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Maintain 3.8+ GPA',
    category: 'Academic',
    target: 3.8,
    current: 3.6,
    unit: 'GPA',
    deadline: '2026-06-15',
    milestones: [
      { label: '3.0 GPA', completed: true },
      { label: '3.4 GPA', completed: true },
      { label: '3.6 GPA', completed: true },
      { label: '3.8 GPA', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Study 200 hours this semester',
    category: 'Study Time',
    target: 200,
    current: 145,
    unit: 'hours',
    deadline: '2026-05-30',
    milestones: [
      { label: '50 hours', completed: true },
      { label: '100 hours', completed: true },
      { label: '150 hours', completed: false },
      { label: '200 hours', completed: false },
    ],
  },
  {
    id: 4,
    title: 'Complete 3 online certifications',
    category: 'Career',
    target: 3,
    current: 1,
    unit: 'certifications',
    deadline: '2026-08-01',
    milestones: [
      { label: '1 certification', completed: true },
      { label: '2 certifications', completed: false },
      { label: '3 certifications', completed: false },
    ],
  },
];

const categories = ['All', 'Academic', 'Study Time', 'Career', 'Personal'];

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Academic');
  const [newTarget, setNewTarget] = useState('');
  const [newUnit, setNewUnit] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const filteredGoals = selectedCategory === 'All'
    ? goals
    : goals.filter(g => g.category === selectedCategory);

  const totalProgress = goals.reduce((acc, g) => acc + (g.current / g.target), 0) / goals.length * 100;

  const addGoal = () => {
    if (newTitle && newTarget && newUnit && newDeadline) {
      const target = parseFloat(newTarget);
      setGoals([...goals, {
        id: Date.now(),
        title: newTitle,
        category: newCategory,
        target,
        current: 0,
        unit: newUnit,
        deadline: newDeadline,
        milestones: [
          { label: `25%`, completed: false },
          { label: `50%`, completed: false },
          { label: `75%`, completed: false },
          { label: `100%`, completed: false },
        ],
      }]);
      setNewTitle('');
      setNewTarget('');
      setNewUnit('');
      setNewDeadline('');
      setShowAddForm(false);
    }
  };

  const incrementGoal = (id: number) => {
    setGoals(goals.map(g => {
      if (g.id === id && g.current < g.target) {
        const newCurrent = g.current + 1;
        const updatedMilestones = g.milestones.map(m => {
          const percent = parseInt(m.label) || (m.label === '100%' ? 100 : 0);
          if (m.label.includes('%')) {
            return { ...m, completed: (newCurrent / g.target * 100) >= percent };
          }
          return m;
        });
        return { ...g, current: newCurrent, milestones: updatedMilestones };
      }
      return g;
    }));
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Goals & Progress</h1>
          <p className="text-gray-500 mt-1">Track your academic and personal goals</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Goal
        </button>
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Overall Progress</h2>
            <p className="text-indigo-200 text-sm">{goals.length} active goals</p>
          </div>
          <Trophy className="w-10 h-10 text-yellow-300" />
        </div>
        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(totalProgress, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="text-sm mt-2 text-indigo-200">{Math.round(totalProgress)}% overall completion</p>
      </motion.div>

      {/* Add Goal Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 overflow-hidden"
        >
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Create New Goal</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Goal title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Academic">Academic</option>
                <option value="Study Time">Study Time</option>
                <option value="Career">Career</option>
                <option value="Personal">Personal</option>
              </select>
              <input
                type="number"
                placeholder="Target number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                placeholder="Unit (e.g., books, hours)"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 md:col-span-2"
              />
            </div>
            <button
              onClick={addGoal}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Create Goal
            </button>
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal, i) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                      {goal.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {goal.deadline}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                </div>
                <button
                  onClick={() => incrementGoal(goal.id)}
                  disabled={goal.current >= goal.target}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    goal.current >= goal.target
                      ? 'bg-green-100 text-green-700'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  {goal.current >= goal.target ? '✓ Complete!' : '+1'}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="text-sm font-medium text-indigo-600">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="flex flex-wrap gap-2">
                {goal.milestones.map((milestone, j) => (
                  <span
                    key={j}
                    className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 ${
                      milestone.completed
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-50 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {milestone.completed && <Award className="w-3 h-3" />}
                    {milestone.label}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Target className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>No goals in this category. Set a new goal to get started!</p>
        </div>
      )}
    </div>
  );
}
