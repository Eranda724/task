import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

const emptyForm = { name: '', description: '', pricePerNight: '', maxGuests: 2 };

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadRooms();
    }, []);

    function loadRooms() {
        setLoading(true);
        api
            .get('/admin/rooms')
            .then((res) => setRooms(res.data))
            .catch(() => setError('Could not load rooms'))
            .finally(() => setLoading(false));
    }

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleCreate(e) {
        e.preventDefault();
        try {
            const res = await api.post('/admin/rooms', form);
            setRooms((prev) => [res.data, ...prev]);
            setForm(emptyForm);
            setShowForm(false);
        } catch {
            setError('Could not create room');
        }
    }

    async function toggleActive(room) {
        try {
            const res = await api.patch(`/admin/rooms/${room._id}`, {
                isActive: !room.isActive,
            });
            setRooms((prev) => prev.map((r) => (r._id === room._id ? res.data : r)));
        } catch {
            setError('Could not update room');
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display italic text-3xl">Rooms & suites</h1>
                <button
                    onClick={() => setShowForm((s) => !s)}
                    className="bg-[--moss] text-[--parchment] px-4 py-2 text-sm hover:bg-[--ink] transition-colors"
                >
                    {showForm ? 'Cancel' : 'Add room'}
                </button>
            </div>

            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}

            {showForm && (
                <form onSubmit={handleCreate} className="ticket-border p-6 mb-8 grid gap-4 max-w-md">
                    <label className="text-sm">
                        Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm">
                        Description
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm">
                            Price per night
                            <input
                                type="number"
                                name="pricePerNight"
                                value={form.pricePerNight}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            />
                        </label>
                        <label className="text-sm">
                            Max guests
                            <input
                                type="number"
                                name="maxGuests"
                                value={form.maxGuests}
                                onChange={handleChange}
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                    >
                        Save room
                    </button>
                </form>
            )}

            {loading && <p className="text-sm text-[--ink]/60">Loading...</p>}

            {!loading && (
                <div className="grid md:grid-cols-2 gap-4">
                    {rooms.map((r) => (
                        <div key={r._id} className="ticket-border p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-display text-xl">{r.name}</p>
                                    <p className="text-sm text-[--clay] mt-1">
                                        ${r.pricePerNight} / night · {r.maxGuests} guests
                                    </p>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 border ${r.isActive
                                        ? 'border-[--sage] text-[--sage]'
                                        : 'border-[--clay] text-[--clay]'
                                        }`}
                                >
                                    {r.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {r.description && (
                                <p className="text-sm text-[--ink]/70 mt-3">{r.description}</p>
                            )}
                            <button
                                onClick={() => toggleActive(r)}
                                className="text-sm underline underline-offset-4 mt-4"
                            >
                                {r.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}