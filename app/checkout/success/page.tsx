'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, Package, Mail } from 'lucide-react';

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'ORD-' + Math.floor(Math.random() * 1000000);
    const method = searchParams.get('method') || 'prepaid';

    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-earth-200 shadow-sm max-w-2xl w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-earth-600 mb-4">Order Confirmed!</h1>
                    <p className="text-lg text-earth-500 mb-8">
                        Thank you for your purchase. Your order has been received and is being processed.
                    </p>

                    <div className="bg-earth-50 p-6 rounded-xl border border-earth-100 text-left mb-8 flex flex-col md:flex-row gap-6 md:gap-12 justify-center">
                        <div>
                            <span className="text-sm font-medium text-earth-400 uppercase tracking-wider block mb-1">Order Number</span>
                            <span className="font-bold text-earth-600 font-mono text-lg">{orderId}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-earth-400 uppercase tracking-wider block mb-1">Payment Method</span>
                            <span className="font-bold text-earth-600 text-lg uppercase">{method}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 border-b border-earth-100 pb-10 text-left">
                        <div className="flex gap-4">
                            <div className="bg-earth-100 p-3 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-earth-600">
                                <Package className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-earth-600">Shipping Standard</h3>
                                <p className="text-sm text-earth-500">Delivery expected in 3-5 business days.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-earth-100 p-3 rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center text-earth-600">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-earth-600">Email Confirmation</h3>
                                <p className="text-sm text-earth-500">A receipt has been sent to your email.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/shop">
                            <Button size="lg" className="w-full sm:w-auto">Continue Shopping</Button>
                        </Link>
                        <Link href="/(admin)/dashboard">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">View Admin Orders</Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
