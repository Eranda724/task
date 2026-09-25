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
            <h1 className="font-display italic text-3xl mb-6">Bookings</h1>

            {loading && <p className="text-sm text-[--ink]/60">Loading...</p>}
            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}

            {!loading && bookings.length === 0 && (
                <p className="text-sm text-[--ink]/60">No bookings yet.</p>
            )}

            {!loading && bookings.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="text-left border-b border-[--ink]/20">
                                <th className="py-3 pr-4">Guest</th>
                                <th className="py-3 pr-4">Room</th>
                                <th className="py-3 pr-4">Check-in</th>
                                <th className="py-3 pr-4">Check-out</th>
                                <th className="py-3 pr-4">Guests</th>
                                <th className="py-3 pr-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((b) => (
                                <tr key={b._id} className="border-b border-[--ink]/10">
                                    <td className="py-3 pr-4">
                                        <p>{b.guestName}</p>
                                        <p className="text-[--ink]/50 text-xs">{b.email}</p>
                                    </td>
                                    <td className="py-3 pr-4">{b.room?.name || '—'}</td>
                                    <td className="py-3 pr-4">{formatDate(b.checkIn)}</td>
                                    <td className="py-3 pr-4">{formatDate(b.checkOut)}</td>
                                    <td className="py-3 pr-4">{b.guests}</td>
                                    <td className="py-3 pr-4">
                                        <select
                                            value={b.status}
                                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                                            className="border border-[--ink]/30 bg-transparent px-2 py-1 text-sm"
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s} value={s}>
                                                    {s}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}