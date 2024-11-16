import React, { useState } from 'react';
import { GithubIcon, Code2, Users } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import FilterBar from './components/FilterBar';

// Sample data - in a real app, this would come from an API
const projects = [
  {
    title: 'First Contributions',
    description: 'A project to help beginners contribute to open source. Make your first contribution in 5 minutes.',
    language: 'JavaScript',
    stars: 29000,
    forks: 53000,
    issues: 54,
    tags: ['beginner-friendly', 'hacktoberfest', 'good-first-issue'],
    repoUrl: 'https://github.com/firstcontributions/first-contributions'
  },
  {
    title: 'TensorFlow',
    description: 'An open source machine learning framework for everyone',
    language: 'Python',
    stars: 178000,
    forks: 89000,
    issues: 2341,
    tags: ['machine-learning', 'ai', 'deep-learning'],
    repoUrl: 'https://github.com/tensorflow/tensorflow'
  },
  {
    title: 'VS Code',
    description: 'Visual Studio Code - Open source code editor by Microsoft',
    language: 'TypeScript',
    stars: 154000,
    forks: 28000,
    issues: 7821,
    tags: ['editor', 'developer-tools', 'microsoft'],
    repoUrl: 'https://github.com/microsoft/vscode'
  }
];

const languages = ['JavaScript', 'Python', 'TypeScript', 'Java', 'Go', 'Rust'];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
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