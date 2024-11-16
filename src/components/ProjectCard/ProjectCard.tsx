import { Github } from 'lucide-react';
import StatsDisplay from '../Stats/StatsDisplay';
import TagList from '../Tags/TagList';

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

            <TagList tags={tags} />

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                    <div className={`w-3 h-3 rounded-full bg-${language}-500`} />
                    {language}
                </div>
                <StatsDisplay stars={stars} forks={forks} issues={issues} />
            </div>
        </div>
    );
}