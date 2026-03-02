import { supabase } from '@/lib/supabase';
import { Package, TrendingUp, ShoppingBag, ShoppingCart, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    // Fetch live data from Supabase
    const [{ data: orders }, { data: products }, { data: customers }] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*'),
        supabase.from('customers').select('*')
    ]);

    const safeOrders = orders || [];
    const safeProducts = products || [];
    const safeCustomers = customers || [];

    const totalSales = safeOrders.reduce((sum: number, order: any) => sum + (order.total_amount || 0), 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = safeOrders.filter((o: any) => new Date(o.created_at) >= today).length;
    const activeCustomers = safeCustomers.length;

    const lowStockProducts = safeProducts.filter((p: any) => p.stock < 20);
    const lowStockItemsCount = lowStockProducts.length;

    const unfulfilledOrders = safeOrders.filter((o: any) => o.status === 'pending' || o.status === 'processing');

    const recentOrders = safeOrders.slice(0, 5);

    return (
        <div className="space-y-6">

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-earth-600">₹{totalSales.toLocaleString()}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Orders Today</p>
                        <h3 className="text-2xl font-bold text-earth-600">{ordersToday}</h3>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm flex items-center gap-4">
                    <div className="h-14 w-14 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                        <Package className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Customers</p>
                        <h3 className="text-2xl font-bold text-earth-600">{activeCustomers}</h3>
                    </div>
                </div>

                <div className={`p-6 rounded-xl border shadow-sm flex items-center gap-4 ${lowStockItemsCount > 0 ? 'bg-red-50/50 border-red-200' : 'bg-white border-earth-200'}`}>
                    <div className={`h-14 w-14 rounded-lg flex items-center justify-center flex-shrink-0 ${lowStockItemsCount > 0 ? 'bg-red-100 text-red-600' : 'bg-earth-100 text-earth-500'}`}>
                        <AlertCircle className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-earth-500">Low Stock Alerts</p>
                        <h3 className={`text-2xl font-bold ${lowStockItemsCount > 0 ? 'text-red-600' : 'text-earth-600'}`}>{lowStockItemsCount} Items</h3>
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
                                {recentOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-earth-400">No recent orders.</td>
                                    </tr>
                                ) : (
                                    recentOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-earth-50/50">
                                            <td className="px-6 py-4 font-medium text-earth-600" title={order.id}>{order.id.slice(0, 8)}...</td>
                                            <td className="px-6 py-4">{order.customer_name}</td>
                                            <td className="px-6 py-4 font-medium">₹{order.total_amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'processing' || order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-earth-400">{new Date(order.created_at).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Action Required */}
                <div className="bg-white rounded-xl border border-earth-200 shadow-sm p-6">
                    <h3 className="text-lg font-bold text-earth-600 mb-6">Action Required</h3>

                    <div className="space-y-4">
                        {lowStockItemsCount > 0 ? (
                            <div className="p-4 border border-red-200 bg-red-50 rounded-lg flex gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-red-700">Restock Needed ({lowStockItemsCount})</h4>
                                    <p className="text-xs text-red-600 mt-1">
                                        {lowStockProducts.slice(0, 2).map((p: any) => p.name).join(', ')}
                                        {lowStockItemsCount > 2 ? ` and ${lowStockItemsCount - 2} more...` : ''}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex gap-3">
                                <Package className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-green-700">Inventory Good</h4>
                                    <p className="text-xs text-green-600 mt-1">All products are adequately stocked.</p>
                                </div>
                            </div>
                        )}

                        {unfulfilledOrders.length > 0 ? (
                            <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg flex gap-3">
                                <ShoppingCart className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-yellow-700">Unfulfilled Orders</h4>
                                    <p className="text-xs text-yellow-600 mt-1">You have {unfulfilledOrders.length} orders waiting to be packed.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 border border-green-200 bg-green-50 rounded-lg flex gap-3">
                                <ShoppingCart className="h-5 w-5 text-green-600 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-green-700">All Caught Up</h4>
                                    <p className="text-xs text-green-600 mt-1">No pending orders to fulfill right now.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
