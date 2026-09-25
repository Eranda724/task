import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';
import api from '../lib/api';

export default function Treatments() {
    const [treatments, setTreatments] = useState([]);

    useEffect(() => {
        api.get('/treatments').then((res) => {
            setTreatments(res.data);
        });
    }, []);

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="grid md:grid-cols-5 px-6 md:px-12 pt-8 md:pt-16 pb-10 gap-10 items-center">
                <div className="md:col-span-3">
                    <p className="text-sm text-[--clay] mb-4">Rituals & treatments</p>
                    <h1 className="font-display italic text-4xl md:text-5xl max-w-xl leading-tight">
                        Every treatment starts with a question, not a menu.
                    </h1>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[--ink]/80">
                        Your first session is a short consultation with our practitioner -
                        what you're sleeping like, eating like, carrying. What's booked
                        below is a starting point; it often changes once you arrive.
                    </p>
                </div>
                <img
                    src="/treatment-hero.jpg"
                    alt="Ayurvedic treatments at Sri Ayu"
                    className="md:col-span-2 aspect-video w-full object-cover rounded-sm"
                />
            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            <section className="px-6 md:px-12 py-12 grid gap-8 md:grid-cols-2">
                {treatments.map((t) => (
                    <div key={t.name} className="ticket-border p-6 md:p-8">
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="font-display text-2xl">{t.name}</p>
                            <p className="text-sm text-[--clay] whitespace-nowrap">{t.price}</p>
                        </div>
                        <p className="text-xs text-[--ink]/60 mt-1">{t.duration}</p>
                        <p className="text-sm mt-4 leading-relaxed text-[--ink]/80">
                            {t.note}
                        </p>
                    </div>
                ))}
            </section>

            <Footer />
        </div>
    );
}