import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import api from '../lib/api';

export default function Header() {
    const [content, setContent] = useState({});

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
    }, []);

    const getLinkClass = ({ isActive }) => 
        `px-4 py-2 rounded-sm transition-colors ${isActive ? 'bg-moss text-parchment' : 'hover:text-ochre'}`;

    return (
        <header className="flex items-center justify-between px-6 md:px-12 py-6">
            <Link to="/" className="flex items-center">
                <img src="/logo.png" alt={content.propertyName || 'Sri Ayu'} className="h-10 md:h-24 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-2 text-sm">
                <NavLink to="/" className={getLinkClass} end>
                    Home
                </NavLink>
                <NavLink to="/treatments" className={getLinkClass}>
                    Treatments
                </NavLink>
                <NavLink to="/property" className={getLinkClass}>
                    The property
                </NavLink>
                <NavLink to="/about" className={getLinkClass}>
                    About
                </NavLink>
                <Link
                    to="/contact"
                    className="ml-4 border border-[--ink] px-4 py-2 hover:bg-moss hover:text-parchment hover:border-moss transition-colors rounded-sm"
                >
                    Check availability
                </Link>
            </nav>
        </header>
    );
}