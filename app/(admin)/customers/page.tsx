'use client';

import { useState } from 'react';
import { Search, Mail } from 'lucide-react';

export default function CustomersPage() {
    const [customers] = useState([
        { id: 'CUST-001', name: 'Sushma R.', email: 'sushma@example.com', phone: '+91 9876543210', totalOrders: 5, spent: 2450, joined: 'Aug 12, 2023' },
        { id: 'CUST-002', name: 'Praveen K.', email: 'praveen@example.com', phone: '+91 9876543211', totalOrders: 2, spent: 1700, joined: 'Sep 05, 2023' },
        { id: 'CUST-003', name: 'Ananya S.', email: 'ananya@example.com', phone: '+91 9876543212', totalOrders: 1, spent: 250, joined: 'Oct 23, 2023' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Customers</h1>
            </div>

            <div className="bg-white rounded-xl border border-earth-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-earth-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400 text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-earth-50 text-earth-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Customer Name</th>
                                <th className="px-6 py-4 font-medium">Contact</th>
                                <th className="px-6 py-4 font-medium">Orders</th>
                                <th className="px-6 py-4 font-medium">Total Spent</th>
                                <th className="px-6 py-4 font-medium">Joined</th>
                                <th className="px-6 py-4 font-medium flex justify-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-100 text-sm text-earth-600">
                            {customers.map(customer => (
                                <tr key={customer.id} className="hover:bg-earth-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-earth-200 flex items-center justify-center text-earth-600 font-bold flex-shrink-0">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-earth-600">{customer.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-earth-600">{customer.email}</div>
                                        <div className="text-xs text-earth-400">{customer.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{customer.totalOrders}</td>
                                    <td className="px-6 py-4 font-medium text-green-600">₹{customer.spent}</td>
                                    <td className="px-6 py-4 text-earth-500">{customer.joined}</td>
                                    <td className="px-6 py-4 flex items-center justify-end">
                                        <button className="p-1.5 hover:text-earth-600 hover:bg-earth-100 rounded text-earth-400" title="Send Email">
                                            <Mail className="h-4 w-4" />
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
