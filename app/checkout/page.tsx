'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/hooks/useCartStore';

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal, getGstAmount, clearCart } = useCartStore();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: 'Karnataka',
        pincode: '',
    });

    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'phonepe' | 'payu'>('phonepe');
    const [isProcessing, setIsProcessing] = useState(false);

    // If cart is empty, redirect to shop
    if (items.length === 0 && typeof window !== 'undefined') {
        router.push('/shop');
        return null;
    }

    const subtotal = getCartTotal();
    const gst = getGstAmount();
    const isFreeShipping = subtotal >= 500;
    const shipping = isFreeShipping ? 0 : 50;
    const total = subtotal + gst + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const orderPayload = {
            customer: formData,
            items: items,
            amount: total,
            method: paymentMethod,
        };

        try {
            if (paymentMethod === 'cod') {
                // Handle Cash on Delivery (simulated API call)
                await new Promise((resolve) => setTimeout(resolve, 1000));
                clearCart();
                router.push('/checkout/success?orderId=ORD-MOCK-1234&method=cod');
            } else if (paymentMethod === 'phonepe') {
                // Call PhonePe Initiation API
                const response = await fetch('/api/payments/phonepe/initiate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderPayload),
                });
                const data = await response.json();

                if (data.success && data.redirectUrl) {
                    window.location.href = data.redirectUrl;
                } else {
                    alert('Failed to initiate PhonePe payment. Test environment might not be configured.');
                    setIsProcessing(false);
                }
            } else if (paymentMethod === 'payu') {
                // Call PayU Initiation API
                const response = await fetch('/api/payments/payu/initiate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderPayload),
                });
                const data = await response.json();

                if (data.success && data.formHtml) {
                    // Render form and submit automatically
                    const formContainer = document.createElement('div');
                    formContainer.innerHTML = data.formHtml;
                    document.body.appendChild(formContainer);
                    (formContainer.querySelector('form') as HTMLFormElement).submit();
                } else {
                    alert('Failed to initiate PayU payment.');
                    setIsProcessing(false);
                }
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred during checkout.');
            setIsProcessing(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-earth-600 mb-8">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-grow space-y-6">
                        <form id="checkout-form" onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-earth-200">
                            <h2 className="text-xl font-bold text-earth-600 mb-6 pb-2 border-b border-earth-100">Shipping Details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-earth-500 mb-1">Full Name</label>
                                    <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-500 mb-1">Email Address</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-500 mb-1">Phone Number</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-earth-500 mb-1">Address Line 1</label>
                                    <input required name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-500 mb-1">Address Line 2 (Optional)</label>
                                    <input name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-earth-500 mb-1">City</label>
                                        <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-earth-500 mb-1">State</label>
                                        <select name="state" value={formData.state} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400">
                                            <option value="Karnataka">Karnataka</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Tamil Nadu">Tamil Nadu</option>
                                            <option value="Kerala">Kerala</option>
                                            {/* Add other states */}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-earth-500 mb-1">PIN Code</label>
                                        <input required name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="bg-white p-6 rounded-lg border border-earth-200">
                            <h2 className="text-xl font-bold text-earth-600 mb-6 pb-2 border-b border-earth-100">Payment Method</h2>

                            <div className="space-y-4">
                                <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'phonepe' ? 'border-earth-600 bg-earth-50' : 'border-earth-200 hover:border-earth-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="phonepe" checked={paymentMethod === 'phonepe'} onChange={() => setPaymentMethod('phonepe')} className="h-4 w-4 text-earth-600 focus:ring-earth-500" />
                                        <span className="ml-3 font-medium text-earth-600">UPI / QR (PhonePe Gateway)</span>
                                    </div>
                                    <p className="ml-7 mt-1 text-sm text-earth-500">Pay securely using any UPI app like PhonePe, GPay, Paytm.</p>
                                </label>

                                <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'payu' ? 'border-earth-600 bg-earth-50' : 'border-earth-200 hover:border-earth-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="payu" checked={paymentMethod === 'payu'} onChange={() => setPaymentMethod('payu')} className="h-4 w-4 text-earth-600 focus:ring-earth-500" />
                                        <span className="ml-3 font-medium text-earth-600">Credit / Debit Cards / Net Banking (PayU)</span>
                                    </div>
                                    <p className="ml-7 mt-1 text-sm text-earth-500">All major cards and banks supported via PayU.</p>
                                </label>

                                <label className={`block p-4 border rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-earth-600 bg-earth-50' : 'border-earth-200 hover:border-earth-300'}`}>
                                    <div className="flex items-center">
                                        <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-earth-600 focus:ring-earth-500" />
                                        <span className="ml-3 font-medium text-earth-600">Cash on Delivery</span>
                                    </div>
                                    <p className="ml-7 mt-1 text-sm text-earth-500">Pay physically when the order arrives.</p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-96 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg border border-earth-200 sticky top-24">
                            <h2 className="text-xl font-bold text-earth-600 mb-6 pb-2 border-b border-earth-100">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-earth-500">{item.quantity}x {item.name}</span>
                                        <span className="text-earth-600 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 border-t border-earth-100 pt-4 mb-6">
                                <div className="flex justify-between text-sm text-earth-500">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-earth-500">
                                    <span>GST (5%)</span>
                                    <span>₹{gst.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-earth-500">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-earth-200 pt-4 mb-8">
                                <h3 className="text-lg font-medium text-earth-600">Total</h3>
                                <span className="text-2xl font-bold text-earth-600">₹{total.toFixed(2)}</span>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                size="lg"
                                className="w-full text-lg shadow-md"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
