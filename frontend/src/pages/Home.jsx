import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';

const treatments = [
    {
        name: 'Abhyanga',
        duration: '75 min',
        note: 'Warm herbal oil, full body, rhythmic strokes to calm the nervous system.',
    },
    {
        name: 'Shirodhara',
        duration: '60 min',
        note: 'A slow stream of warm oil across the forehead. Quiets a restless mind.',
    },
    {
        name: 'Panchakarma',
        duration: '5–14 days',
        note: 'A guided cleanse, built around your dosha and the season.',
    },
    {
        name: 'Yoga & Pranayama',
        duration: '45 min',
        note: 'Morning practice on the deck, facing the water.',
    },
];

const dayPlan = [
    {
        time: 'Morning',
        title: 'Wake with the tide',
        note: 'Herbal tea, breathwork, and a walk to the treatment house before the day warms up.',
    },
    {
        time: 'Midday',
        title: 'Treatment & rest',
        note: 'Your scheduled therapy, followed by a quiet hour - no phones, no plans.',
    },
    {
        time: 'Evening',
        title: 'Slow dinner',
        note: 'A seasonal Ayurvedic meal, cooked to your constitution, shared or alone.',
    },
];

export default function Home() {
    const [content, setContent] = useState({});
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
        api.get('/rooms').then((res) => setRooms(res.data));
    }, []);
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            {/* Hero */}
            <section className="grid md:grid-cols-5 px-6 md:px-12 pt-8 md:pt-16 pb-16 gap-10 items-center">
                <div className="md:col-span-3">
                    <p className="text-sm text-[--clay] mb-4">
                        {content.heroLabel || 'A wellness retreat on the New South Wales coast'}
                    </p>
                    <h1 className="font-display italic text-4xl md:text-6xl leading-[1.08] max-w-xl">
                        {content.heroTitle || 'Ayurveda, carried across the water and set down on the coast.'}
                    </h1>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[--ink]/80">
                        {content.heroIntro || `Sri Ayu brings Sri Lankan Ayurvedic tradition to a single property on the water - ${rooms.length || 5} suites, a treatment house, and a kitchen that cooks for your constitution rather than a menu.`}
                    </p>
                    <div className="mt-8 flex items-center gap-6">
                        <Link
                            to="/contact"
                            className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                        >
                            Check availability
                        </Link>
                        <a href="#treatments" className="text-sm underline underline-offset-4">
                            See the treatments
                        </a>
                    </div>
                </div>
                <img
                    src="/hero.jpg"
                    alt="Sri Ayu property on the NSW coast"
                    className="md:col-span-2 aspect-video w-full object-cover rounded-sm"
                />
            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            {/* Philosophy */}
            <section className="px-6 md:px-12 py-16 md:py-24">
                <p className="font-display italic text-3xl md:text-5xl lg:text-6xl leading-tight border-l-4 border-[--sage] pl-6 md:pl-10 text-[--moss]">
                    "Ayurveda doesn't treat a symptom.
                    It reads the whole person
                    the season,
                    the appetite,
                    the sleep

                    before it offers anything at all."
                </p>
                <p className="mt-6 md:mt-8 text-base md:text-lg text-[--ink]/70 pl-6 md:pl-10 font-medium tracking-wide">
                    Our lead practitioner trained in Sri Lanka for twelve years before
                    bringing the practice here.
                </p>
            </section>

            {/* History Image */}
            <section className="px-6 md:px-12 pb-10 flex justify-center">
                <img src="/history.jpg" alt="History" className="w-full max-w-3xl h-auto object-cover rounded-sm" />
            </section>

            {/* Treatments */}
            <section id="treatments" className="px-6 md:px-12 py-10">
                <h2 className="font-display italic text-3xl mb-8">
                    Rituals & treatments
                </h2>
                <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0">
                    {treatments.map((t) => (
                        <div
                            key={t.name}
                            className="ticket-border shrink-0 w-64 p-6 bg-[--parchment]"
                        >
                            <p className="text-xs text-[--clay]">{t.duration}</p>
                            <p className="font-display text-xl mt-2">{t.name}</p>
                            <p className="text-sm mt-3 text-[--ink]/75 leading-relaxed">
                                {t.note}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* A day here */}
            <section id="stay" className="px-6 md:px-12 py-16 bg-[--moss] text-[--parchment]">
                <h2 className="font-display italic text-3xl mb-10">A day at Sri Ayu</h2>
                <div className="grid md:grid-cols-3 gap-10">
                    {dayPlan.map((d) => (
                        <div key={d.time}>
                            <p className="text-sm text-[--parchment]/60">{d.time}</p>
                            <p className="font-display text-xl mt-2">{d.title}</p>
                            <p className="text-sm mt-3 text-[--parchment]/80 leading-relaxed">
                                {d.note}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Property */}
            <section id="property" className="grid md:grid-cols-2 px-6 md:px-12 py-16 gap-10 items-center">
                <img
                    src="/suite.jpg"
                    alt="Suite interior at Sri Ayu"
                    className="h-64 md:h-96 w-full object-cover order-2 md:order-1"
                />
                <div className="order-1 md:order-2">
                    <h2 className="font-display italic text-3xl mb-4">The property</h2>
                    <p className="text-sm leading-relaxed text-[--ink]/80 max-w-md">
                        {rooms.length || 5} suites, each facing the water, built from timber and stone
                        sourced within a day's drive. No televisions, no minibars - a
                        reading corner, a private steam room, and a bed made for
                        twelve hours of sleep. The treatment house sits apart, reachable
                        by a short path through she-oaks.
                    </p>
                </div>
            </section>


            <Footer />
        </div>
    );
}