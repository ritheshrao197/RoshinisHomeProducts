import { Button } from '@/components/ui/Button';

export default function ContentPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-earth-600">Content Management</h1>
                <Button>Save Changes</Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Homepage Banner */}
                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm relative">
                    <h2 className="text-xl font-bold text-earth-600 mb-6 pb-2 border-b border-earth-100">Hero Section Content</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-earth-500 mb-1">Hero Badge Text</label>
                            <input type="text" defaultValue="Authentic Karnataka Heritage" className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-500 mb-1">Main Headline</label>
                            <textarea rows={2} defaultValue="Pure, Natural & Rooted in Tradition" className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-500 mb-1">Subheadline text</label>
                            <textarea rows={3} defaultValue="Nourish your family with our handcrafted blend of millets, natural snacks, and traditional health mixes made exactly like grandmother used to." className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                        </div>
                    </div>
                </div>

                {/* Global Announcement Bar */}
                <div className="bg-white p-6 rounded-xl border border-earth-200 shadow-sm relative">
                    <h2 className="text-xl font-bold text-earth-600 mb-6 pb-2 border-b border-earth-100">Announcement Bar</h2>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <input type="checkbox" id="announce-active" defaultChecked className="h-4 w-4 text-earth-600 rounded" />
                            <label htmlFor="announce-active" className="text-sm font-medium text-earth-600">Enable Announcement Bar</label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-500 mb-1">Announcement Text</label>
                            <input type="text" defaultValue="Free shipping on orders over ₹500! Use code WELCOME10 for 10% off." className="w-full px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-earth-500 mb-1">Background Color (Tailwind class or Hex)</label>
                            <div className="flex gap-2">
                                <input type="text" defaultValue="bg-earth-600" className="flex-grow px-3 py-2 border border-earth-300 rounded-md focus:outline-none focus:ring-1 focus:ring-earth-400" />
                                <div className="w-10 h-10 rounded bg-earth-600 border border-earth-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
