import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { Check, Info, Shield, MessageCircle } from 'lucide-react';
import { AddToCartClient } from '@/components/ui/AddToCartClient';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: { slug: string } }) {
    // Fetch product eagerly on the server
    const { data: product, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .single();

    if (error || !product) {
        // Fallback or 404
        notFound();
    }

    const activeImage = product.images?.[0] || 'https://via.placeholder.com/600';

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
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4">
                                {product.images.map((img: string, idx: number) => (
                                    <button key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-earth-300 transition-colors">
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

                        <p className="text-earth-500 mb-8 leading-relaxed text-lg">{product.description || product.short_desc}</p>

                        {/* Add to Cart Actions (Client Component) */}
                        <AddToCartClient
                            product={{
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: activeImage
                            }}
                        />

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
                                    <p className="text-sm text-earth-400 mt-2 italic">Full ingredient transparency on every pack.</p>
                                </div>
                            )}

                            {product.benefits && product.benefits.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-earth-600 mb-3 block">Why You'll Love It</h3>
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

                            {/* Storage & FAQ */}
                            <div className="mt-8 pt-8 border-t border-earth-100">
                                <h3 className="text-lg font-bold text-earth-600 mb-2">Storage Instructions</h3>
                                <p className="text-earth-500 mb-6">Store in a cool, dry place. Keep airtight after opening.</p>

                                <h3 className="text-lg font-bold text-earth-600 mb-4">FAQs</h3>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold text-earth-600">Is it suitable for diabetics?</h4>
                                        <p className="text-earth-500 text-sm mt-1">It contains no added sugar, but we recommend consulting your doctor for personalized advice.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-earth-600">Is it safe for kids?</h4>
                                        <p className="text-earth-500 text-sm mt-1">Yes. Suitable for children above 1 year.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
