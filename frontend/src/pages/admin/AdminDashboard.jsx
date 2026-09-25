import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

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

                    <h2 className="font-display italic text-3xl mb-6">Arrivals - next 7 days</h2>
                    {stats.upcomingArrivals.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5">
                            <p className="text-[15px] text-[--ink] opacity-50">No arrivals scheduled for the next 7 days.</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden">
                            <div className="grid gap-0">
                                {stats.upcomingArrivals.map((b, index) => (
                                    <div
                                        key={b._id}
                                        className={`flex items-center justify-between p-6 hover:bg-black/[0.02] transition-colors ${
                                            index !== stats.upcomingArrivals.length - 1 ? 'border-b border-black/5' : ''
                                        }`}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="h-12 w-12 rounded-full bg-[--moss]/10 flex items-center justify-center text-[--moss] font-display text-xl">
                                                {b.guestName.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-[16px]">{b.guestName}</p>
                                                <p className="text-sm text-[--ink] opacity-50 mt-1">{b.room?.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block text-[13px] font-semibold text-[--ochre] bg-[--ochre]/10 px-4 py-1.5 rounded-full">
                                                {formatDate(b.checkIn)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
}