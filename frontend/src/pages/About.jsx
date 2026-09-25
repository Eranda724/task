import Header from '../components/Header';
import Footer from '../components/Footer';
import LeafDivider from '../components/LeafDivider';

export default function About() {
    return (
        <div className="min-h-screen bg-[--parchment] text-[--ink]">
            <Header />

            <section className="px-6 md:px-12 pt-8 md:pt-16 pb-12 max-w-2xl">
                <p className="text-sm text-[--clay] mb-4">About</p>
                <h1 className="font-display italic text-4xl md:text-5xl leading-tight">
                    Twelve years in Sri Lanka, before any of this existed.
                </h1>
                <p className="mt-6 text-[15px] leading-relaxed text-[--ink]/80">
                    Our lead practitioner trained at a small clinic outside Kandy,
                    under a teacher who took on very few outside students. Sri Ayu
                    started as a question — whether that same slow, attentive
                    practice could work somewhere entirely different, on the other
                    side of the water.
                </p>
            </section>

            <div className="px-6 md:px-12">
                <LeafDivider />
            </div>

            <section className="px-6 md:px-12 py-12 grid md:grid-cols-2 gap-10">
                <div>
                    <h2 className="font-display italic text-2xl mb-3">Why here</h2>
                    <p className="text-sm leading-relaxed text-[--ink]/80">
                        The property sits on land that's quiet for most of the year —
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

            <Footer />
        </div>
    );
}