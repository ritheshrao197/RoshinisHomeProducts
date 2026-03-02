'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function CouponsPage() {
    const [coupons] = useState([
        { id: '1', code: 'WELCOME10', discount_percent: 10, min_cart_value: 500, expiry_date: '2024-12-31', active: true, usage: 145 },
        { id: '2', code: 'DIWALI20', discount_percent: 20, min_cart_value: 1000, expiry_date: '2023-11-15', active: false, usage: 423 },
        { id: '3', code: 'FREESHIP', discount_percent: 0, min_cart_value: 300, expiry_date: '2024-06-30', active: true, usage: 89 },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Coupons & Discounts</h1>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Create Coupon
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-earth-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-earth-50 text-earth-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Coupon Code</th>
                                <th className="px-6 py-4 font-medium">Discount</th>
                                <th className="px-6 py-4 font-medium">Min Cart Value</th>
                                <th className="px-6 py-4 font-medium">Expiry Date</th>
                                <th className="px-6 py-4 font-medium">Usage</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium flex justify-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-100 text-sm text-earth-600">
                            {coupons.map(coupon => (
                                <tr key={coupon.id} className="hover:bg-earth-50/50">
                                    <td className="px-6 py-4 font-bold text-earth-600">{coupon.code}</td>
                                    <td className="px-6 py-4">{coupon.discount_percent > 0 ? `${coupon.discount_percent}% Off` : 'Free Shipping'}</td>
                                    <td className="px-6 py-4">₹{coupon.min_cart_value}</td>
                                    <td className="px-6 py-4 text-earth-500">{coupon.expiry_date}</td>
                                    <td className="px-6 py-4">{coupon.usage} times</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${coupon.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {coupon.active ? 'Active' : 'Expired'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-end gap-2 text-earth-400">
                                        <button className="p-1.5 hover:text-earth-600 hover:bg-earth-100 rounded text-earth-400" title="Edit">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded text-earth-400" title="Delete">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
