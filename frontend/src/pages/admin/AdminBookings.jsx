import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

const statusOptions = ['pending', 'confirmed', 'cancelled'];

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadBookings();
    }, []);

    function loadBookings() {
        setLoading(true);
        api
            .get('/admin/bookings')
            .then((res) => setBookings(res.data))
            .catch(() => setError('Could not load bookings'))
            .finally(() => setLoading(false));
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
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-10">
                <h1 className="font-display italic text-4xl">Bookings</h1>
            </div>

            {loading && <p className="text-sm text-[--ink]/60">Loading...</p>}
            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}

            {!loading && bookings.length === 0 && (
                <p className="text-sm text-[--ink]/60">No bookings yet.</p>
            )}

            {!loading && bookings.length > 0 && (
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
        </AdminLayout>
    );
}