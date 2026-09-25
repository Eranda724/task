import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/api';

export default function Footer() {
    const [content, setContent] = useState({});

    useEffect(() => {
        api.get('/content').then((res) => setContent(res.data));
    }, []);

    return (
        <footer className="px-6 md:px-12 py-10 border-t border-[--ink]/15 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-[--ink]/70">
            <span className="font-display italic text-lg text-[--ink]">
                {content.propertyName || 'Sri Ayu'}
            </span>
            <span>{content.propertyAddress || '[Property address], NSW, Australia'}</span>
            <span>{content.propertyPhone || '+61 2 0000 0000'}</span>
            <Link
                to="/admin/login"
                className="text-xs text-[--ink]/30 hover:text-[--ink]/60 md:ml-4"
            >
                Staff
            </Link>
        </footer>
    );
}