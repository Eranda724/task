import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="px-6 md:px-12 py-10 border-t border-[--ink]/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[--ink]/70">
            <span className="font-display italic text-lg text-[--ink]">
                Sri Ayu
            </span>
            <span>[Property address], NSW, Australia</span>
            <span>hello@sriayu.example</span>
            <Link
                to="/admin/login"
                className="text-xs text-[--ink]/30 hover:text-[--ink]/60 md:ml-4"
            >
                Staff
            </Link>
        </footer>
    );
}