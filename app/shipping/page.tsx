import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Shipping Policy | Roshini\'s Home Products',
};

export default function ShippingPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-earth-200 shadow-sm">
                    <h1 className="text-4xl font-bold text-earth-600 mb-8 text-center tracking-tight">Shipping Policy</h1>

                    <div className="prose prose-earth max-w-none text-earth-600 leading-relaxed space-y-6">
                        <p className="text-lg font-medium">
                            Orders are processed within 1–2 business days.
                        </p>
                        <p>
                            Delivery typically takes 3–7 business days depending on location.
                        </p>
                        <div className="bg-earth-50 p-6 rounded-xl border border-earth-100 mt-8">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-earth-400"></div>
                                    Shipping charges are calculated at checkout.
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span className="font-bold">Free shipping</span> on qualifying orders over ₹999.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
