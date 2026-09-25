import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { saveSession } from '../../lib/auth';

export default function AdminLogin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            const res = await api.post('/auth/login', form);
            saveSession(res.data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink] flex items-center justify-center px-6">
            <form onSubmit={handleSubmit} className="ticket-border p-8 w-full max-w-sm">
                <p className="font-display italic text-2xl mb-6">Staff login</p>
                <label className="text-sm block mb-4">
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
                <label className="text-sm block mb-6">
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
                {error && <p className="text-sm text-[--clay] mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                >
                    Log in
                </button>
            </form>
        </div>
    );
}