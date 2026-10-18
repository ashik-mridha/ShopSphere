

export default function AddProductCard({
    newProduct,
    setNewProduct,
    handleAddProduct,
    onClose,
}) {
    return (
        <div className="mb-8 p-6 bg-[#121614] border border-[#22332a] rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
            <h2 className="text-lg font-semibold mb-4 text-[#10B981]">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Product Title</label>
                    <input
                        type="text"
                        required
                        value={newProduct.title}
                        onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                        className="w-full bg-[#0d1411] border border-[#22332a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                        placeholder="e.g. Wireless Headphones"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Price ($)</label>
                    <input
                        type="number"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="w-full bg-[#0d1411] border border-[#22332a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                        placeholder="e.g. 99.99"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Category</label>
                    <input
                        type="text"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full bg-[#0d1411] border border-[#22332a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                        placeholder="e.g. Electronics"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                    <input
                        type="url"
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className="w-full bg-[#0d1411] border border-[#22332a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <textarea
                        rows="2"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="w-full bg-[#0d1411] border border-[#22332a] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#10B981]"
                        placeholder="Product details..."
                    ></textarea>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition text-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#10B981] hover:bg-[#0d9668] text-white rounded-lg text-sm font-medium transition"
                    >
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}