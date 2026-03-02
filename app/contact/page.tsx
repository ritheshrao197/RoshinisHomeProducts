import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Phone, MessageCircle } from 'lucide-react';

export const metadata = {
    title: 'Contact Us | Roshini\'s Home Products',
};

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-earth-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl border border-earth-200 shadow-sm text-center">
                    <h1 className="text-4xl font-bold text-earth-600 mb-4 tracking-tight">Get in Touch</h1>
                    <p className="text-lg text-earth-500 mb-12">
                        Have questions about our products?<br />We're here to help.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                        <div className="flex flex-col items-center p-6 bg-earth-50 rounded-xl border border-earth-100 text-center transition-transform hover:-translate-y-1">
                            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-earth-500 mb-4 shadow-sm">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-earth-600 mb-2">Email Us</h3>
                            <a href="mailto:support@roshinis.com" className="text-earth-500 hover:text-earth-400">support@roshinis.com</a>
                        </div>

                        <div className="flex flex-col items-center p-6 bg-earth-50 rounded-xl border border-earth-100 text-center transition-transform hover:-translate-y-1">
                            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-earth-500 mb-4 shadow-sm">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-earth-600 mb-2">Call Us</h3>
                            <a href="tel:+91XXXXXXXXXX" className="text-earth-500 hover:text-earth-400">+91 XXXXX XXXXX</a>
                        </div>

                        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-6 bg-[#25D366]/10 rounded-xl border border-[#25D366]/20 text-center transition-transform hover:-translate-y-1 cursor-pointer">
                            <div className="h-12 w-12 bg-[#25D366] text-white rounded-full flex items-center justify-center mb-4 shadow-md">
                                <MessageCircle className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-[#1ebd5a] mb-2">WhatsApp</h3>
                            <span className="text-[#25D366] font-medium">Click to Chat</span>
                        </a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
