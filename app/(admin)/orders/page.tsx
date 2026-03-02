'use client';

import { useState, useEffect } from 'react';
import { Search, Download, Eye, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        setLoading(true);
        const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (data) setOrders(data);
        setLoading(false);
    }

    const filteredOrders = orders.filter(o =>
        (o.id.toLowerCase().includes(searchQuery.toLowerCase()) || o.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === '' || o.status === statusFilter)
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Orders</h1>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export CSV
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-earth-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-earth-100 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
                        <input
                            type="text"
                            placeholder="Search by Order ID or Customer..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400 text-sm"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="border border-earth-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-earth-400 text-earth-600"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-earth-50 text-earth-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Order ID</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Payment</th>
                                <th className="px-6 py-4 font-medium">Total</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium flex justify-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-100 text-sm text-earth-600">
                            {loading ? (
                                <tr><td colSpan={7} className="px-6 py-8 text-center text-earth-400">Loading orders...</td></tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr><td colSpan={7} className="px-6 py-8 text-center text-earth-400">No orders found.</td></tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-earth-50/50">
                                        <td className="px-6 py-4 font-medium text-earth-600" title={order.id}>{order.id.slice(0, 8)}...</td>
                                        <td className="px-6 py-4 text-earth-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{order.customer_name}</td>
                                        <td className="px-6 py-4 text-earth-500 capitalize">{order.payment_method}</td>
                                        <td className="px-6 py-4 font-medium">₹{order.total_amount}</td>
                                        <td className="px-6 py-4 text-transform: capitalize">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                order.status === 'shipped' ? 'bg-indigo-100 text-indigo-800' :
                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex items-center justify-end gap-2 text-earth-400">
                                            <button className="p-1.5 hover:text-earth-600 hover:bg-earth-100 rounded" title="View details"><Eye className="h-4 w-4" /></button>
                                            <button className="p-1.5 hover:text-indigo-600 hover:bg-indigo-50 rounded" title="Update Tracking"><Truck className="h-4 w-4" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
