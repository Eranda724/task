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
    const [imageFile, setImageFile] = useState(null);
    const [editingRoomId, setEditingRoomId] = useState(null);

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

    function handleFileChange(e) {
        setImageFile(e.target.files[0]);
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('description', form.description);
            formData.append('pricePerNight', form.pricePerNight);
            formData.append('maxGuests', form.maxGuests);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            if (editingRoomId) {
                const res = await api.patch(`/admin/rooms/${editingRoomId}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setRooms((prev) => prev.map((r) => (r._id === editingRoomId ? res.data : r)));
            } else {
                const res = await api.post('/admin/rooms', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setRooms((prev) => [res.data, ...prev]);
            }
            setForm(emptyForm);
            setImageFile(null);
            setEditingRoomId(null);
            setShowForm(false);
        } catch {
            setError('Could not save room');
        }
    }
    
    function startEdit(room) {
        setForm({
            name: room.name,
            description: room.description,
            pricePerNight: room.pricePerNight,
            maxGuests: room.maxGuests
        });
        setImageFile(null);
        setEditingRoomId(room._id);
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setForm(emptyForm);
        setImageFile(null);
        setEditingRoomId(null);
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
                    onClick={() => {
                        if (showForm) {
                            handleCancel();
                        } else {
                            setForm(emptyForm);
                            setImageFile(null);
                            setEditingRoomId(null);
                            setShowForm(true);
                        }
                    }}
                    className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors rounded-sm"
                >
                    {showForm ? 'Cancel' : 'Add room'}
                </button>
            </div>

            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}

            {showForm && (
                <form onSubmit={handleSave} className="ticket-border p-6 mb-8 grid gap-4 max-w-md">
                    <div>
                        <span className="text-sm block mb-1">Room Image</span>
                        <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-black/[0.02] border-2 border-dashed border-[--ink]/20 rounded-sm cursor-pointer hover:border-[#4A6B53] hover:bg-[#4A6B53]/5 group">
                            <div className="flex flex-col items-center justify-center space-y-2 text-[--ink]/60 group-hover:text-[#4A6B53]">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                <span className="text-sm font-medium">
                                    {imageFile ? imageFile.name : 'Click to upload room photo'}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
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
                        className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors mt-4 rounded-sm"
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
                                <div className="flex gap-4">
                                    {r.image && (
                                        <img src={r.image} alt={r.name} className="h-16 w-16 object-cover rounded-sm" />
                                    )}
                                    <div>
                                        <p className="font-display text-xl">{r.name}</p>
                                        <p className="text-sm text-[--clay] mt-1">
                                            ${r.pricePerNight} / night · {r.maxGuests} guests
                                        </p>
                                    </div>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 border rounded-sm font-medium ${r.isActive
                                        ? 'border-sage text-sage bg-sage/10'
                                        : 'border-clay text-clay bg-clay/10'
                                        }`}
                                >
                                    {r.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {r.description && (
                                <p className="text-sm text-[--ink]/70 mt-3">{r.description}</p>
                            )}
                            <div className="mt-5 flex gap-3">
                                <button
                                    onClick={() => toggleActive(r)}
                                    className="border border-ink/30 px-3 py-1.5 text-xs hover:bg-moss hover:text-parchment hover:border-moss transition-colors rounded-sm"
                                >
                                    {r.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => startEdit(r)}
                                    className="border border-ink/30 px-3 py-1.5 text-xs hover:bg-moss hover:text-parchment hover:border-moss transition-colors rounded-sm"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}