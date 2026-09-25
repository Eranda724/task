import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';

const suites = [
    {
        name: 'Water Suite',
        detail: 'King bed, private steam room, uninterrupted water view.',
        price: '$680 / night',
    },
    {
        name: 'Garden Suite',
        detail: 'King bed, outdoor bath, opens onto the she-oak garden.',
        price: '$540 / night',
    },
    {
        name: 'Corner Suite',
        detail: 'Two singles or one king, reading nook, morning sun.',
        price: '$480 / night',
    },
];

export default function PropertyDetail() {
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="grid md:grid-cols-5 px-6 md:px-12 pt-8 md:pt-16 pb-12 gap-10 items-center">
                <div className="md:col-span-3">
                    <p className="text-sm text-[--clay] mb-4">The property</p>
                    <h1 className="font-display italic text-4xl md:text-5xl leading-tight max-w-xl">
                        Five suites, one kitchen, no televisions.
                    </h1>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[--ink]/80">
                        Built from timber and stone sourced within a day's drive. The
                        treatment house sits apart, reachable by a short path through
                        she-oaks. Everything on the property is built around slowing
                        down - including the wifi, which is deliberately slow.
                    </p>
                </div>
                <img
                    src="/property-exterior.jpg"
                    alt="Sri Ayu exterior"
                    className="md:col-span-2 aspect-video w-full object-cover rounded-sm"
                />

            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            <section className="px-6 md:px-12 py-12">
                <h2 className="font-display italic text-3xl mb-8">Suites</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {suites.map((s) => (
                        <div key={s.name} className="ticket-border p-6">
                            <img
                                src={`/suite-${s.name.toLowerCase().replace(' ', '-')}.jpg`}
                                alt={s.name}
                                className="h-40 w-full mb-4 object-cover"
                            />
                            <p className="font-display text-xl">{s.name}</p>
                            <p className="text-sm mt-2 text-[--ink]/75 leading-relaxed">
                                {s.detail}
                            </p>
                            <p className="text-sm mt-3 text-[--clay]">{s.price}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-12 py-16 bg-[--moss] text-[--parchment]">
                <h2 className="font-display italic text-3xl mb-4">The treatment house</h2>
                <p className="max-w-lg text-sm leading-relaxed text-[--parchment]/85">
                    Separate from the suites, facing inland. Two treatment rooms, a
                    steam room, and a resting room where guests are encouraged to stay
                    for an hour after any session - most do.
                </p>
            </section>

            <Footer />
        </div>
    );
}