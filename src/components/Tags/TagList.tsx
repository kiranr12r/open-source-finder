import React from 'react';

interface TagListProps {
    tags: string[];
}

export default function TagList({ tags }: TagListProps) {
    return (
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
    );
}