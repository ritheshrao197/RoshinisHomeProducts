'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/ui/ProductCard';
import { ShieldCheck, Leaf, HeartHandshake, Package } from 'lucide-react';

const FEATURED_PRODUCTS = [
    {
        id: '1',
        name: 'Nutrimix (Siri Dhanyada Siri)',
        slug: 'nutrimix',
        price: 250,
        compare_price: 300,
        images: ['https://via.placeholder.com/600x600?text=Nutrimix'],
        short_desc: 'A healthy mix of millets and nuts for a nutritious start to your day.',
        category: 'Health Mix'
    },
    {
        id: '2',
        name: 'Ragi Chocobite',
        slug: 'ragi-chocobite',
        price: 150,
        compare_price: 180,
        images: ['https://via.placeholder.com/600x600?text=Ragi+Chocobite'],
        short_desc: 'Delicious and healthy ragi-based chocolate snacks.',
        category: 'Snacks'
    },
    {
        id: '3',
        name: 'Kashaya Powder',
        slug: 'kashaya-powder',
        price: 200,
        images: ['https://via.placeholder.com/600x600?text=Kashaya+Powder'],
        short_desc: 'Traditional Ayurvedic immunity booster.',
        category: 'Wellness'
    }
];

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative w-full py-20 md:py-32 bg-earth-100 overflow-hidden text-center md:text-left">
                    <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
                        <div className="md:w-1/2 flex flex-col justify-center space-y-6">
                            <span className="inline-block px-3 py-1 bg-earth-200 text-earth-600 rounded-full text-sm font-medium w-fit mb-2">Authentic Karnataka Heritage</span>
                            <h1 className="text-4xl md:text-6xl font-bold text-earth-600 tracking-tight">Pure, Natural<br />& Rooted in Tradition</h1>
                            <p className="max-w-[600px] text-lg text-earth-500 leading-relaxed text-center md:text-left">
                                Nourish your family with our handcrafted blend of millets, natural snacks, and traditional health mixes made exactly like grandmother used to.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                                <Link href="/shop">
                                    <Button size="lg" className="w-full sm:w-auto">Shop Now</Button>
                                </Link>
                                <Link href="/about">
                                    <Button variant="outline" size="lg" className="w-full sm:w-auto">Our Story</Button>
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 mt-10 md:mt-0 relative aspect-square max-w-md mx-auto">
                            <div className="absolute inset-0 bg-earth-200 rounded-full opacity-50 blur-3xl mix-blend-multiply"></div>
                            {/* Using a placeholder since we don't have natural assets yet */}
                            <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                                <Image
                                    src="https://via.placeholder.com/800x800?text=Healthy+Ingredients"
                                    alt="Natural Ingredients"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features / Why Choose Us */}
                <section className="py-16 bg-white">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-earth-600 tracking-tight">Why Choose Roshini's?</h2>
                            <div className="h-1 w-20 bg-earth-300 mx-auto mt-4 rounded-full"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Leaf, title: "100% Natural", desc: "No artificial colors, preservatives, or refined sugars." },
                                { icon: ShieldCheck, title: "Premium Quality", desc: "Sourced locally from trusted farmers in Karnataka." },
                                { icon: Package, title: "Freshly Made", desc: "Crafted in small batches to preserve freshness and nutrition." },
                                { icon: HeartHandshake, title: "Traditional Recipes", desc: "Ancestral wisdom packed into modern, convenient forms." }
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-6 rounded-xl bg-earth-50 border border-earth-100 transition-all hover:-translate-y-1 hover:shadow-lg">
                                    <div className="h-14 w-14 rounded-full bg-earth-200 flex items-center justify-center text-earth-600 mb-4">
                                        <feature.icon className="h-7 w-7" />
                                    </div>
                                    <h3 className="text-xl font-bold text-earth-600 mb-2">{feature.title}</h3>
                                    <p className="text-earth-500">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="py-20 bg-earth-50">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <h2 className="text-3xl font-bold text-earth-600 tracking-tight">Bestsellers</h2>
                                <div className="h-1 w-20 bg-earth-300 mt-4 rounded-full"></div>
                            </div>
                            <Link href="/shop" className="text-earth-600 font-medium hover:text-earth-400 group flex items-center gap-1 hidden sm:flex">
                                View all products <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {FEATURED_PRODUCTS.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-8 text-center sm:hidden">
                            <Link href="/shop">
                                <Button variant="outline" className="w-full">View all products</Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Ingredient Transparency */}
                <section className="py-20 bg-earth-600 text-white overflow-hidden">
                    <div className="container px-4 md:px-6 mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-video md:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="https://via.placeholder.com/800x800?text=Karnataka+Millets"
                                alt="Locally Sourced Millets"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nothing to Hide.<br />Everything to Nourish.</h2>
                            <p className="text-earth-100 text-lg mb-8 leading-relaxed">
                                We believe you deserve to know exactly what goes into your family's bodies. From our ragi sourced directly from Mandya farmers to pure jaggery entirely devoid of chemicals—every ingredient in Roshini's Home Products serves a nutritional purpose.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {[
                                    "Sprouted Finger Millet (Ragi)",
                                    "Premium Dry Fruits",
                                    "Chemical-free Jaggery",
                                    "Cold-pressed Oils",
                                    "Traditional Indian Spices",
                                    "NO Refined Sugar or Maida"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-earth-100">
                                        <div className="h-2 w-2 rounded-full bg-earth-300"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="secondary" size="lg">Read Our Quality Promise</Button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-white">
                    <div className="container px-4 md:px-6 mx-auto text-center">
                        <h2 className="text-3xl font-bold text-earth-600 tracking-tight mb-2">Loved by Families</h2>
                        <p className="text-earth-500 mb-12 max-w-2xl mx-auto">Don't just take our word for it. Here is what our community of health-conscious mothers and customers say.</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { name: "Sushma R.", role: "Mother of two", text: "The Ragi Chocobite is a lifesaver! My kids think they are getting chocolate every evening, and I have peace of mind knowing it's just pure ragi and jaggery." },
                                { name: "Praveen K.", role: "Fitness Enthusiast", text: "Nutrimix has completely replaced my expensive whey protein shakes. It keeps me full, digests well, and feels grounding. Highly recommend!" },
                                { name: "Ananya S.", role: "Working Professional", text: "The Kashaya powder is exactly how my grandmother used to make it in Udupi. A warm cup before bed instantly cures a sore throat." }
                            ].map((testimonial, i) => (
                                <div key={i} className="bg-earth-50 p-8 rounded-2xl relative">
                                    <div className="text-4xl text-earth-300 absolute top-4 left-4 opacity-50">"</div>
                                    <p className="text-earth-600 italic mb-6 relative z-10 leading-relaxed">"{testimonial.text}"</p>
                                    <div>
                                        <h4 className="font-bold text-earth-600">{testimonial.name}</h4>
                                        <p className="text-sm text-earth-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
