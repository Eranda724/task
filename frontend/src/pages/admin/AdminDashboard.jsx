import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

function StatCard({ label, value }) {
    return (
        <div className="ticket-border p-6">
            <p className="text-sm text-[--ink]/60">{label}</p>
            <p className="font-display italic text-3xl mt-2">{value}</p>
        </div>
    );
}

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        api
            .get('/admin/stats')
            .then((res) => setStats(res.data))
            .catch(() => setError('Could not load dashboard'));
    }, []);

    function formatDate(d) {
        return new Date(d).toLocaleDateString('en-AU', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
        });
    }

    return (
        <AdminLayout>
            <h1 className="font-display italic text-3xl mb-6">Dashboard</h1>

            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}
            {!stats && !error && <p className="text-sm text-[--ink]/60">Loading...</p>}

            {stats && (
                <>
                    <div className="grid md:grid-cols-4 gap-4 mb-10">
                        <StatCard label="Occupancy today" value={`${stats.occupancyRate}%`} />
                        <StatCard label="Revenue this month" value={`$${stats.revenueThisMonth.toLocaleString()}`} />
                        <StatCard label="Pending bookings" value={stats.pendingCount} />
                        <StatCard label="Active rooms" value={stats.totalRooms} />
                    </div>

                    <h2 className="font-display italic text-2xl mb-4">Arrivals — next 7 days</h2>
                    {stats.upcomingArrivals.length === 0 ? (
                        <p className="text-sm text-[--ink]/60">No arrivals in the next 7 days.</p>
                    ) : (
                        <div className="grid gap-3">
                            {stats.upcomingArrivals.map((b) => (
                                <div
                                    key={b._id}
                                    className="flex items-center justify-between border-b border-[--ink]/10 pb-3 text-sm"
                                >
                                    <span>{b.guestName}</span>
                                    <span className="text-[--ink]/60">{b.room?.name}</span>
                                    <span className="text-[--clay]">{formatDate(b.checkIn)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
}