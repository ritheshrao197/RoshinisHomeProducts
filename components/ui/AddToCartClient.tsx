'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/hooks/useCartStore';

interface AddToCartClientProps {
    product: {
        id: string;
        name: string;
        price: number;
        image: string;
    };
}

export function AddToCartClient({ product }: AddToCartClientProps) {
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore(state => state.addItem);

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image
        });
        alert('Added to cart!');
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-earth-300 rounded-md bg-white">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-earth-500 hover:text-earth-600 focus:outline-none"
                    aria-label="Decrease quantity"
                >
                    -
                </button>
                <span className="w-12 text-center font-medium text-earth-600">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-earth-500 hover:text-earth-600 focus:outline-none"
                    aria-label="Increase quantity"
                >
                    +
                </button>
            </div>
            <Button size="lg" className="flex-grow text-lg" onClick={handleAddToCart}>
                Add to Cart
            </Button>
        </div>
    );
}
