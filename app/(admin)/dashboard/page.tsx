import { supabase } from '@/lib/supabase';
import { Package, TrendingUp, ShoppingBag, ShoppingCart, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Simulated stats fetch. In production, these run aggregations in Supabase
    const stats = {
        totalSales: 124500,
        ordersToday: 24,
        activeCustomers: 156,
        lowStockItems: 3
    };

    const recentOrders = [
        { id: 'ORD-1001', customer: 'Sushma R.', amount: 450, status: 'Processing', date: 'Just now' },
        { id: 'ORD-1002', customer: 'Praveen K.', amount: 1200, status: 'Completed', date: '2 hours ago' },
        { id: 'ORD-1003', customer: 'Ananya S.', amount: 250, status: 'Pending', date: '4 hours ago' },
        { id: 'ORD-1004', customer: 'Kiran M.', amount: 800, status: 'Completed', date: '1 day ago' },
    ];

    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Total Sales</p>
                        <h3 className="text-2xl font-bold text-earth-600">₹{stats.totalSales.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Orders Today</p>
                        <h3 className="text-2xl font-bold text-earth-600">{stats.ordersToday}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <Package className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Active Products</p>
                        <h3 className="text-2xl font-bold text-earth-600">12</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-red-200 shadow-sm flex items-center gap-4 bg-red-50/50">
                    <div className="h-14 w-14 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Low Stock Alerts</p>
                        <h3 className="text-2xl font-bold text-red-600">{stats.lowStockItems} Items</h3>
                    </div>
                </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-earth-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-earth-100 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-earth-600">Recent Orders</h3>
                        <a href="/orders" className="text-sm font-medium text-earth-500 hover:text-earth-600">View All</a>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left">
                            <thead className="bg-earth-50 text-earth-500 text-sm">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Order ID</th>
                                    <th className="px-6 py-4 font-medium">Customer</th>
                                    <th className="px-6 py-4 font-medium">Amount</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-earth-100 text-earth-600 text-sm">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-earth-50/50">
                                        <td className="px-6 py-4 font-medium text-earth-600">{order.id}</td>
                                        <td className="px-6 py-4">{order.customer}</td>
                                        <td className="px-6 py-4 font-medium">₹{order.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-earth-400">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Required */}
                <div className="bg-white rounded-xl border border-earth-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-earth-600 mb-6">Action Required</h3>

                    <div className="space-y-4">
                        <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex gap-3">
                            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-red-700">Restock Needed</h4>
                                <p className="text-xs text-red-600 mt-1">Ragi Chocobite is running low (12 units left).</p>
                            </div>
                        </div>

                        <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex gap-3">
                            <ShoppingCart className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-yellow-700">Unfulfilled Orders</h4>
                                <p className="text-xs text-yellow-600 mt-1">You have 5 orders waiting to be packed.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
