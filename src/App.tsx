import { GithubIcon, Code2, Users } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLanguagesAndProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://backend-api-brown-nine.vercel.app/');
        const fetchedProjects: Project[] = response.data;
  
        // Extract unique languages
        const extractedLanguages = Array.from(
          new Set(
            fetchedProjects
              .map((project) => project.language) // Extract language field
              .filter((language) => language && language.trim() !== '') // Remove invalid values
          )
        );
  
        setLanguages(extractedLanguages);
        setProjects(fetchedProjects);
        setError('');
      } catch (err) {
        setError('Failed to load projects or languages');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLanguagesAndProjects();
  }, []);
  
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

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
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {!loading && !error && filteredProjects.length === 0 && (
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
