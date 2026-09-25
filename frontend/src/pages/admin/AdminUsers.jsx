import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '', specialty: '' });
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState({ state: 'idle', message: '' });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    function loadUsers() {
        api.get('/admin/users').then((res) => setUsers(res.data));
    }

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ state: 'loading', message: '' });
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('password', form.password);
            formData.append('specialty', form.specialty);
            if (image) formData.append('image', image);

            await api.post('/admin/users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setStatus({ state: 'success', message: 'Staff account created' });
            setForm({ name: '', email: '', password: '', specialty: '' });
            setImage(null);
            setShowForm(false);
            loadUsers();
        } catch (err) {
            setStatus({ state: 'error', message: err.response?.data?.error || 'Could not create account' });
        }
    }

    async function toggleStatus(id) {
        try {
            await api.patch(`/admin/users/${id}/status`);
            setUsers(users.map((u) => u._id === id ? { ...u, isActive: !u.isActive } : u));
        } catch (err) {
            console.error('Could not toggle status', err);
        }
    }

    return (
        <AdminLayout>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="font-display italic text-3xl">Staff accounts</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-[#4A6B53] text-white px-6 py-3 text-[14px] font-medium tracking-wide hover:bg-[#3A5641] transition-colors rounded-sm shadow-sm"
                >
                    {showForm ? 'Cancel' : 'Add staff member'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="ticket-border p-6 max-w-md grid gap-4 mb-10 bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-black/5">
                    <label className="text-sm block">
                        Name
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm block">
                        Specialty / Role
                        <input
                            name="specialty"
                            value={form.specialty}
                            onChange={handleChange}
                            placeholder="e.g. Ayurvedic Doctor"
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <div>
                        <span className="text-sm block mb-1">Profile Image</span>
                        <label className="flex flex-col items-center justify-center w-full h-32 px-4 transition bg-black/[0.02] border-2 border-dashed border-[--ink]/20 rounded-sm cursor-pointer hover:border-[#4A6B53] hover:bg-[#4A6B53]/5 group">
                            <div className="flex flex-col items-center justify-center space-y-2 text-[--ink]/60 group-hover:text-[#4A6B53]">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                <span className="text-sm font-medium">
                                    {image ? image.name : 'Click to upload photo'}
                                </span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <label className="text-sm block">
                        Email (for login)
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm block">
                        Password
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <button
                        type="submit"
                        disabled={status.state === 'loading'}
                        className="bg-[#4A6B53] text-white px-6 py-3 text-[14px] font-medium tracking-wide hover:bg-[#3A5641] transition-colors disabled:opacity-60 rounded-sm w-full mt-2 shadow-sm"
                    >
                        {status.state === 'loading' ? 'Creating...' : 'Create staff account'}
                    </button>
                    {status.message && (
                        <div className={`mt-2 p-4 text-[14px] font-medium rounded-sm border flex items-start gap-3 ${status.state === 'error'
                            ? 'bg-red-50 text-red-700 border-red-100'
                            : 'bg-green-50 text-green-700 border-green-100'
                            }`}>
                            {status.state === 'error' ? (
                                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                            ) : (
                                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                            )}
                            {status.message}
                        </div>
                    )}
                </form>
            )}

            <div>
                <h2 className="font-display italic text-2xl mb-6">Current staff</h2>
                <div className="grid md:grid-cols-2 gap-4">
                        {users.map((u) => (
                            <div key={u._id} className="ticket-border p-4 flex gap-4 items-center bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border-black/5">
                                {u.image ? (
                                    <img src={u.image} alt={u.name} className="w-16 h-16 rounded-full object-cover shrink-0" />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-[--moss]/10 flex items-center justify-center text-[--moss] text-2xl font-display shrink-0">
                                        {u.name.charAt(0)}
                                    </div>
                                )}
                                <div className="flex-grow">
                                    <p className="font-medium text-[16px]">{u.name}</p>
                                    <p className="text-sm text-[--clay] mb-1">{u.specialty || 'Administrator'}</p>
                                    <p className="text-xs text-[--ink]/50">
                                        {u.email}
                                        <span className="ml-2 uppercase tracking-wide opacity-50">
                                            [{u.role || 'admin'}]
                                        </span>
                                    </p>
                                </div>
                                {(u.role !== 'admin' && u.role !== 'owner') && (
                                    <button
                                        onClick={() => toggleStatus(u._id)}
                                        className={`shrink-0 text-xs px-3 py-1.5 rounded-sm font-medium transition-colors ${
                                            u.isActive !== false
                                                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                        }`}
                                    >
                                        {u.isActive !== false ? 'Active' : 'Inactive'}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
        </AdminLayout>
    );
}