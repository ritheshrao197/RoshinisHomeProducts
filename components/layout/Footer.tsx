import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-earth-600 text-earth-100 py-12">
            <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Roshini's</h3>
                    <p className="text-sm text-earth-200">
                        Authentic, natural, and healthy home products sourced and prepared with tradition and care in Karnataka.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/shop" className="hover:text-white transition-colors">Shop</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-white">Customer Service</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-white">Newsletter</h4>
                    <p className="text-sm text-earth-200 mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-3 py-2 bg-earth-500 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-earth-300 w-full"
                        />
                        <button type="submit" className="bg-earth-300 hover:bg-earth-200 text-earth-600 px-4 py-2 rounded-r-md font-medium transition-colors">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto px-4 md:px-6 mt-12 pt-8 border-t border-earth-500 text-sm text-earth-300 flex flex-col md:flex-row justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Roshini's Home Products. All rights reserved.</p>
                <p className="mt-2 md:mt-0">Made with ❤️ in Karnataka</p>
            </div>
        </footer>
    );
}
