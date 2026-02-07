import { SearchIcon, PanelLeft, FolderOpen, CheckSquare } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../features/themeSlice'
import { MoonIcon, SunIcon } from 'lucide-react'
import { UserButton } from '@clerk/clerk-react'
import { useState, useMemo, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setIsSidebarOpen }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector(state => state.theme);
    const { currentWorkspace } = useSelector(state => state.workspace);
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    const searchResults = useMemo(() => {
        if (!searchTerm.trim() || !currentWorkspace) return { projects: [], tasks: [] };
        const term = searchTerm.toLowerCase();
        const projects = (currentWorkspace.projects || []).filter(p =>
            p.name.toLowerCase().includes(term) || p.description?.toLowerCase().includes(term)
        ).slice(0, 5);
        const tasks = (currentWorkspace.projects || []).flatMap(p =>
            (p.tasks || []).filter(t =>
                t.title.toLowerCase().includes(term) || t.description?.toLowerCase().includes(term)
            ).map(t => ({ ...t, projectName: p.name }))
        ).slice(0, 5);
        return { projects, tasks };
    }, [searchTerm, currentWorkspace]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) setShowResults(false);
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="w-full bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 xl:px-16 py-3 flex-shrink-0">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Left section */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    {/* Sidebar Trigger */}
                    <button onClick={() => setIsSidebarOpen((prev) => !prev)} className="sm:hidden p-2 rounded-lg transition-colors text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800" >
                        <PanelLeft size={20} />
                    </button>

                    {/* Search Input */}
                    <div className="relative flex-1 max-w-sm" ref={searchRef}>
                        <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-400 size-3.5" />
                        <input
                            type="text"
                            placeholder="Search projects, tasks..."
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setShowResults(true); }}
                            onFocus={() => setShowResults(true)}
                            className="pl-8 pr-4 py-2 w-full bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                        {showResults && searchTerm.trim() && (searchResults.projects.length > 0 || searchResults.tasks.length > 0) && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
                                {searchResults.projects.length > 0 && (
                                    <div>
                                        <p className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase">Projects</p>
                                        {searchResults.projects.map(p => (
                                            <button key={p.id} onClick={() => { navigate(`/projectsDetail?id=${p.id}&tab=tasks`); setSearchTerm(''); setShowResults(false); }} className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left text-sm text-gray-900 dark:text-zinc-200">
                                                <FolderOpen className="size-4 text-blue-500" />
                                                <span className="truncate">{p.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                                {searchResults.tasks.length > 0 && (
                                    <div>
                                        <p className="px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase border-t border-gray-200 dark:border-zinc-700">Tasks</p>
                                        {searchResults.tasks.map(t => (
                                            <button key={t.id} onClick={() => { navigate(`/taskDetails?projectId=${t.projectId}&taskId=${t.id}`); setSearchTerm(''); setShowResults(false); }} className="w-full px-3 py-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-left text-sm text-gray-900 dark:text-zinc-200">
                                                <CheckSquare className="size-4 text-green-500" />
                                                <div className="min-w-0">
                                                    <span className="truncate block">{t.title}</span>
                                                    <span className="text-xs text-gray-500 dark:text-zinc-500">{t.projectName}</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {showResults && searchTerm.trim() && searchResults.projects.length === 0 && searchResults.tasks.length === 0 && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-md shadow-lg z-50 p-4 text-center text-sm text-gray-500 dark:text-zinc-400">
                                No results found
                            </div>
                        )}
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-3">

                    {/* Theme Toggle */}
                    <button onClick={() => dispatch(toggleTheme())} className="size-8 flex items-center justify-center bg-white dark:bg-zinc-800 shadow rounded-lg transition hover:scale-105 active:scale-95">
                        {
                            theme === "light"
                                ? (<MoonIcon className="size-4 text-gray-800 dark:text-gray-200" />)
                                : (<SunIcon className="size-4 text-yellow-400" />)
                        }
                    </button>

                    {/* User Button */}
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Navbar
