'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/hooks/useCartStore';
import { supabase } from '@/lib/supabase';
import { Check, Info, Shield, MessageCircle } from 'lucide-react';

export default function ProductPage({ params }: { params: { slug: string } }) {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore(state => state.addItem);

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', params.slug)
                .single();

            if (data && !error) {
                setProduct(data);
            } else {
                // Fallback for demo without DB connection
                setProduct({
                    id: '1',
                    name: 'Nutrimix (Siri Dhanyada Siri)',
                    slug: 'nutrimix',
                    price: 250,
                    compare_price: 300,
                    images: ['https://via.placeholder.com/600x600?text=Nutrimix'],
                    short_desc: 'A healthy mix of millets and nuts for a nutritious start to your day.',
                    description: 'Nutrimix is a carefully crafted blend of traditional millets, nuts, and natural ingredients. It provides essential nutrients, fiber, and protein. Perfect for growing children and adults seeking a healthy lifestyle.',
                    ingredients: ['Ragi', 'Almonds', 'Cashews', 'Cardamom', 'Jaggery'],
                    benefits: ['Boosts immunity', 'High in fiber', 'Rich in natural protein'],
                    stock: 100,
                    category: 'Health Mix'
                });
            }
            setLoading(false);
        }
        fetchProduct();
    }, [params.slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-earth-50">Loading...</div>;
    if (!product) return <div className="min-h-screen flex items-center justify-center bg-earth-50">Product not found.</div>;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0] || 'https://via.placeholder.com/300'
        });
        alert('Added to cart!');
    };

    const activeImage = product.images[0] || 'https://via.placeholder.com/600';

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-earth-50 border border-earth-100">
                            <Image src={activeImage} alt={product.name} fill className="object-cover" />
                        </div>
                        {product.images.length > 1 && (
                            <div className="flex gap-4">
                                {product.images.map((img: string, idx: number) => (
                                    <button key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-earth-300">
                                        <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-earth-400 uppercase tracking-wider mb-2">{product.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-earth-600 mb-4">{product.name}</h1>

                        <div className="flex items-end gap-3 mb-6">
                            <span className="text-3xl font-bold text-earth-600">₹{product.price}</span>
                            {product.compare_price && (
                                <span className="text-lg text-earth-400 line-through mb-1">₹{product.compare_price}</span>
                            )}
                        </div>

                        <p className="text-earth-500 mb-8 leading-relaxed text-lg">{product.description}</p>

                        {/* Add to Cart Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-earth-300 rounded-md bg-white">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-earth-500 hover:text-earth-600 focus:outline-none">-</button>
                                <span className="w-12 text-center font-medium text-earth-600">{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-earth-500 hover:text-earth-600 focus:outline-none">+</button>
                            </div>
                            <Button size="lg" className="flex-grow text-lg" onClick={handleAddToCart}>Add to Cart</Button>
                        </div>

                        <div className="mb-8">
                            <a
                                href={`https://wa.me/91XXXXXXXXXX?text=I'm interested in ordering ${product.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-md font-medium hover:bg-[#1ebd5a] transition-colors"
                            >
                                <MessageCircle className="h-5 w-5" />
                                Order via WhatsApp
                            </a>
                        </div>

                        {/* Guarantees */}
                        <div className="grid grid-cols-2 gap-4 mb-10 py-6 border-y border-earth-100">
                            <div className="flex items-center gap-3 text-earth-600">
                                <Shield className="h-5 w-5 text-earth-400" />
                                <span className="text-sm font-medium">100% Authentic Quality</span>
                            </div>
                            <div className="flex items-center gap-3 text-earth-600">
                                <Info className="h-5 w-5 text-earth-400" />
                                <span className="text-sm font-medium">No Artificial Preservatives</span>
                            </div>
                        </div>

                        {/* Ingredients & Benefits */}
                        <div className="space-y-6">
                            {product.ingredients && product.ingredients.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-earth-600 mb-3 flex items-center gap-2">
                                        Ingredients
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.ingredients.map((ing: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-earth-50 text-earth-500 rounded-full text-sm border border-earth-100">
                                                {ing}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.benefits && product.benefits.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-earth-600 mb-3 block">Key Benefits</h3>
                                    <ul className="space-y-2">
                                        {product.benefits.map((ben: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-earth-500">
                                                <Check className="h-5 w-5 text-earth-400 flex-shrink-0" />
                                                <span>{ben}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
