import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [status, setStatus] = useState({ state: 'idle', message: '' });

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
            await api.post('/admin/users', form);
            setStatus({ state: 'success', message: 'Staff account created' });
            setForm({ name: '', email: '', password: '' });
            loadUsers();
        } catch (err) {
            setStatus({ state: 'error', message: err.response?.data?.error || 'Could not create account' });
        }
    }

    return (
        <AdminLayout>
            <h1 className="font-display italic text-3xl mb-6">Staff accounts</h1>

            <form onSubmit={handleSubmit} className="ticket-border p-6 max-w-sm grid gap-4 mb-10">
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
                    Email
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                    />
                </label>
                <label className="text-sm">
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
                    className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors disabled:opacity-60 rounded-sm w-fit"
                >
                    {status.state === 'loading' ? 'Creating...' : 'Create staff account'}
                </button>
                {status.message && (
                    <p className={`text-sm ${status.state === 'error' ? 'text-[--clay]' : 'text-[--sage]'}`}>
                        {status.message}
                    </p>
                )}
            </form>

            <h2 className="font-display italic text-2xl mb-4">Current staff</h2>
            <div className="grid gap-2">
                {users.map((u) => (
                    <div key={u._id} className="text-sm border-b border-[--ink]/10 pb-2">
                        {u.name} - {u.email}
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}