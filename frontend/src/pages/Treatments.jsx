import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';

const treatments = [
    {
        name: 'Abhyanga',
        duration: '75 min',
        price: '$220',
        note: 'A full-body warm oil massage, done in long rhythmic strokes by two therapists working in sync. Calms the nervous system before it does anything else — most guests fall asleep partway through.',
    },
    {
        name: 'Shirodhara',
        duration: '60 min',
        price: '$190',
        note: 'A slow, continuous stream of warm herbal oil poured across the forehead. Traditionally used for a mind that won\'t settle — insomnia, overthinking, the low hum of stress that doesn\'t have one cause.',
    },
    {
        name: 'Panchakarma',
        duration: '5–14 days',
        price: 'From $2,400',
        note: 'A full cleanse program, built around your dosha and the season you arrive in. Includes daily treatments, a tailored diet from our kitchen, and a consultation on day one and day last.',
    },
    {
        name: 'Yoga & Pranayama',
        duration: '45 min',
        price: 'Included in stay',
        note: 'A guided morning practice on the deck, facing the water. Adjusted to your ability and to what your body needs that particular morning.',
    },
    {
        name: 'Udvartana',
        duration: '50 min',
        price: '$170',
        note: 'A herbal powder scrub, applied in upward strokes. Used traditionally to support circulation and to prepare the body for oil treatments later in a stay.',
    },
    {
        name: 'Nasya',
        duration: '30 min',
        price: '$110',
        note: 'A short nasal treatment using medicated oil. Often paired with Shirodhara for guests dealing with sinus tension or a heavy head.',
    },
];

export default function Treatments() {
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="px-6 md:px-12 pt-8 md:pt-16 pb-10">
                <p className="text-sm text-[--clay] mb-4">Rituals & treatments</p>
                <h1 className="font-display italic text-4xl md:text-5xl max-w-xl leading-tight">
                    Every treatment starts with a question, not a menu.
                </h1>
                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[--ink]/80">
                    Your first session is a short consultation with our practitioner —
                    what you're sleeping like, eating like, carrying. What's booked
                    below is a starting point; it often changes once you arrive.
                </p>
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