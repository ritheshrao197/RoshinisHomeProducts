import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ProductCard, Product } from '@/components/ui/ProductCard';

export const dynamic = 'force-dynamic';

export default async function ShopPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const category = searchParams.category as string | undefined;
    const sort = searchParams.sort as string | undefined;

    let query = supabase.from('products').select('*');

    if (category) {
        query = query.eq('category', category);
    }

    if (sort === 'price_asc') {
        query = query.order('price', { ascending: true });
    } else if (sort === 'price_desc') {
        query = query.order('price', { ascending: false });
    } else {
        query = query.order('created_at', { ascending: false });
    }

    const { data: dbProducts, error } = await query;

    // Fallback if DB is not connected locally
    const products: Product[] = error || !dbProducts ? [
        {
            id: '1', name: 'Nutrimix (Siri Dhanyada Siri)', slug: 'nutrimix', price: 250, compare_price: 300,
            images: ['https://via.placeholder.com/600x600?text=Nutrimix'], short_desc: 'A healthy mix of millets and nuts.', category: 'Health Mix'
        },
        {
            id: '2', name: 'Ragi Chocobite', slug: 'ragi-chocobite', price: 150, compare_price: 180,
            images: ['https://via.placeholder.com/600x600?text=Ragi+Chocobite'], short_desc: 'Delicious and healthy ragi-based chocolate snacks.', category: 'Snacks'
        },
        {
            id: '3', name: 'Kashaya Powder', slug: 'kashaya-powder', price: 200,
            images: ['https://via.placeholder.com/600x600?text=Kashaya+Powder'], short_desc: 'Traditional Ayurvedic immunity booster.', category: 'Wellness'
        }
    ] : (dbProducts as Product[]);

    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-lg border border-earth-200 sticky top-24">
                            <h2 className="text-xl font-bold text-earth-600 mb-4">Filters</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-semibold text-earth-500 mb-2">Category</h3>
                                    <ul className="space-y-2 text-sm text-earth-600">
                                        <li><a href="/shop" className={`hover:text-earth-400 ${!category ? 'font-bold' : ''}`}>All Products</a></li>
                                        <li><a href="/shop?category=Health Mixes" className={`hover:text-earth-400 ${category === 'Health Mixes' ? 'font-bold' : ''}`}>Health Mixes</a></li>
                                        <li><a href="/shop?category=Seeds" className={`hover:text-earth-400 ${category === 'Seeds' ? 'font-bold' : ''}`}>Seeds</a></li>
                                        <li><a href="/shop?category=Herbal" className={`hover:text-earth-400 ${category === 'Herbal' ? 'font-bold' : ''}`}>Herbal</a></li>
                                        <li><a href="/shop?category=Skincare" className={`hover:text-earth-400 ${category === 'Skincare' ? 'font-bold' : ''}`}>Skincare</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-earth-500 mb-2">Sort By</h3>
                                    <ul className="space-y-2 text-sm text-earth-600">
                                        <li><a href={`/shop?${category ? `category=${category}&` : ''}sort=newest`} className={`hover:text-earth-400 ${sort !== 'price_asc' && sort !== 'price_desc' ? 'font-bold' : ''}`}>Newest Arrivals</a></li>
                                        <li><a href={`/shop?${category ? `category=${category}&` : ''}sort=price_asc`} className={`hover:text-earth-400 ${sort === 'price_asc' ? 'font-bold' : ''}`}>Price: Low to High</a></li>
                                        <li><a href={`/shop?${category ? `category=${category}&` : ''}sort=price_desc`} className={`hover:text-earth-400 ${sort === 'price_desc' ? 'font-bold' : ''}`}>Price: High to Low</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-earth-600">Shop All Products</h1>
                                <p className="text-earth-500 mt-2">Explore our range of natural health mixes, seeds, herbal blends, and skincare products. Carefully made without preservatives or added sugar.</p>
                            </div>
                            <span className="text-earth-500 text-sm hidden sm:block whitespace-nowrap ml-4">{products.length} Products</span>
                        </div>
                        {products.length === 0 ? (
                            <div className="bg-white p-12 text-center rounded-lg border border-earth-200">
                                <p className="text-earth-500">No products found matching your criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
