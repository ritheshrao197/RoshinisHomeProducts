import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Refund Policy | Roshini\'s Home Products',
};

export default function RefundPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-earth-200 shadow-sm">
                    <h1 className="text-4xl font-bold text-earth-600 mb-8 text-center tracking-tight">Refund Policy</h1>

                    <div className="prose prose-earth max-w-none text-earth-600 leading-relaxed space-y-6 text-center md:text-left">
                        <div className="bg-red-50 text-red-800 p-6 rounded-xl border border-red-100 mb-8">
                            <p className="font-medium">
                                Due to the nature of food products, we do not accept returns once the product is opened.
                            </p>
                        </div>

                        <p className="text-lg">
                            If you receive a damaged or incorrect item, please <a href="/contact" className="text-earth-500 font-bold underline hover:text-earth-400">contact us</a> within <span className="font-bold text-earth-600">48 hours</span> of delivery. We will arrange a replacement or refund immediately based on the situation.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
