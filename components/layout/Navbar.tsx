import Link from 'next/link';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-earth-200 bg-earth-50/80 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-earth-600">
                    Roshini's
                </Link>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-earth-500">
                    <Link href="/" className="hover:text-earth-600">Home</Link>
                    <Link href="/shop" className="hover:text-earth-600">Shop</Link>
                    <Link href="/about" className="hover:text-earth-600">Our Story</Link>
                    <Link href="/blog" className="hover:text-earth-600">Blog</Link>
                    <Link href="/contact" className="hover:text-earth-600">Contact</Link>
                </nav>
                <div className="flex items-center gap-4">
                    <button className="text-earth-600 hover:text-earth-500"><Search className="h-5 w-5" /></button>
                    <Link href="/cart" className="relative text-earth-600 hover:text-earth-500">
                        <ShoppingCart className="h-5 w-5" />
                        {/* The cart quantity indicator will be populated dynamically from Zustand */}
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-earth-600 text-[10px] font-bold text-white">0</span>
                    </Link>
                    <Link href="/dashboard" className="hidden md:block text-earth-600 hover:text-earth-500">
                        <User className="h-5 w-5" />
                    </Link>
                    <button className="md:hidden text-earth-600"><Menu className="h-5 w-5" /></button>
                </div>
            </div>
        </header>
    );
}
