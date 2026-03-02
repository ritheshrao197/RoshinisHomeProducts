'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '', slug: '', category: 'Health Mix', price: 0, stock: 0, short_desc: '', description: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        setLoading(true);
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data) setProducts(data);
        setLoading(false);
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) alert('Error deleting product');
        fetchProducts();
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name, slug: product.slug, category: product.category, price: product.price,
            stock: product.stock, short_desc: product.short_desc || '', description: product.description || ''
        });
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setEditingProduct(null);
        setFormData({ name: '', slug: '', category: 'Health Mix', price: 0, stock: 0, short_desc: '', description: '' });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                const { error, data } = await supabase.from('products').update(formData).eq('id', editingProduct.id).select();
                if (error) throw error;
            } else {
                const { error, data } = await supabase.from('products').insert([formData]).select();
                if (error) throw error;
            }
            setIsModalOpen(false);
            fetchProducts();
        } catch (err: any) {
            console.error('Save error:', err);
            alert(`Failed to save: ${err.message}`);
        }
    };

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Products</h1>
                <Button className="flex items-center gap-2" onClick={handleCreate}>
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400 text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-earth-50 text-earth-500 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Product Name</th>
                                <th className="px-6 py-4 font-medium">Category</th>
                                <th className="px-6 py-4 font-medium">Price</th>
                                <th className="px-6 py-4 font-medium">Stock</th>
                                <th className="px-6 py-4 font-medium flex justify-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-earth-100 text-sm text-earth-600">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-earth-400">Loading products...</td></tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr><td colSpan={5} className="px-6 py-8 text-center text-earth-400">No products found. Add one above!</td></tr>
                            ) : (
                                filteredProducts.map(product => (
                                    <tr key={product.id} className="hover:bg-earth-50/50">
                                        <td className="px-6 py-4 font-medium">{product.name}</td>
                                        <td className="px-6 py-4">{product.category}</td>
                                        <td className="px-6 py-4">₹{product.price}</td>
                                        <td className="px-6 py-4">
                                            <span className={`${product.stock < 20 ? 'text-red-500 font-bold' : ''}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 flex items-center justify-end gap-2 text-earth-400">
                                            <button onClick={() => handleEdit(product)} className="p-1 hover:text-earth-600 hover:bg-earth-100 rounded" title="Edit"><Edit className="h-4 w-4" /></button>
                                            <button onClick={() => handleDelete(product.id)} className="p-1 hover:text-red-600 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-earth-100 text-earth-600">
                            <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-earth-400 hover:text-earth-600"><X className="h-5 w-5" /></button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-earth-600 mb-1">Name</label>
                                    <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-600 mb-1">Slug URL</label>
                                    <input required value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-earth-600 mb-1">Category</label>
                                    <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border border-earth-300 rounded-md">
                                        <option value="Health Mix">Health Mix</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Wellness">Wellness</option>
                                        <option value="Health Mixes">Health Mixes</option>
                                        <option value="Seeds">Seeds</option>
                                        <option value="Herbal">Herbal</option>
                                        <option value="Skincare">Skincare</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-earth-600 mb-1">Price (₹)</label>
                                        <input required type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-earth-600 mb-1">Stock</label>
                                        <input required type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-earth-600 mb-1">Short Description</label>
                                    <input required value={formData.short_desc} onChange={(e) => setFormData({ ...formData, short_desc: e.target.value })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-earth-600 mb-1">Full Description</label>
                                    <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-earth-300 rounded-md" />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-4 border-t border-earth-100">
                                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit">{editingProduct ? 'Save Changes' : 'Create Product'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
