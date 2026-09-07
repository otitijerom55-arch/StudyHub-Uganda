import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, TrendingUp, Settings, Shield, Activity, BarChart3, Database, Trash2, UserCheck, GraduationCap, School } from 'lucide-react';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  joinedDate: string;
  status: 'active' | 'inactive';
}

const defaultStudents: StudentRecord[] = [
  { id: 'student-001', name: 'Nakato Sarah', email: 'student@studyhub.ug', school: 'Makerere College School', grade: 'Senior 4', joinedDate: '2026-01-15', status: 'active' },
  { id: 'student-002', name: 'Mugisha David', email: 'david@studyhub.ug', school: "King's College Budo", grade: 'Senior 6', joinedDate: '2026-01-20', status: 'active' },
  { id: 'student-003', name: 'Auma Grace', email: 'grace@studyhub.ug', school: 'Nabisunsa Girls School', grade: 'Senior 5', joinedDate: '2026-02-01', status: 'active' },
  { id: 'student-004', name: 'Opio James', email: 'james@studyhub.ug', school: 'Gayaza High School', grade: 'Senior 3', joinedDate: '2026-02-10', status: 'active' },
  { id: 'student-005', name: 'Namukasa Faith', email: 'faith@studyhub.ug', school: 'Mount Saint Mary\'s Namagunga', grade: 'Senior 6', joinedDate: '2026-02-15', status: 'inactive' },
  { id: 'student-006', name: 'Ssekandi Peter', email: 'peter@studyhub.ug', school: 'St. Mary\'s College Kisubi', grade: 'Senior 4', joinedDate: '2026-03-01', status: 'active' },
];

export default function AdminDashboard() {
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'analytics' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const registered = JSON.parse(localStorage.getItem('studyhub_students') || '[]');
    const allStudents = [...defaultStudents, ...registered.map((s: { id: string; name: string; email: string; school: string; grade: string }) => ({
      ...s,
      joinedDate: '2026-03-15',
      status: 'active' as const,
    }))];
    setStudents(allStudents);
  }, []);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.school.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter(s => s.status === 'active').length,
    totalResources: 24,
    avgStudyHours: 12.5,
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const toggleStudentStatus = (id: string) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' } : s
    ));
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-red-600" />
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">ADMIN</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage users, content, and platform settings</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-xl">
            <Activity className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">System Online</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'students', label: 'Students', icon: Users },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600 bg-blue-50' },
              { label: 'Active Students', value: stats.activeStudents, icon: UserCheck, color: 'text-green-600 bg-green-50' },
              { label: 'Resources Available', value: stats.totalResources, icon: BookOpen, color: 'text-purple-600 bg-purple-50' },
              { label: 'Avg Study Hours', value: `${stats.avgStudyHours}h`, icon: TrendingUp, color: 'text-orange-600 bg-orange-50' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'New student registered', detail: 'Opio James from Gayaza High School', time: '2 hours ago' },
                  { action: 'Resource added', detail: 'Cognito.org added to resources', time: '5 hours ago' },
                  { action: 'Student completed goal', detail: 'Nakato Sarah finished Math flashcards', time: '1 day ago' },
                  { action: 'System update', detail: 'Added UNEB past papers section', time: '2 days ago' },
                  { action: 'New student registered', detail: 'Ssekandi Peter from SMCK', time: '3 days ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.detail}</p>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-purple-600" />
                Platform Stats
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Flashcards Created', value: 342, max: 500, color: 'bg-blue-500' },
                  { label: 'Study Sessions', value: 1247, max: 2000, color: 'bg-green-500' },
                  { label: 'Tasks Completed', value: 856, max: 1000, color: 'bg-purple-500' },
                  { label: 'Goals Set', value: 124, max: 200, color: 'bg-orange-500' },
                  { label: 'Resources Used', value: 2100, max: 3000, color: 'bg-pink-500' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium text-gray-900">{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / item.max) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search students by name, email, or school..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{filteredStudents.length} students</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Student</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">School</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Class</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Joined</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-sm text-gray-600">{student.school}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{student.grade}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          student.status === 'active'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-50 text-gray-500 border border-gray-200'
                        }`}>
                          {student.status === 'active' ? '● Active' : '○ Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{student.joinedDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleStudentStatus(student.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                            title={student.status === 'active' ? 'Deactivate' : 'Activate'}
                          >
                            <UserCheck className={`w-4 h-4 ${student.status === 'active' ? 'text-green-600' : 'text-gray-400'}`} />
                          </button>
                          <button
                            onClick={() => removeStudent(student.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove student"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredStudents.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>No students found.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Subject Popularity</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', students: 89, color: 'bg-blue-500' },
                  { subject: 'Physics', students: 72, color: 'bg-purple-500' },
                  { subject: 'Chemistry', students: 65, color: 'bg-green-500' },
                  { subject: 'Biology', students: 58, color: 'bg-pink-500' },
                  { subject: 'English Language', students: 95, color: 'bg-orange-500' },
                  { subject: 'History', students: 42, color: 'bg-yellow-500' },
                  { subject: 'Geography', students: 38, color: 'bg-teal-500' },
                  { subject: 'Computer Studies', students: 67, color: 'bg-indigo-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-32">{item.subject}</span>
                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.students / 100) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8">{item.students}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">School Distribution</h3>
              <div className="space-y-3">
                {[
                  { school: 'Makerere College School', count: 12 },
                  { school: "King's College Budo", count: 9 },
                  { school: 'Nabisunsa Girls School', count: 8 },
                  { school: 'Gayaza High School', count: 7 },
                  { school: "St. Mary's College Kisubi", count: 6 },
                  { school: 'Mount Saint Mary\'s Namagunga', count: 5 },
                  { school: 'Other schools', count: 15 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-2">
                      <School className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{item.school}</span>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Weekly Activity</h3>
            <div className="flex items-end justify-between gap-2 h-48">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                const heights = [65, 80, 45, 90, 70, 30, 20];
                return (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      className="w-full bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t-lg"
                      initial={{ height: 0 }}
                      animate={{ height: `${heights[i]}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                    <span className="text-xs text-gray-500">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Platform Settings</h3>
            <div className="space-y-4">
              {[
                { label: 'Allow student registrations', description: 'New students can create accounts', enabled: true },
                { label: 'Enable flashcard sharing', description: 'Students can share flashcard decks', enabled: true },
                { label: 'Show study tips', description: 'Display motivational study tips', enabled: true },
                { label: 'Maintenance mode', description: 'Temporarily disable the platform', enabled: false },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{setting.label}</p>
                    <p className="text-xs text-gray-500">{setting.description}</p>
                  </div>
                  <div className={`w-12 h-7 rounded-full relative cursor-pointer transition-colors ${setting.enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${setting.enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Admin Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <Shield className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Jerome Otim</p>
                  <p className="text-xs text-gray-500">otitijerom55@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <GraduationCap className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Platform Administrator</p>
                  <p className="text-xs text-gray-500">Full access to all features</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                <Activity className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">StudyHub Uganda v1.0</p>
                  <p className="text-xs text-gray-500">Last updated: March 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
