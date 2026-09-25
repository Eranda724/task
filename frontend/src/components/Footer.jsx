import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function Footer() {
    const [content, setContent] = useState({});

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
    }, []);

    return (
        <footer className="bg-ink text-parchment pt-16 pb-8 px-6 md:px-12 text-sm mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12 max-w-7xl mx-auto">
                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-parchment mb-2">Explore</h4>
                    <Link to="/" className="text-parchment/70 hover:text-parchment transition-colors">Home</Link>
                    <Link to="/treatments" className="text-parchment/70 hover:text-parchment transition-colors">Treatments</Link>
                    <Link to="/property" className="text-parchment/70 hover:text-parchment transition-colors">The property</Link>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="font-semibold text-parchment mb-2">Learn More</h4>
                    <Link to="/about" className="text-parchment/70 hover:text-parchment transition-colors">About</Link>
                    <Link to="/contact" className="text-parchment/70 hover:text-parchment transition-colors">Contact</Link>
                </div>

                <div className="flex flex-col gap-3 md:col-span-2">
                    <h4 className="font-semibold text-parchment mb-2">Contact Us</h4>
                    <span className="text-parchment/70">{content.propertyAddress || 'Sri Ayu, NSW, Australia'}</span>
                    <span className="text-parchment/70">{content.propertyPhone || '+61 2 0000 0000'}</span>
                </div>
            </div>

            <div className="border-t border-parchment/20 mb-8 max-w-7xl mx-auto"></div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-parchment/60 max-w-7xl mx-auto">
                <div className="flex items-center">
                    <Link to="/" className="opacity-90 hover:opacity-100 transition-opacity">
                        <img src="/logo.png" alt={content.propertyName || 'Sri Ayu'} className="h-8 md:h-10 w-auto brightness-0 invert" />
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span>© {new Date().getFullYear()} {content.propertyName || 'Sri Ayu'} All rights reserved</span>
                    <span>•</span>
                    <Link to="/admin/login" className="hover:text-parchment transition-colors">Staff Login</Link>
                </div>
            </div>
        </footer>
    );
}