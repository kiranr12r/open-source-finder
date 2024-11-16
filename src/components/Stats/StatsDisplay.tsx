import { Star, GitFork, MessageCircle } from 'lucide-react';

interface StatsDisplayProps {
    stars: number;
    forks: number;
    issues: number;
}

export default function StatsDisplay({ stars, forks, issues }: StatsDisplayProps) {
    return (
        <div className="flex items-center gap-4 text-sm text-gray-600">
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
    );
}