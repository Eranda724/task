import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

const emptyForm = { name: '', duration: '', price: '', note: '' };

export default function AdminTreatments() {
    const [treatments, setTreatments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [showForm, setShowForm] = useState(false);
    const [editingTreatmentId, setEditingTreatmentId] = useState(null);

    useEffect(() => {
        loadTreatments();
    }, []);

    function loadTreatments() {
        setLoading(true);
        api
            .get('/admin/treatments')
            .then((res) => setTreatments(res.data))
            .catch(() => setError('Could not load treatments'))
            .finally(() => setLoading(false));
    }

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            if (editingTreatmentId) {
                const res = await api.patch(`/admin/treatments/${editingTreatmentId}`, form);
                setTreatments((prev) => prev.map((t) => (t._id === editingTreatmentId ? res.data : t)));
            } else {
                const res = await api.post('/admin/treatments', form);
                setTreatments((prev) => [res.data, ...prev]);
            }
            setForm(emptyForm);
            setEditingTreatmentId(null);
            setShowForm(false);
        } catch {
            setError('Could not save treatment');
        }
    }
    
    function startEdit(treatment) {
        setForm({
            name: treatment.name,
            duration: treatment.duration,
            price: treatment.price,
            note: treatment.note
        });
        setEditingTreatmentId(treatment._id);
        setShowForm(true);
    }

    function handleCancel() {
        setShowForm(false);
        setForm(emptyForm);
        setEditingTreatmentId(null);
    }

    async function toggleActive(treatment) {
        try {
            const res = await api.patch(`/admin/treatments/${treatment._id}`, {
                isActive: !treatment.isActive,
            });
            setTreatments((prev) => prev.map((t) => (t._id === treatment._id ? res.data : t)));
        } catch {
            setError('Could not update treatment');
        }
    }

    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="font-display italic text-3xl">Treatments</h1>
                <button
                    onClick={() => {
                        if (showForm) {
                            handleCancel();
                        } else {
                            setForm(emptyForm);
                            setEditingTreatmentId(null);
                            setShowForm(true);
                        }
                    }}
                    className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors rounded-sm"
                >
                    {showForm ? 'Cancel' : 'Add treatment'}
                </button>
            </div>

            {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}

            {showForm && (
                <form onSubmit={handleSave} className="ticket-border p-6 mb-8 grid gap-4 max-w-md">
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
                        Duration (e.g. 75 min)
                        <input
                            name="duration"
                            value={form.duration}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm">
                        Price (e.g. $220)
                        <input
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm">
                        Note / Description
                        <textarea
                            name="note"
                            value={form.note}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors mt-4 rounded-sm"
                    >
                        Save treatment
                    </button>
                </form>
            )}

            {loading && <p className="text-sm text-[--ink]/60">Loading...</p>}

            {!loading && (
                <div className="grid md:grid-cols-2 gap-4">
                    {treatments.map((t) => (
                        <div key={t._id} className="ticket-border p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="font-display text-xl">{t.name}</p>
                                    <p className="text-sm text-[--clay] mt-1">
                                        {t.price} · {t.duration}
                                    </p>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 border rounded-sm font-medium ${t.isActive
                                        ? 'border-sage text-sage bg-sage/10'
                                        : 'border-clay text-clay bg-clay/10'
                                        }`}
                                >
                                    {t.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            {t.note && (
                                <p className="text-sm text-[--ink]/70 mt-3">{t.note}</p>
                            )}
                            <div className="mt-5 flex gap-3">
                                <button
                                    onClick={() => toggleActive(t)}
                                    className="border border-ink/30 px-3 py-1.5 text-xs hover:bg-moss hover:text-parchment hover:border-moss transition-colors rounded-sm"
                                >
                                    {t.isActive ? 'Deactivate' : 'Activate'}
                                </button>
                                <button
                                    onClick={() => startEdit(t)}
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
