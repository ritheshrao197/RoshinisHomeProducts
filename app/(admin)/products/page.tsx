'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Search, MoreVertical } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([
        { id: '1', name: 'Nutrimix (Siri Dhanyada Siri)', category: 'Health Mix', price: 250, stock: 100, is_featured: true },
        { id: '2', name: 'Ragi Chocobite', category: 'Snacks', price: 150, stock: 12, is_featured: true },
        { id: '3', name: 'Kashaya Powder', category: 'Wellness', price: 200, stock: 200, is_featured: false },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Products</h1>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-earth-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-earth-100 flex gap-4">
                    <div className="relative flex-grow max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-earth-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400 text-sm"
                        />
                    </div>
                    <select className="border border-earth-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-earth-400 text-earth-600">
                        <option value="">All Categories</option>
                        <option value="Health Mix">Health Mix</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Wellness">Wellness</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-earth-50 text-earth-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium flex justify-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-100 text-sm text-earth-600">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-earth-50/50">
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">₹{product.price}</td>
                                    <td className="px-6 py-4">
                                        <span className={`${product.stock < 20 ? 'text-red-500 font-bold' : ''}`}>
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td className="px-6 py-4 flex items-center justify-end gap-2 text-earth-400">
                                        <button className="p-1 hover:text-earth-600 hover:bg-earth-100 rounded" title="Edit"><Edit className="h-4 w-4" /></button>
                                        <button className="p-1 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                                        <button className="p-1 hover:text-earth-600 hover:bg-earth-100 rounded"><MoreVertical className="h-4 w-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-earth-100 flex items-center justify-between text-sm text-earth-500">
                    <span>Showing 1 to 3 of 3 entries</span>
                    <div className="flex gap-1">
                        <button className="px-3 py-1 border border-earth-200 rounded disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 bg-earth-600 text-white rounded">1</button>
                        <button className="px-3 py-1 border border-earth-200 rounded disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
