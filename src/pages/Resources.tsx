import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Search, Star, Globe, Library, GraduationCap } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  starred: boolean;
  type: 'video' | 'article' | 'tool' | 'course' | 'library' | 'platform';
  featured?: boolean;
}

const initialResources: Resource[] = [
  // Featured - Uganda & Africa
  { id: 1, title: 'Cognito', description: 'Interactive video lessons for Maths, Physics, Chemistry & Biology — perfect for UNEB preparation', category: 'Learning Platforms', tags: ['maths', 'science', 'videos', 'UNEB'], url: 'https://cognito.org', starred: true, type: 'platform', featured: true },
  { id: 2, title: 'Kolibri (Learning Equality)', description: 'Offline-capable educational platform designed for low-resource environments across Africa', category: 'Learning Platforms', tags: ['offline', 'africa', 'free', 'courses'], url: 'https://learningequality.org/kolibri/', starred: true, type: 'platform', featured: true },
  { id: 3, title: 'UNEB Past Papers', description: 'Uganda National Examinations Board — official past papers and examination resources', category: 'Uganda Education', tags: ['UNEB', 'exams', 'past papers', 'official'], url: 'https://www.uneb.go.ug', starred: true, type: 'platform', featured: true },
  { id: 4, title: 'Uganda Ministry of Education', description: 'Official curriculum guidelines, syllabi, and education policies for Uganda', category: 'Uganda Education', tags: ['curriculum', 'government', 'syllabus', 'MoES'], url: 'https://www.moe.go.ug', starred: true, type: 'platform', featured: true },

  // Free & Open Learning Sources
  { id: 5, title: 'Khan Academy', description: 'Free world-class education in math, science, computing, and more — with Ugandan-relevant content', category: 'Courses', tags: ['math', 'science', 'free', 'UNEB'], url: 'https://www.khanacademy.org', starred: true, type: 'course' },
  { id: 6, title: 'MIT OpenCourseWare', description: 'Free lecture notes, exams, and videos from MIT — excellent for advanced science students', category: 'Courses', tags: ['engineering', 'science', 'university', 'free'], url: 'https://ocw.mit.edu', starred: true, type: 'course' },
  { id: 7, title: 'OpenStax', description: 'Free, peer-reviewed, openly licensed textbooks for college and high school courses', category: 'Open Textbooks', tags: ['textbooks', 'free', 'open source', 'PDF'], url: 'https://openstax.org', starred: true, type: 'library' },
  { id: 8, title: 'CK-12 Foundation', description: 'Free K-12 STEM content including adaptive practice, simulations, and interactive textbooks', category: 'Courses', tags: ['STEM', 'interactive', 'free', 'simulations'], url: 'https://www.ck12.org', starred: false, type: 'course' },
  { id: 9, title: 'LibreTexts', description: 'Open-access textbook platform with multi-institutional collaborative content', category: 'Open Textbooks', tags: ['textbooks', 'open access', 'collaborative', 'free'], url: 'https://libretexts.org', starred: false, type: 'library' },
  { id: 10, title: 'PhET Interactive Simulations', description: 'Free interactive math and science simulations from University of Colorado', category: 'Tools', tags: ['simulations', 'physics', 'chemistry', 'interactive'], url: 'https://phet.colorado.edu', starred: true, type: 'tool' },
  { id: 11, title: 'Coursera', description: 'Online courses from top universities — many available for free with financial aid', category: 'Courses', tags: ['university', 'certificates', 'financial aid'], url: 'https://www.coursera.org', starred: false, type: 'course' },
  { id: 12, title: 'edX', description: 'Free courses from Harvard, MIT, and 160+ institutions worldwide', category: 'Courses', tags: ['university', 'free', 'certificates', 'MOOC'], url: 'https://www.edx.org', starred: false, type: 'course' },
  { id: 13, title: 'CrashCourse', description: 'Engaging educational videos covering history, science, literature, and more', category: 'Videos', tags: ['history', 'science', 'literature', 'YouTube'], url: 'https://thecrashcourse.com', starred: false, type: 'video' },
  { id: 14, title: '3Blue1Brown', description: 'Beautiful mathematical visualizations — excellent for understanding complex concepts', category: 'Videos', tags: ['math', 'visualization', 'calculus', 'linear algebra'], url: 'https://www.3blue1brown.com', starred: true, type: 'video' },

  // Open Libraries
  { id: 15, title: 'Open Library', description: 'Open, editable library catalog — borrow and read millions of books for free online', category: 'Open Libraries', tags: ['books', 'free', 'borrow', 'ebooks'], url: 'https://openlibrary.org', starred: true, type: 'library' },
  { id: 16, title: 'Project Gutenberg', description: 'Over 70,000 free eBooks — classic literature and reference works in the public domain', category: 'Open Libraries', tags: ['ebooks', 'classic', 'literature', 'free'], url: 'https://www.gutenberg.org', starred: true, type: 'library' },
  { id: 17, title: 'African Storybook', description: 'Free African children\'s stories in multiple languages including Luganda and Swahili', category: 'Open Libraries', tags: ['African', 'stories', 'Luganda', 'Swahili', 'children'], url: 'https://www.africanstorybook.org', starred: true, type: 'library' },
  { id: 18, title: 'Internet Archive', description: 'Non-profit digital library offering free access to books, audio, video, and software', category: 'Open Libraries', tags: ['archive', 'books', 'audio', 'video', 'free'], url: 'https://archive.org', starred: false, type: 'library' },
  { id: 19, title: 'Directory of Open Access Books (DOAB)', description: 'Peer-reviewed academic books published under open access licenses', category: 'Open Libraries', tags: ['academic', 'peer-reviewed', 'open access', 'scholarly'], url: 'https://www.doabooks.org', starred: false, type: 'library' },
  { id: 20, title: 'Bookboon', description: 'Free textbooks for university students in engineering, IT, and business', category: 'Open Libraries', tags: ['textbooks', 'engineering', 'business', 'free'], url: 'https://bookboon.com', starred: false, type: 'library' },

  // Tools
  { id: 21, title: 'Wolfram Alpha', description: 'Computational intelligence for solving math and science problems step-by-step', category: 'Tools', tags: ['math', 'calculator', 'problem-solving', 'step-by-step'], url: 'https://www.wolframalpha.com', starred: false, type: 'tool' },
  { id: 22, title: 'Desmos', description: 'Advanced free graphing calculator for mathematics — perfect for UNEB Math prep', category: 'Tools', tags: ['math', 'graphing', 'visualization', 'calculator'], url: 'https://www.desmos.com', starred: false, type: 'tool' },
  { id: 23, title: 'Purdue OWL', description: 'Comprehensive writing and citation resources for academic writing', category: 'Tools', tags: ['writing', 'citations', 'english', 'academic'], url: 'https://owl.purdue.edu', starred: false, type: 'tool' },
  { id: 24, title: 'Quizlet', description: 'Create and study flashcards for any subject — great for UNEB revision', category: 'Tools', tags: ['flashcards', 'memorization', 'study', 'UNEB'], url: 'https://quizlet.com', starred: false, type: 'tool' },
  { id: 25, title: 'Google Scholar', description: 'Search academic papers, articles, and theses for research projects', category: 'Research', tags: ['papers', 'academic', 'research', 'theses'], url: 'https://scholar.google.com', starred: false, type: 'tool' },
  { id: 26, title: 'Grammarly', description: 'AI-powered writing assistant for grammar, clarity, and style', category: 'Tools', tags: ['writing', 'english', 'grammar', 'AI'], url: 'https://www.grammarly.com', starred: false, type: 'tool' },
  { id: 27, title: 'Makerere University Library', description: 'Digital resources and research databases from Uganda\'s premier university', category: 'Uganda Education', tags: ['Makerere', 'university', 'research', 'databases'], url: 'https://library.mak.ac.ug', starred: true, type: 'library' },
  { id: 28, title: 'Funtech (Maths)', description: 'Fun maths learning platform with video lessons and practice problems', category: 'Learning Platforms', tags: ['maths', 'fun', 'practice', 'GCSE'], url: 'https://funtech.co.uk', starred: false, type: 'platform' },
];

const categories = ['All', 'Featured', 'Learning Platforms', 'Courses', 'Open Libraries', 'Open Textbooks', 'Tools', 'Videos', 'Research', 'Uganda Education'];

const typeColors: Record<string, string> = {
  video: 'bg-red-100 text-red-700',
  article: 'bg-blue-100 text-blue-700',
  tool: 'bg-green-100 text-green-700',
  course: 'bg-purple-100 text-purple-700',
  library: 'bg-amber-100 text-amber-700',
  platform: 'bg-indigo-100 text-indigo-700',
};

const typeIcons: Record<string, string> = {
  video: '🎬',
  article: '📄',
  tool: '🔧',
  course: '🎓',
  library: '📚',
  platform: '🌐',
};

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showStarred, setShowStarred] = useState(false);

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' ||
      (selectedCategory === 'Featured' ? r.featured : r.category === selectedCategory);
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Globe className="w-7 h-7 text-indigo-600" />
          Open Learning Resources
        </h1>
        <p className="text-gray-500 mt-1">Free and open educational resources for Ugandan students</p>
      </div>

      {/* Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-6 text-white"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              <span className="text-sm font-medium text-white/80">FEATURED RESOURCES</span>
            </div>
            <h2 className="text-xl font-bold mb-1">Free Open Education for Every Ugandan Student</h2>
            <p className="text-white/80 text-sm">Access world-class learning materials aligned with the UNEB curriculum — completely free.</p>
          </div>
          <div className="flex gap-3">
            <a href="https://cognito.org" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-indigo-700 rounded-xl text-sm font-semibold hover:bg-white/90 transition-colors flex items-center gap-1">
              Try Cognito <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/20 text-white rounded-xl text-sm font-semibold hover:bg-white/30 transition-colors flex items-center gap-1">
              Open Library <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources by name, topic, or tag..."
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
            {cat === 'Featured' && '⭐ '}
            {cat === 'Open Libraries' && <Library className="w-3 h-3 inline mr-1" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <p className="text-lg font-bold text-indigo-600">{resources.length}</p>
          <p className="text-xs text-gray-500">Total Resources</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <p className="text-lg font-bold text-green-600">{resources.filter(r => r.url.includes('free') || r.tags.includes('free')).length}</p>
          <p className="text-xs text-gray-500">100% Free</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
          <p className="text-lg font-bold text-purple-600">{resources.filter(r => r.type === 'library').length}</p>
          <p className="text-xs text-gray-500">Open Libraries</p>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource, i) => (
          <motion.a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all group block"
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[resource.type]}`}>
                {typeIcons[resource.type]} {resource.type}
              </span>
              <div className="flex items-center gap-1">
                {resource.featured && (
                  <span className="text-xs bg-yellow-50 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">⭐</span>
                )}
                <button
                  onClick={(e) => { e.preventDefault(); toggleStar(resource.id); }}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Star className={`w-4 h-4 ${resource.starred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}`} />
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{resource.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {resource.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p>No resources found. Try a different search or category.</p>
        </div>
      )}

      {/* Open Education Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100"
      >
        <div className="flex items-start gap-3">
          <GraduationCap className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">🌍 Open Education for Uganda</h3>
            <p className="text-sm text-gray-600 mb-3">
              All resources listed here are free and openly accessible. We believe every Ugandan student deserves access to quality educational materials regardless of their background or location.
            </p>
            <div className="flex flex-wrap gap-2">
              <a href="https://creativecommons.org/about/" target="_blank" rel="noopener noreferrer" className="text-xs bg-white px-3 py-1.5 rounded-full text-green-700 border border-green-200 hover:bg-green-50 transition-colors">
                Creative Commons ↗
              </a>
              <a href="https://oercommons.org" target="_blank" rel="noopener noreferrer" className="text-xs bg-white px-3 py-1.5 rounded-full text-green-700 border border-green-200 hover:bg-green-50 transition-colors">
                OER Commons ↗
              </a>
              <a href="https://unesco.org/en/open-educational-resources" target="_blank" rel="noopener noreferrer" className="text-xs bg-white px-3 py-1.5 rounded-full text-green-700 border border-green-200 hover:bg-green-50 transition-colors">
                UNESCO OER ↗
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
