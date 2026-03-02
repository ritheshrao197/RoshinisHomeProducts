'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/hooks/useCartStore';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
    const { items, updateQuantity, removeItem, getCartTotal, getGstAmount } = useCartStore();
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');

    const subtotal = getCartTotal();
    const gst = getGstAmount();
    const isFreeShipping = subtotal >= 500;
    const shipping = isFreeShipping ? 0 : 50;

    const handleApplyCoupon = () => {
        // Dummy coupon validation logic (in real app, would call API)
        if (couponCode === 'WELCOME10') {
            if (subtotal >= 500) {
                setDiscount(subtotal * 0.10); // 10% off
                setCouponError('');
            } else {
                setCouponError('Minimum cart value of ₹500 required for this coupon.');
                setDiscount(0);
            }
        } else {
            setCouponError('Invalid coupon code.');
            setDiscount(0);
        }
    };

    const total = subtotal + gst + shipping - discount;

    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-earth-600 mb-8 flex items-center gap-3">
                    <ShoppingBag className="h-8 w-8" />
                    Your Cart
                </h1>

                {items.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded-lg border border-earth-200">
                        <h2 className="text-xl font-medium text-earth-500 mb-6">Your cart is currently empty.</h2>
                        <Link href="/shop">
                            <Button size="lg">Continue Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-grow space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-lg border border-earth-200">
                                    <div className="relative w-24 h-24 rounded-md overflow-hidden bg-earth-50 flex-shrink-0 border border-earth-100">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <Link href={`/shop/${item.id}`} className="font-bold text-lg text-earth-600 hover:text-earth-400 block mb-1">
                                            {item.name}
                                        </Link>
                                        <span className="text-earth-500 font-medium">₹{item.price}</span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center border border-earth-300 rounded-md bg-earth-50">
                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-earth-500 hover:text-earth-600 focus:outline-none">-</button>
                                            <span className="w-8 text-center font-medium text-earth-600 text-sm">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-earth-500 hover:text-earth-600 focus:outline-none">+</button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                            title="Remove item"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="w-24 text-right hidden sm:block">
                                        <span className="font-bold text-earth-600 text-lg">₹{item.price * item.quantity}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-96 flex-shrink-0">
                            <div className="bg-white p-6 rounded-lg border border-earth-200 sticky top-24">
                                <h2 className="text-xl font-bold text-earth-600 mb-6 pb-4 border-b border-earth-100">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-earth-500">
                                        <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                                        <span className="font-medium text-earth-600">₹{subtotal.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-earth-500">
                                        <span>Estimated GST (5%)</span>
                                        <span className="font-medium text-earth-600">₹{gst.toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between text-earth-500">
                                        <span>Shipping</span>
                                        {isFreeShipping ? (
                                            <span className="font-medium text-green-600">Free</span>
                                        ) : (
                                            <span className="font-medium text-earth-600">₹{shipping.toFixed(2)}</span>
                                        )}
                                    </div>
                                    {!isFreeShipping && (
                                        <p className="text-xs text-earth-400 text-right">Add ₹{500 - subtotal} more for Free Shipping</p>
                                    )}

                                    {/* Coupon section */}
                                    <div className="pt-4 border-t border-earth-100">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Coupon code"
                                                className="flex-grow px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400 uppercase"
                                            />
                                            <Button variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                                        </div>
                                        {couponError && <p className="text-red-500 text-xs mt-2">{couponError}</p>}
                                        {discount > 0 && (
                                            <div className="flex justify-between items-center text-green-600 mt-3 text-sm font-medium">
                                                <span>Discount ({couponCode})</span>
                                                <span>-₹{discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end border-t border-earth-200 pt-6 mb-8">
                                    <h3 className="text-lg font-medium text-earth-600">Total</h3>
                                    <div className="text-right">
                                        <span className="block text-2xl font-bold text-earth-600">₹{total.toFixed(2)}</span>
                                        <span className="text-xs text-earth-400">Includes taxes and shipping</span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="block w-full">
                                    <Button size="lg" className="w-full text-lg shadow-md">Proceed to Checkout</Button>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-earth-400 text-sm">
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Secure Checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

// Inline fallback for ShieldCheck if not imported above
function ShieldCheck(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
