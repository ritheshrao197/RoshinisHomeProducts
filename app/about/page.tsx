import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
    title: 'Our Story | Roshini\'s Home Products',
    description: 'Learn about Roshini\'s Home Products, our mission, and our commitment to clean, honest nutrition.',
};

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-earth-200 shadow-sm">
                    <h1 className="text-4xl font-bold text-earth-600 mb-8 text-center tracking-tight">Our Story</h1>

                    <div className="prose prose-earth max-w-none text-earth-600 leading-relaxed space-y-6">
                        <p className="text-lg">
                            Roshini's Home Products began with a simple idea — bring back clean, honest nutrition to everyday homes.
                        </p>
                        <p>
                            What started in a home kitchen quickly grew into a trusted brand known for quality and transparency. Our recipes are inspired by traditional Indian wellness practices and prepared with care in small batches.
                        </p>
                        <p className="font-medium text-xl text-earth-600 mt-8 mb-4 border-l-4 border-earth-400 pl-4">
                            We believe health does not need artificial flavoring or chemical shortcuts.
                        </p>

                        <h3 className="text-2xl font-bold text-earth-600 mt-10 mb-4">Every product is made with:</h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 list-none p-0">
                            {['Carefully selected ingredients', 'No added sugar', 'No preservatives', 'No unnecessary fillers'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 bg-earth-50 p-3 rounded-lg border border-earth-100">
                                    <div className="h-2 w-2 rounded-full bg-earth-400 flex-shrink-0"></div>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <p className="text-lg font-medium text-center mt-12 bg-earth-100 p-6 rounded-xl italic">
                            "We are proud to serve families who value purity over marketing."
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
