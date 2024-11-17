import { useState, useEffect } from 'react';
import { GithubIcon, Code2, Users } from 'lucide-react';
import ProjectCard from './components/ProjectCard/ProjectCard';
import FilterBar from './components/FilterBar';

interface Project {
  id: number;
  title: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  tags: string[];
  repoUrl: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/languages');
        if (!response.ok) throw new Error('Failed to fetch languages');
        const data = await response.json();
        setLanguages(data);
      } catch (err) {
        setError('Failed to load languages');
        console.error('Error fetching languages:', err);
      }
    };
    fetchLanguages();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedLanguage) params.append('language', selectedLanguage);
        
        const response = await fetch(`http://localhost:3000/api/projects?${params}`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
        setError('');
      } catch (err) {
        setError('Failed to load projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchQuery, selectedLanguage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Code2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">OpenSource Explorer</h1>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <GithubIcon className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Start Your Open Source Journey</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover beginner-friendly projects and make meaningful contributions to the open source community
            </p>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="text-blue-100">Join 5000+ contributors worldwide</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FilterBar
          onSearchChange={setSearchQuery}
          onLanguageChange={setSelectedLanguage}
          languages={languages}
        />
        
        {error && (
          <div className="mt-8 text-center text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 text-center text-gray-600">
            Loading projects...
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>Built with ❤️ for open source contributors</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;