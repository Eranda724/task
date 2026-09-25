import { getUser, logout } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminHome() {
    const user = getUser();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/admin/login');
    }

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink] px-6 md:px-12 py-10">
            <div className="flex items-center justify-between mb-8">
                <p className="font-display italic text-2xl">Welcome, {user?.name}</p>
                <button onClick={handleLogout} className="text-sm underline underline-offset-4">
                    Log out
                </button>
            </div>
            <p className="text-sm text-[--ink]/70">
                Bookings management, room management, and reporting go here next.
            </p>
        </div>
    );
}