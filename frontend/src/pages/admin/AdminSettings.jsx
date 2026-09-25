import { useState } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

export default function AdminSettings() {
    const [form, setForm] = useState({ currentPassword: '', newEmail: '', newPassword: '' });
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ state: 'loading', message: '' });
        try {
            const res = await api.patch('/admin/account', form);
            setStatus({ state: 'success', message: `Updated — logged in as ${res.data.email}` });
            setForm({ currentPassword: '', newEmail: '', newPassword: '' });
        } catch (err) {
            setStatus({ state: 'error', message: err.response?.data?.error || 'Update failed' });
        }
    }

    return (
        <AdminLayout>
            <h1 className="font-display italic text-3xl mb-6">Account settings</h1>

            <form onSubmit={handleSubmit} className="ticket-border p-6 max-w-sm grid gap-4">
                <label className="text-sm">
                    Current password
                    <input
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                    />
                </label>
                <label className="text-sm">
                    New email (leave blank to keep current)
                    <input
                        type="email"
                        name="newEmail"
                        value={form.newEmail}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                    />
                </label>
                <label className="text-sm">
                    New password (leave blank to keep current)
                    <input
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                        className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                    />
                </label>
                <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors disabled:opacity-60"
                >
                    {status.state === 'loading' ? 'Saving...' : 'Save changes'}
                </button>
                {status.message && (
                    <p className={`text-sm ${status.state === 'error' ? 'text-[--clay]' : 'text-[--sage]'}`}>
                        {status.message}
                    </p>
                )}
            </form>
        </AdminLayout>
    );
}