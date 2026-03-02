import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { BookOpen } from 'lucide-react';

export const metadata = {
    title: 'Blog | Roshini\'s Home Products',
};

export default function BlogPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-earth-600 mb-4 tracking-tight flex items-center justify-center gap-3">
                            <BookOpen className="h-10 w-10 text-earth-400" />
                            Health & Wellness Insights
                        </h1>
                        <p className="text-lg text-earth-500 max-w-2xl mx-auto">
                            Simple, practical tips on nutrition, seeds, millets, and traditional wellness practices.
                        </p>
                    </div>

                    <div className="bg-white p-12 text-center rounded-2xl border border-earth-200 shadow-sm">
                        <div className="h-20 w-20 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-6 text-earth-400">
                            <BookOpen className="h-10 w-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-earth-600 mb-2">Our blog is launching soon.</h2>
                        <p className="text-earth-500">Subscribe to our newsletter to be notified when we publish our first articles on traditional nutrition.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
