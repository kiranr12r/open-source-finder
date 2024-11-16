import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
    onSearchChange: (value: string) => void;
    onLanguageChange: (value: string) => void;
    languages: string[];
}

export default function FilterBar({
    onSearchChange,
    onLanguageChange,
    languages,
}: FilterBarProps) {
    return (
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <select
                        className="pl-10 pr-8 py-2 border border-gray-200 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => onLanguageChange(e.target.value)}
                    >
                        <option value="">All Languages</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}