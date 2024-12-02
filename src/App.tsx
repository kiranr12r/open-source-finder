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

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'React Starter',
    description: 'A simple starter project for React.js.',
    language: 'JavaScript',
    stars: 120,
    forks: 45,
    issues: 3,
    tags: ['React', 'Beginner'],
    repoUrl: 'https://github.com/example/react-starter',
  },
  {
    id: 2,
    title: 'Node API',
    description: 'A basic Node.js API template.',
    language: 'JavaScript',
    stars: 95,
    forks: 30,
    issues: 5,
    tags: ['Node.js', 'Backend'],
    repoUrl: 'https://github.com/example/node-api',
  },
  {
    id: 3,
    title: 'Python CLI Tool',
    description: 'A CLI tool written in Python for automation.',
    language: 'Python',
    stars: 80,
    forks: 25,
    issues: 2,
    tags: ['Python', 'CLI'],
    repoUrl: 'https://github.com/example/python-cli',
  },
  {
    id: 4,
    title: 'CSS Framework',
    description: 'A lightweight CSS framework for responsive design.',
    language: 'CSS',
    stars: 200,
    forks: 70,
    issues: 8,
    tags: ['CSS', 'Frontend'],
    repoUrl: 'https://github.com/example/css-framework',
  },
  {
    id: 5,
    title: 'Data Visualizer',
    description: 'A project for visualizing data using D3.js.',
    language: 'JavaScript',
    stars: 150,
    forks: 60,
    issues: 4,
    tags: ['D3.js', 'Visualization'],
    repoUrl: 'https://github.com/example/data-visualizer',
  },
  {
    id: 6,
    title: 'Flask Blog',
    description: 'A blogging platform built with Flask.',
    language: 'Python',
    stars: 110,
    forks: 40,
    issues: 3,
    tags: ['Python', 'Flask', 'Web'],
    repoUrl: 'https://github.com/example/flask-blog',
  },
  {
    id: 7,
    title: 'Docker Boilerplate',
    description: 'A boilerplate for containerized applications using Docker.',
    language: 'Shell',
    stars: 90,
    forks: 35,
    issues: 6,
    tags: ['Docker', 'DevOps'],
    repoUrl: 'https://github.com/example/docker-boilerplate',
  },
  {
    id: 8,
    title: 'Vue Todo App',
    description: 'A simple to-do application built with Vue.js.',
    language: 'JavaScript',
    stars: 130,
    forks: 50,
    issues: 2,
    tags: ['Vue.js', 'Frontend'],
    repoUrl: 'https://github.com/example/vue-todo-app',
  },
  {
    id: 9,
    title: 'Rust Game Engine',
    description: 'A basic 2D game engine in Rust.',
    language: 'Rust',
    stars: 75,
    forks: 20,
    issues: 10,
    tags: ['Rust', 'Game Development'],
    repoUrl: 'https://github.com/example/rust-game-engine',
  },
  {
    id: 10,
    title: 'Machine Learning Toolkit',
    description: 'A collection of machine learning tools and algorithms.',
    language: 'Python',
    stars: 220,
    forks: 85,
    issues: 5,
    tags: ['Machine Learning', 'AI', 'Python'],
    repoUrl: 'https://github.com/example/ml-toolkit',
  },
  {
    id: 11,
    title: 'GraphQL API',
    description: 'A GraphQL API starter for building scalable backends.',
    language: 'JavaScript',
    stars: 105,
    forks: 40,
    issues: 4,
    tags: ['GraphQL', 'Backend'],
    repoUrl: 'https://github.com/example/graphql-api',
  },
  {
    id: 12,
    title: 'Chat Application',
    description: 'A real-time chat app using WebSocket and Node.js.',
    language: 'JavaScript',
    stars: 140,
    forks: 60,
    issues: 6,
    tags: ['Node.js', 'WebSocket', 'Chat'],
    repoUrl: 'https://github.com/example/chat-application',
  },
  {
    id: 13,
    title: 'Portfolio Template',
    description: 'A sleek and modern portfolio template.',
    language: 'HTML',
    stars: 180,
    forks: 70,
    issues: 3,
    tags: ['HTML', 'CSS', 'Portfolio'],
    repoUrl: 'https://github.com/example/portfolio-template',
  },
  {
    id: 14,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce application.',
    language: 'JavaScript',
    stars: 250,
    forks: 90,
    issues: 8,
    tags: ['React', 'Node.js', 'E-Commerce'],
    repoUrl: 'https://github.com/example/e-commerce-platform',
  },
  {
    id: 15,
    title: 'Java Algorithms',
    description: 'A collection of classic algorithms implemented in Java.',
    language: 'Java',
    stars: 85,
    forks: 30,
    issues: 2,
    tags: ['Java', 'Algorithms'],
    repoUrl: 'https://github.com/example/java-algorithms',
  },
  {
    id: 16,
    title: 'React Native Starter',
    description: 'A starter project for building React Native apps.',
    language: 'JavaScript',
    stars: 125,
    forks: 50,
    issues: 3,
    tags: ['React Native', 'Mobile'],
    repoUrl: 'https://github.com/example/react-native-starter',
  },
  {
    id: 17,
    title: 'Go Web Server',
    description: 'A lightweight web server built in Go.',
    language: 'Go',
    stars: 100,
    forks: 40,
    issues: 5,
    tags: ['Go', 'Web Server'],
    repoUrl: 'https://github.com/example/go-web-server',
  },
  {
    id: 18,
    title: 'Kotlin Weather App',
    description: 'A weather app built with Kotlin and Jetpack Compose.',
    language: 'Kotlin',
    stars: 90,
    forks: 35,
    issues: 4,
    tags: ['Kotlin', 'Mobile', 'Weather'],
    repoUrl: 'https://github.com/example/kotlin-weather-app',
  },
  {
    id: 19,
    title: 'Blockchain Wallet',
    description: 'A cryptocurrency wallet implemented in Rust.',
    language: 'Rust',
    stars: 75,
    forks: 20,
    issues: 7,
    tags: ['Rust', 'Blockchain'],
    repoUrl: 'https://github.com/example/blockchain-wallet',
  },
  {
    id: 20,
    title: 'AI Chatbot',
    description: 'An AI-powered chatbot for customer service.',
    language: 'Python',
    stars: 300,
    forks: 100,
    issues: 12,
    tags: ['AI', 'Chatbot', 'Python'],
    repoUrl: 'https://github.com/example/ai-chatbot',
  },
  {
    id: 21,
    title: 'React Admin Dashboard',
    description: 'A customizable admin dashboard template.',
    language: 'JavaScript',
    stars: 210,
    forks: 80,
    issues: 5,
    tags: ['React', 'Dashboard'],
    repoUrl: 'https://github.com/example/react-admin-dashboard',
  },
  {
    id: 22,
    title: 'Spring Boot Blog',
    description: 'A blogging platform built with Spring Boot.',
    language: 'Java',
    stars: 120,
    forks: 50,
    issues: 6,
    tags: ['Java', 'Spring Boot', 'Web'],
    repoUrl: 'https://github.com/example/spring-boot-blog',
  },
  {
    id: 23,
    title: 'Web Scraper',
    description: 'A Python tool for scraping web data.',
    language: 'Python',
    stars: 140,
    forks: 55,
    issues: 3,
    tags: ['Python', 'Web Scraping'],
    repoUrl: 'https://github.com/example/web-scraper',
  },
  {
    id: 24,
    title: 'OpenCV Image Processing',
    description: 'A collection of image processing algorithms using OpenCV.',
    language: 'Python',
    stars: 160,
    forks: 65,
    issues: 7,
    tags: ['Python', 'OpenCV', 'Image Processing'],
    repoUrl: 'https://github.com/example/opencv-image-processing',
  },
  {
    id: 25,
    title: 'Tailwind Components',
    description: 'Pre-built UI components using Tailwind CSS.',
    language: 'CSS',
    stars: 230,
    forks: 85,
    issues: 4,
    tags: ['Tailwind CSS', 'Frontend'],
    repoUrl: 'https://github.com/example/tailwind-components',
  },
];


function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    const loadProjects = () => {
      setLoading(true);
      setTimeout(() => {
        setProjects(MOCK_PROJECTS);
        setLanguages([...new Set(MOCK_PROJECTS.map((project) => project.language))]);
        setLoading(false);
      }, 1000); // Simulate a delay
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = selectedLanguage ? project.language === selectedLanguage : true;
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

        {loading ? (
          <div className="mt-8 text-center text-gray-600">
            Loading projects...
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}

        {!loading && filteredProjects.length === 0 && (
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
