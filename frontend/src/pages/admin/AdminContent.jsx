import { useState, useEffect } from 'react';
import api from '../../lib/api';
import AdminLayout from '../../components/AdminLayout';

const fields = [
    { key: 'propertyName', label: 'Property name' },
    { key: 'propertyAddress', label: 'Property address' },
    { key: 'propertyPhone', label: 'Phone number' },
    { key: 'propertyEmail', label: 'Email address' },
    { key: 'heroLabel', label: 'Hero label (small text above headline)' },
    { key: 'heroTitle', label: 'Hero headline' },
    { key: 'heroIntro', label: 'Hero intro paragraph' },
    { key: 'aboutIntro', label: 'About page headline' },
];

export default function AdminContent() {
    const [values, setValues] = useState({});
    const [status, setStatus] = useState({ state: 'idle', message: '' });

    useEffect(() => {
        api.get('/content').then((res) => setValues(res.data));
    }, []);

    function handleChange(key, value) {
        setValues((v) => ({ ...v, [key]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ state: 'loading', message: '' });
        try {
            await api.patch('/admin/content', values);
            setStatus({ state: 'success', message: 'Saved' });
        } catch {
            setStatus({ state: 'error', message: 'Could not save changes' });
        }
    }

    return (
        <AdminLayout>
            <h1 className="font-display italic text-3xl mb-6">Site text</h1>

            <form onSubmit={handleSubmit} className="grid gap-6 max-w-xl">
                {fields.map((f) => (
                    <label key={f.key} className="text-sm">
                        {f.label}
                        <textarea
                            rows={f.key === 'heroTitle' || f.key === 'aboutIntro' ? 2 : 3}
                            value={values[f.key] || ''}
                            onChange={(e) => handleChange(f.key, e.target.value)}
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                ))}
                <button
                    type="submit"
                    disabled={status.state === 'loading'}
                    className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors disabled:opacity-60 w-fit"
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