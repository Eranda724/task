import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

const statusOptions = ['pending', 'confirmed', 'cancelled'];

function StatCard({ label, value }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300">
            <p className="text-xs font-semibold text-[--ink] opacity-40 uppercase tracking-widest">{label}</p>
            <p className="font-display italic text-4xl mt-3 text-[--moss]">{value}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    useEffect(() => {
        api
            .get('/admin/stats')
            .then((res) => setStats(res.data))
            .catch(() => setError('Could not load dashboard'));
            
        loadBookings();
    }, []);

    function loadBookings() {
        setLoadingBookings(true);
        api
            .get('/admin/bookings')
            .then((res) => setBookings(res.data))
            .catch(() => setError('Could not load bookings'))
            .finally(() => setLoadingBookings(false));
    }

    async function handleStatusChange(id, status) {
        try {
            const res = await api.patch(`/admin/bookings/${id}/status`, { status });
            setBookings((prev) => prev.map((b) => (b._id === id ? res.data : b)));
        } catch {
            setError('Could not update that booking');
        }
    }

    function formatDate(d) {
        return new Date(d).toLocaleDateString('en-AU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-10">
                <h1 className="font-display italic text-4xl">Dashboard</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6 text-sm">
                    {error}
                </div>
            )}

            {!stats && !error && (
                <div className="animate-pulse grid md:grid-cols-4 gap-6 mb-12">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-black/5 rounded-2xl h-32 w-full"></div>
                    ))}
                </div>
            )}

            {stats && (
                <>
                    <div className="grid md:grid-cols-4 gap-6 mb-14">
                        <StatCard label="Occupancy today" value={`${stats.occupancyRate}%`} />
                        <StatCard label="Revenue this month" value={`$${stats.revenueThisMonth.toLocaleString()}`} />
                        <StatCard label="Pending bookings" value={stats.pendingCount} />
                        <StatCard label="Active rooms" value={stats.totalRooms} />
                    </div>

                    <h2 className="font-display italic text-3xl mb-6">Bookings</h2>
                    {loadingBookings ? (
                        <p className="text-sm text-[--ink]/60">Loading bookings...</p>
                    ) : bookings.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5">
                            <p className="text-[15px] text-[--ink] opacity-50">No bookings yet.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-[15px] border-collapse">
                                    <thead>
                                        <tr className="text-left border-b border-black/5 bg-black/[0.02]">
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm">Guest</th>
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm">Room</th>
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm">Check-in</th>
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm">Check-out</th>
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm text-center">Guests</th>
                                            <th className="py-4 px-6 font-semibold text-[--ink] opacity-60 text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((b, index) => (
                                            <tr 
                                                key={b._id} 
                                                className={`hover:bg-black/[0.02] transition-colors ${
                                                    index !== bookings.length - 1 ? 'border-b border-black/5' : ''
                                                }`}
                                            >
                                                <td className="py-4 px-6">
                                                    <p className="font-medium">{b.guestName}</p>
                                                    <p className="text-[--ink] opacity-50 text-xs mt-0.5">{b.email}</p>
                                                </td>
                                                <td className="py-4 px-6 text-[--ink] opacity-80">{b.room?.name || '-'}</td>
                                                <td className="py-4 px-6 text-[--ink] opacity-80">{formatDate(b.checkIn)}</td>
                                                <td className="py-4 px-6 text-[--ink] opacity-80">{formatDate(b.checkOut)}</td>
                                                <td className="py-4 px-6 text-center text-[--ink] opacity-80">{b.guests}</td>
                                                <td className="py-4 px-6">
                                                    <select
                                                        value={b.status}
                                                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                                        className={`border border-black/10 rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-colors ${
                                                            b.status === 'confirmed' ? 'bg-[--sage]/10 text-[--moss] border-[--sage]/20' : 
                                                            b.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' : 
                                                            'bg-gray-50 text-gray-700'
                                                        }`}
                                                    >
                                                        {statusOptions.map((s) => (
                                                            <option key={s} value={s}>
                                                                {s.charAt(0).toUpperCase() + s.slice(1)}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
}