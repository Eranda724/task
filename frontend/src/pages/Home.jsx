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
        note: 'Your scheduled therapy, followed by a quiet hour — no phones, no plans.',
    },
    {
        time: 'Evening',
        title: 'Slow dinner',
        note: 'A seasonal Ayurvedic meal, cooked to your constitution, shared or alone.',
    },
];

export default function Home() {
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            {/* Hero */}
            <section className="grid md:grid-cols-5 px-6 md:px-12 pt-8 md:pt-16 pb-16 gap-10 items-center">
                <div className="md:col-span-3">
                    <p className="text-sm text-[--clay] mb-4">
                        A wellness retreat on the New South Wales coast
                    </p>
                    <h1 className="font-display italic text-4xl md:text-6xl leading-[1.08] max-w-xl">
                        Ayurveda, carried across the water and set down on the coast.
                    </h1>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[--ink]/80">
                        Nirmala Coast brings Sri Lankan Ayurvedic tradition to a single
                        property on the water — five suites, a treatment house, and a
                        kitchen that cooks for your constitution rather than a menu.
                    </p>
                    <div className="mt-8 flex items-center gap-6">
                        <a
                            href="#booking"
                            className="bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                        >
                            Check availability
                        </a>
                        <a href="#treatments" className="text-sm underline underline-offset-4">
                            See the treatments
                        </a>
                    </div>
                </div>

                {/* PHOTO: replace with a tall image of the property / coastline */}
                <div
                    className="md:col-span-2 h-72 md:h-[520px] w-full"
                    style={{
                        background:
                            'linear-gradient(160deg, #7C8C6B 0%, #2B3A2A 55%, #211D17 100%)',
                    }}
                />
            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            {/* Philosophy */}
            <section className="px-6 md:px-12 py-16 max-w-2xl">
                <p className="font-display italic text-2xl md:text-3xl leading-snug border-l-2 border-[--sage] pl-6">
                    "Ayurveda doesn't treat a symptom. It reads the whole person — the
                    season, the appetite, the sleep — before it offers anything at all."
                </p>
                <p className="mt-4 text-sm text-[--ink]/70 pl-6">
                    Our lead practitioner trained in Sri Lanka for twelve years before
                    bringing the practice here.
                </p>
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
                <h2 className="font-display italic text-3xl mb-10">A day at Nirmala</h2>
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
                {/* PHOTO: replace with an image of a suite or the treatment house */}
                <div
                    className="h-64 md:h-96 w-full order-2 md:order-1"
                    style={{
                        background: 'linear-gradient(200deg, #EAE1CE 0%, #B4802A 45%, #9C5A3C 100%)',
                    }}
                />
                <div className="order-1 md:order-2">
                    <h2 className="font-display italic text-3xl mb-4">The property</h2>
                    <p className="text-sm leading-relaxed text-[--ink]/80 max-w-md">
                        Five suites, each facing the water, built from timber and stone
                        sourced within a day's drive. No televisions, no minibars — a
                        reading corner, a private steam room, and a bed made for
                        twelve hours of sleep. The treatment house sits apart, reachable
                        by a short path through she-oaks.
                    </p>
                </div>
            </section>

            {/* Booking */}
            <section id="booking" className="px-6 md:px-12 py-20">
                <div className="ticket-border max-w-xl mx-auto p-8 md:p-12 bg-[--parchment]">
                    <h2 className="font-display italic text-3xl mb-2">Check availability</h2>
                    <p className="text-sm text-[--ink]/70 mb-8">
                        Stays run Sunday to Sunday. We'll confirm your dosha consultation
                        once you book.
                    </p>
                    <form className="grid gap-5">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="text-sm">
                                Arrive
                                <input
                                    type="date"
                                    className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                                />
                            </label>
                            <label className="text-sm">
                                Depart
                                <input
                                    type="date"
                                    className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm"
                                />
                            </label>
                        </div>
                        <label className="text-sm">
                            Guests
                            <select className="mt-1 w-full border border-[--ink]/30 bg-transparent px-3 py-2 text-sm">
                                <option>1 guest</option>
                                <option>2 guests</option>
                            </select>
                        </label>
                        <button
                            type="submit"
                            className="mt-2 bg-[--moss] text-[--parchment] px-6 py-3 text-sm hover:bg-[--ink] transition-colors"
                        >
                            Check availability
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
}