export function ProductJsonLd({ product }: { product: any }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images[0],
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: "Roshini's Home Products",
        },
        offers: {
            '@type': 'Offer',
            url: `https://roshinishomeproducts.com/shop/${product.slug}`,
            priceCurrency: 'INR',
            price: product.price,
            availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
