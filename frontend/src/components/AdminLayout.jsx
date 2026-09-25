import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUser, logout } from '../lib/auth';

export default function AdminLayout({ children }) {
    const user = getUser();
    const navigate = useNavigate();
    const location = useLocation();

    function handleLogout() {
        logout();
        navigate('/admin/login');
    }

    const navLinks = [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/treatments', label: 'Treatments' },
        { path: '/admin/rooms', label: 'Rooms' },
        { path: '/admin/content', label: 'Content' },
        { path: '/admin/staff', label: 'Staff' },
        { path: '/admin/settings', label: 'Settings' },
    ];

    return (
        <div className="min-h-screen bg-[#faf8f5] text-[--ink] flex font-sans">
            <aside className="w-64 shrink-0 bg-[#2B3A2A] text-[#EAE1CE] px-6 py-10 flex flex-col justify-between shadow-2xl relative z-10">
                <div>
                    <Link to="/admin/dashboard" className="block mb-12 px-3 opacity-90 hover:opacity-100 transition-opacity">
                        <img src="/logo.png" alt="Sri Ayu" className="h-8 md:h-10 w-auto brightness-0 invert" />
                    </Link>
                    <nav className="flex flex-col gap-1.5 text-[15px]">
                        {navLinks.map((link) => {
                            const isActive = location.pathname.startsWith(link.path);
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center tracking-wide ${
                                        isActive 
                                            ? 'bg-black/20 text-[#EAE1CE] font-medium shadow-sm border border-black/10' 
                                            : 'text-[#EAE1CE] opacity-70 hover:bg-black/10 hover:opacity-100 border border-transparent'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="text-sm px-4 pt-6 border-t border-black/20 mt-8">
                    <p className="text-[#EAE1CE] opacity-40 text-[11px] uppercase tracking-widest font-semibold mb-2">Account</p>
                    <p className="text-[#EAE1CE] font-medium mb-4 truncate" title={user?.name}>{user?.name}</p>
                    <button 
                        onClick={handleLogout} 
                        className="text-[#EAE1CE] opacity-60 hover:text-[--ochre] hover:opacity-100 transition-colors text-sm font-medium"
                    >
                        Sign out
                    </button>
                </div>
            </aside>
            <main className="flex-1 px-8 md:px-16 py-12 max-h-screen overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}