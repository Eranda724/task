import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../lib/auth';

export default function AdminLayout({ children }) {
    const user = getUser();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/admin/login');
    }

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink] flex">
            <aside className="w-56 shrink-0 bg-[--moss] text-[--parchment] px-6 py-8 flex flex-col justify-between">
                <div>
                    <p className="font-display italic text-xl mb-10">Sri Ayu</p>
                    <nav className="flex flex-col gap-4 text-sm">
                        <Link to="/admin/dashboard" className="hover:text-[--ochre]">
                            Dashboard
                        </Link>
                        <Link to="/admin/bookings" className="hover:text-[--ochre]">
                            Bookings
                        </Link>
                        <Link to="/admin/rooms" className="hover:text-[--ochre]">
                            Rooms
                        </Link>
                        <Link to="/admin/content" className="hover:text-[--ochre]">
                            Content
                        </Link>
                        <Link to="/admin/staff" className="hover:text-[--ochre]">
                            Staff
                        </Link>
                        <Link to="/admin/settings" className="hover:text-[--ochre]">
                            Settings
                        </Link>
                    </nav>
                </div>
                <div className="text-sm">
                    <p className="text-[--parchment]/70 mb-2">{user?.name}</p>
                    <button onClick={handleLogout} className="underline underline-offset-4">
                        Log out
                    </button>
                </div>
            </aside>
            <main className="flex-1 px-8 py-10">{children}</main>
        </div>
    );
}