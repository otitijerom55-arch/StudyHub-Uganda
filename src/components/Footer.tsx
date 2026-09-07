import { useAuth } from '../context/AuthContext';
import { GraduationCap, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const { user } = useAuth();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 via-red-500 to-black rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">StudyHub Uganda</p>
              <p className="text-xs text-gray-500">Open Education Platform</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for Ugandan learners
            </span>
            <span>•</span>
            <span>🇺🇬 Made in Uganda</span>
            <span>•</span>
            <span>v1.0.0</span>
          </div>

          {/* User info */}
          {user && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{user.avatar}</span>
              <span>{user.name}</span>
              {user.role === 'admin' && (
                <span className="px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-medium">Admin</span>
              )}
              {user.school && (
                <span className="hidden md:inline text-gray-400">• {user.school}</span>
              )}
            </div>
          )}
        </div>

        {/* Ownership & Attribution */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400 text-center md:text-left">
            © 2026 StudyHub Uganda. An open education initiative. All educational content is freely available.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <a href="https://www.moe.go.ug" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              MoES <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.uneb.go.ug" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              UNEB <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.kolibri.tech" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-1 transition-colors">
              Kolibri <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
