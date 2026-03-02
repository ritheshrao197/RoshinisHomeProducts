import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SuccessContent from '@/components/checkout/SuccessContent';

export default function OrderSuccessPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
                <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center bg-earth-50 text-earth-600">
                        Loading your order details...
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}
