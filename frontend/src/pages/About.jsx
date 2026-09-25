import { useState, useEffect } from 'react';
import api from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';

export default function About() {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        api.get('/staff').then(res => setStaff(res.data)).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="grid md:grid-cols-2 px-6 md:px-12 pt-8 md:pt-16 pb-12 gap-10 items-center">
                <div>
                    <p className="text-sm text-[--clay] mb-4">About</p>
                    <h1 className="font-display italic text-4xl md:text-5xl leading-tight">
                        Twelve years in Sri Lanka, before any of this existed.
                    </h1>
                    <p className="mt-6 text-[15px] leading-relaxed text-[--ink]/80 max-w-lg">
                        Our lead practitioner trained at a small clinic outside Kandy,
                        under a teacher who took on very few outside students. Sri Ayu
                        started as a question, whether that same slow, attentive
                        practice could work somewhere entirely different, on the other
                        side of the water.
                    </p>
                </div>
                <img
                    src="/about.jpg"
                    alt="Ayurvedic practice"
                    className="aspect-video w-full object-cover rounded-sm"
                />
            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            <section className="px-6 md:px-12 py-12 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="font-display italic text-2xl mb-3">Why here</h2>
                    <p className="text-sm leading-relaxed text-[--ink]/80">
                        The property sits on land that's quiet for most of the year -
                        no through traffic, no neighbouring resorts. It's the same
                        reason the original clinic worked: nothing pulling attention
                        away from the treatment.
                    </p>
                </div>
                <div>
                    <h2 className="font-display italic text-2xl mb-3">Who this is for</h2>
                    <p className="text-sm leading-relaxed text-[--ink]/80">
                        Guests usually arrive tired in a way that isn't just physical.
                        Some come for a single treatment day, others for a full
                        Panchakarma. Both are common, and both are treated the same way.
                    </p>
                </div>
            </section>

            {staff.length > 0 && (
                <>
                    <section className="px-6 md:px-12 py-16">
                        <h2 className="font-display italic text-3xl md:text-4xl mb-12 text-center">Our Practitioners</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {staff.map((member) => (
                                <div key={member._id} className="flex flex-col items-center text-center gap-6">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shrink-0 border border-[--moss]/20 shadow-sm"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[--moss]/10 flex items-center justify-center text-[--moss] text-5xl font-display shrink-0 border border-[--moss]/20 shadow-sm">
                                            {member.name.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-display italic text-2xl md:text-3xl mb-2">{member.name}</h3>
                                        <p className="text-[14px] md:text-[15px] text-[--clay] tracking-wider uppercase font-medium">{member.specialty}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </>
            )}

            <Footer />
        </div>
    );
}