import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
            <Link to="/" className="font-display italic text-xl tracking-tight">
                Nirmala Coast
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link to="/treatments" className="hover:text-[--ochre]">
                    Treatments
                </Link>
                <Link to="/property" className="hover:text-[--ochre]">
                    The property
                </Link>
                <Link to="/about" className="hover:text-[--ochre]">
                    About
                </Link>
                <Link to="/contact" className="hover:text-[--ochre]">
                    Contact
                </Link>
                <Link
                    to="/#booking"
                    className="border border-[--ink] px-4 py-2 hover:bg-[--moss] hover:text-[--parchment] hover:border-[--moss] transition-colors"
                >
                    Check availability
                </Link>
            </nav>
        </header>
    );
}