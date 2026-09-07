import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, User, School, BookOpen, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function Login() {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [grade, setGrade] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ugandanSchools = [
    'Makerere College School',
    'King\'s College Budo',
    'Nabisunsa Girls School',
    'Gayaza High School',
    'St. Mary\'s College Kisubi',
    'Mount Saint Mary\'s Namagunga',
    'Namilyango College',
    'Uganda Martyrs SS Lubaga',
    'Kololo High School',
    'Kings College Mukono',
    'Seeta High School',
    'Kibuli Secondary School',
    'Greenhill Academy',
    'International School of Uganda',
    'Other',
  ];

  const grades = ['Senior 1', 'Senior 2', 'Senior 3', 'Senior 4', 'Senior 5', 'Senior 6'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      const result = login(email, password);
      if (!result.success) {
        setError(result.message);
      }
    } else {
      if (!name || !email || !password || !school || !grade) {
        setError('Please fill in all fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      const result = register(name, email, password, school, grade);
      if (result.success) {
        setSuccess(result.message);
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-yellow-500 via-red-500 to-black p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400/20 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">StudyHub Uganda</h1>
              <p className="text-white/80 text-sm">Empowering learners across Uganda</p>
            </div>
          </div>

          {/* Hero text */}
          <div className="mt-12 lg:mt-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
              Your Complete<br />
              <span className="text-yellow-300">Study Companion</span>
            </h2>
            <p className="text-white/90 text-lg max-w-md">
              Designed for Ugandan students — aligned with the UNEB curriculum, featuring free open resources, and tools to help you excel in your studies.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="relative z-10 grid grid-cols-2 gap-4 mt-12">
          {[
            { icon: '📚', label: 'UNEB Aligned Content' },
            { icon: '🌍', label: 'Free Open Resources' },
            { icon: '🧠', label: 'Smart Study Tools' },
            { icon: '🎯', label: 'Goal Tracking' },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-white text-sm font-medium">{feature.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8 text-white/60 text-xs">
          <p>© 2026 StudyHub Uganda. Built with ❤️ for Ugandan learners.</p>
          <p className="mt-1">An initiative to support accessible education across Uganda.</p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex items-center bg-gray-50">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-6">
                {isLogin ? 'Sign in to continue your learning journey' : 'Join StudyHub Uganda today'}
              </p>

              {/* Error/Success Messages */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm"
                >
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g., Nakato Sarah"
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">School</label>
                      <div className="relative">
                        <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={school}
                          onChange={(e) => setSchool(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select your school</option>
                          {ugandanSchools.map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">Class / Grade</label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                        >
                          <option value="">Select your class</option>
                          {grades.map(g => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 via-red-500 to-black text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
                  className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>

              {/* Demo accounts */}
              {isLogin && (
                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-2">DEMO ACCOUNTS</p>
                  <div className="space-y-2">
                    <button
                      onClick={() => { setEmail('student@studyhub.ug'); setPassword('student123'); }}
                      className="w-full text-left p-2 rounded-lg hover:bg-gray-50 text-xs text-gray-600 transition-colors"
                    >
                      <span className="font-medium">Student:</span> student@studyhub.ug / student123
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Ownership indicator */}
          <div className="mt-8 text-center text-xs text-gray-400">
            <p>StudyHub Uganda v1.0 — Open Education Platform</p>
            <p className="mt-1">Designed for learners across Uganda 🇺🇬</p>
          </div>
        </div>
      </div>
    </div>
  );
}
