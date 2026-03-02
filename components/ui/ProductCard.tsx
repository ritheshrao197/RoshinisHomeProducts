'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { useCartStore } from '@/hooks/useCartStore';

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    compare_price?: number;
    images: string[];
    short_desc: string;
    category: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.images[0] || 'https://via.placeholder.com/300',
        });
        // In a real app we'd trigger a toast notification here
    };

    return (
        <div className="group relative rounded-lg border border-earth-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md flex flex-col h-full">
            <Link href={`/shop/${product.slug}`} className="block flex-grow">
                <div className="relative aspect-square overflow-hidden rounded-md bg-earth-50 mb-4">
                    <Image
                        src={product.images[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    />
                </div>
                <div className="flex flex-col flex-grow">
                    <span className="text-xs text-earth-400 font-medium tracking-wider uppercase mb-1">{product.category}</span>
                    <h3 className="text-lg font-bold text-earth-600 mb-1">{product.name}</h3>
                    <p className="text-sm text-earth-500 line-clamp-2 mb-3">{product.short_desc}</p>
                </div>
            </Link>

            <div className="mt-auto pt-4 border-t border-earth-100 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-lg font-bold text-earth-600">₹{product.price}</span>
                    {product.compare_price && (
                        <span className="text-xs text-earth-400 line-through">₹{product.compare_price}</span>
                    )}
                </div>
                <Button onClick={handleAddToCart} size="sm" variant="primary">Add to Cart</Button>
            </div>
        </div>
    );
}
