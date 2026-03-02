'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { label: 'Products', href: '/products', icon: Package },
        { label: 'Orders', href: '/orders', icon: ShoppingCart },
        { label: 'Customers', href: '/customers', icon: Users },
        { label: 'Coupons', href: '/coupons', icon: Tag },
        { label: 'Content', href: '/content', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-earth-50">
            {/* Sidebar */}
            <aside className="w-64 bg-earth-600 border-r border-earth-300 text-earth-100 flex flex-col flex-shrink-0">
                <div className="h-16 flex items-center px-6 border-b border-earth-500">
                    <Link href="/" className="text-xl font-bold text-white tracking-tight">Roshini's Admin</Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-4">
                        {navItems.map((item) => {
                            const active = pathname.startsWith(item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? 'bg-earth-500 text-white font-medium shadow-sm' : 'hover:bg-earth-500/50 hover:text-white'
                                            }`}
                                    >
                                        <item.icon className={`h-5 w-5 ${active ? 'text-earth-200' : 'text-earth-300'}`} />
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-earth-500">
                    <button className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md hover:bg-earth-500/50 hover:text-white transition-colors">
                        <LogOut className="h-5 w-5 text-earth-300" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-earth-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
                    <div>
                        <h2 className="text-xl font-semibold text-earth-600 capitalize">
                            {pathname.split('/')[1] || 'Dashboard'}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-earth-500">Admin User</span>
                        <div className="h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-600 font-bold">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
