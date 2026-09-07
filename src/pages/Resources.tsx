import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Search, Tag, Star } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  starred: boolean;
  type: 'video' | 'article' | 'tool' | 'course';
}

const initialResources: Resource[] = [
  { id: 1, title: 'Khan Academy', description: 'Free world-class education in math, science, and more', category: 'Courses', tags: ['math', 'science', 'free'], url: 'https://www.khanacademy.org', starred: true, type: 'course' },
  { id: 2, title: 'MIT OpenCourseWare', description: 'Free lecture notes, exams, and videos from MIT', category: 'Courses', tags: ['engineering', 'science', 'university'], url: 'https://ocw.mit.edu', starred: true, type: 'course' },
  { id: 3, title: 'Wolfram Alpha', description: 'Computational intelligence for math and science problems', category: 'Tools', tags: ['math', 'calculator', 'problem-solving'], url: 'https://www.wolframalpha.com', starred: false, type: 'tool' },
  { id: 4, title: 'CrashCourse', description: 'Engaging educational videos on various subjects', category: 'Videos', tags: ['history', 'science', 'literature'], url: 'https://www.youtube.com/c/crashcourse', starred: false, type: 'video' },
  { id: 5, title: 'Purdue OWL', description: 'Comprehensive writing and citation resources', category: 'Tools', tags: ['writing', 'citations', 'english'], url: 'https://owl.purdue.edu', starred: true, type: 'tool' },
  { id: 6, title: 'Coursera', description: 'Online courses from top universities worldwide', category: 'Courses', tags: ['various', 'certificates', 'university'], url: 'https://www.coursera.org', starred: false, type: 'course' },
  { id: 7, title: 'Quizlet', description: 'Create and study flashcards for any subject', category: 'Tools', tags: ['flashcards', 'memorization', 'study'], url: 'https://quizlet.com', starred: true, type: 'tool' },
  { id: 8, title: 'Google Scholar', description: 'Search academic papers and articles', category: 'Research', tags: ['papers', 'academic', 'research'], url: 'https://scholar.google.com', starred: false, type: 'article' },
  { id: 9, title: 'Desmos', description: 'Advanced graphing calculator for mathematics', category: 'Tools', tags: ['math', 'graphing', 'visualization'], url: 'https://www.desmos.com/calculator', starred: false, type: 'tool' },
  { id: 10, title: 'edX', description: 'Free courses from Harvard, MIT, and 160+ institutions', category: 'Courses', tags: ['university', 'free', 'certificates'], url: 'https://www.edx.org', starred: false, type: 'course' },
  { id: 11, title: 'Grammarly', description: 'AI-powered writing assistant for grammar and style', category: 'Tools', tags: ['writing', 'english', 'grammar'], url: 'https://www.grammarly.com', starred: false, type: 'tool' },
  { id: 12, title: '3Blue1Brown', description: 'Beautiful math visualizations and explanations', category: 'Videos', tags: ['math', 'visualization', 'calculus'], url: 'https://www.3blue1brown.com', starred: true, type: 'video' },
];

const typeColors: Record<string, string> = {
  video: 'bg-red-100 text-red-700',
  article: 'bg-blue-100 text-blue-700',
  tool: 'bg-green-100 text-green-700',
  course: 'bg-purple-100 text-purple-700',
};

const typeIcons: Record<string, string> = {
  video: '🎬',
  article: '📄',
  tool: '🔧',
  course: '🎓',
};

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showStarred, setShowStarred] = useState(false);

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || r.category === selectedCategory;
    const matchesStarred = !showStarred || r.starred;
    return matchesSearch && matchesCategory && matchesStarred;
  });

  const toggleStar = (id: number) => {
    setResources(resources.map(r => r.id === id ? { ...r, starred: !r.starred } : r));
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Resources</h1>
        <p className="text-gray-500 mt-1">Curated study resources and learning tools</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowStarred(!showStarred)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
            showStarred ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
        >
          <Star className={`w-4 h-4 ${showStarred ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          Starred
        </button>
      </div>

      {/* Category Tabs */}
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

      {/* Resource Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource, i) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[resource.type]}`}>
                {typeIcons[resource.type]} {resource.type}
              </span>
              <button
                onClick={() => toggleStar(resource.id)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Star className={`w-4 h-4 ${resource.starred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{resource.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
                title={`Open ${resource.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>No resources found. Try a different search or category.</p>
        </div>
      )}
    </div>
  );
}
