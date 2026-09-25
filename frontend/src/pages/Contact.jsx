import { useState, useEffect } from 'react';
import api from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
    const [content, setContent] = useState({});
    const [rooms, setRooms] = useState([]);
    
    const [form, setForm] = useState({
        guestName: '',
        email: '',
        roomId: '',
        checkIn: '',
        checkOut: '',
        guests: 1
    });
    
    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
        api.get('/rooms').then((res) => {
            const activeRooms = res.data.filter(r => r.isActive);
            setRooms(activeRooms);
            if (activeRooms.length > 0) {
                setForm(f => ({ ...f, roomId: activeRooms[0]._id }));
            }
        });
    }, []);
    
    function handleChange(e) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Checking availability...' });
        
        try {
            await api.post('/bookings', form);
            setStatus({ type: 'success', message: 'Your request has been sent! We will contact you shortly.' });
            setForm(f => ({ ...f, guestName: '', email: '', checkIn: '', checkOut: '', guests: 1 }));
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setStatus({ type: 'error', message: 'Sorry, this suite is not available for the selected dates.' });
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
            }
        }
    }

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="px-6 md:px-12 pt-8 md:pt-16 pb-16 grid md:grid-cols-2 gap-10">
                <div>
                    <p className="text-sm text-[--clay] mb-4">Check availability</p>
                    <h1 className="font-display italic text-4xl leading-tight mb-6">
                        Request a stay.
                    </h1>
                    <p className="text-sm leading-relaxed text-[--ink]/80 max-w-sm">
                        Select your dates and preferred suite to check availability. 
                        We will get back to you shortly to confirm your booking.
                    </p>
                    <div className="mt-8 text-sm space-y-2 text-[--ink]/80">
                        <p>{content.propertyEmail || 'hello@sriayu.example'}</p>
                        <p>{content.propertyPhone || '+61 2 0000 0000'}</p>
                        <p>{content.propertyAddress || 'Sri Ayu, NSW, Australia'}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="ticket-border p-6 md:p-8 grid gap-5 h-fit">
                    {status.message && (
                        <div className={`p-4 text-sm ${status.type === 'success' ? 'bg-[--sage]/20 text-[--moss]' : status.type === 'error' ? 'bg-red-50 text-red-800' : 'bg-gray-100'}`}>
                            {status.message}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm">
                            Check-in
                            <input
                                type="date"
                                name="checkIn"
                                value={form.checkIn}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            />
                        </label>
                        <label className="text-sm">
                            Check-out
                            <input
                                type="date"
                                name="checkOut"
                                value={form.checkOut}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            />
                        </label>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <label className="text-sm">
                            Suite
                            <select
                                name="roomId"
                                value={form.roomId}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            >
                                {rooms.map(r => (
                                    <option key={r._id} value={r._id}>{r.name}</option>
                                ))}
                            </select>
                        </label>
                        <label className="text-sm">
                            Guests
                            <input
                                type="number"
                                name="guests"
                                min="1"
                                value={form.guests}
                                onChange={handleChange}
                                required
                                className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                            />
                        </label>
                    </div>
                    
                    <label className="text-sm">
                        Name
                        <input
                            type="text"
                            name="guestName"
                            value={form.guestName}
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
                    
                    <button
                        type="submit"
                        disabled={status.type === 'loading'}
                        className="bg-moss text-parchment px-6 py-3 text-sm hover:bg-ink transition-colors disabled:opacity-50 mt-4 rounded-sm"
                    >
                        {status.type === 'loading' ? 'Sending...' : 'Request booking'}
                    </button>
                </form>
            </section>

            <Footer />
        </div>
    );
}