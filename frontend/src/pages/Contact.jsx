import { useState, useEffect } from 'react';
import api from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
    const [content, setContent] = useState({});

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
    }, []);
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="px-6 md:px-12 pt-8 md:pt-16 pb-16 grid md:grid-cols-2 gap-10">
                <div>
                    <p className="text-sm text-[--clay] mb-4">Contact</p>
                    <h1 className="font-display italic text-4xl leading-tight mb-6">
                        Questions before you book.
                    </h1>
                    <p className="text-sm leading-relaxed text-[--ink]/80 max-w-sm">
                        For anything about a stay already booked, email us directly -
                        we reply faster than the form below.
                    </p>
                    <div className="mt-8 text-sm space-y-2 text-[--ink]/80">
                        <p>{content.propertyEmail || 'hello@sriayu.example'}</p>
                        <p>{content.propertyPhone || '+61 2 0000 0000'}</p>
                        <p>{content.propertyAddress || '[Property address], NSW, Australia'}</p>
                    </div>
                </div>

                <form className="ticket-border p-6 md:p-8 grid gap-5 h-fit">
                    <label className="text-sm">
                        Name
                        <input
                            type="text"
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm">
                        Email
                        <input
                            type="email"
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <label className="text-sm">
                        Message
                        <textarea
                            rows={4}
                            className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                    >
                        Send message
                    </button>
                </form>
            </section>

            <Footer />
        </div>
    );
}