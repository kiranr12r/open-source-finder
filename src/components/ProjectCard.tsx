
import { Github, Star, GitFork, MessageCircle } from 'lucide-react';

interface ProjectCardProps {
    title: string;
    description: string;
    language: string;
    stars: number;
    forks: number;
    issues: number;
    tags: string[];
    repoUrl: string;
}

export default function ProjectCard({
    title,
    description,
    language,
    stars,
    forks,
    issues,
    tags,
    repoUrl,
}: ProjectCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-100">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                </div>
                <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                    View Repository →
                </a>
            </div>

            <p className="mt-3 text-gray-600">{description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full bg-${language.toLowerCase()}-500`} />
                    {language}
                </div>
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {stars}
                </div>
                <div className="flex items-center gap-1">
                    <GitFork className="w-4 h-4" />
                    {forks}
                </div>
                <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {issues} issues
                </div>
            </div>
        </div>
    );
}