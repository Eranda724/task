import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';
import { saveSession } from '../../lib/auth';

export default function AdminLogin() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await api.post('/auth/login', form);
            saveSession(res.data);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-[--parchment] font-sans">
            {/* Image Section */}
            <div className="hidden md:block relative bg-[--moss]">
                <img
                    src="/login.png"
                    alt="Sri Ayu Retreat"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-transparent"></div>
                <div className="absolute bottom-16 left-16 text-[--ink]">
                    <p className="font-display italic text-5xl mb-4">Sri Ayu</p>
                    <p className="text-[15px] max-w-sm leading-relaxed tracking-wide font-medium text-[--ink]/80">
                        Administrative portal. Authorized personnel only.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 relative shadow-[-20px_0_40px_rgba(0,0,0,0.03)] z-10 bg-[--parchment]">
                <div className="w-full max-w-md mx-auto">
                    {/* Logo/Brand for Mobile */}
                    <div className="md:hidden mb-12">
                        <p className="font-display italic text-4xl text-[--moss]">Sri Ayu</p>
                    </div>

                    <div className="mb-12">
                        <h1 className="font-display italic text-4xl text-[--ink] mb-3">Welcome back</h1>
                        <p className="text-[15px] text-[--ink]/60 tracking-wide">
                            Please enter your details to sign in to the dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[--ink]/50 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder="name@sriayu.com.au"
                                className="w-full border-b border-[--ink]/20 bg-transparent px-0 py-3 text-[16px] outline-none focus:border-[--moss] transition-colors placeholder:text-[--ink]/20"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-widest text-[--ink]/50 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full border-b border-[--ink]/20 bg-transparent px-0 py-3 text-[16px] outline-none focus:border-[--moss] transition-colors placeholder:text-[--ink]/20"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-700 text-[14px] font-medium p-4 rounded-sm border border-red-100 flex items-start gap-3">
                                <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full bg-[#4A6B53] text-white px-6 py-4 text-[15px] font-medium tracking-wide rounded-sm hover:bg-[#3A5641] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? 'Signing in...' : 'Sign in to dashboard'}
                        </button>
                    </form>

                    <div className="mt-16 text-center">
                        <a href="/" className="inline-flex items-center justify-center gap-3 text-sm font-medium text-[--clay] hover:text-[--ink] transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Return to main site
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}