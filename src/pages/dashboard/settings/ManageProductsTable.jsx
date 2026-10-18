
import { Trash2, Edit2, Check, X } from "lucide-react";

export default function ManageProductsTable({
    products,
    loading,
    editingId,
    setEditingId,
    editedPrice,
    setEditedPrice,
    handleUpdatePrice,
    handleDeleteProduct,
}) {
    return (
        <div className="bg-[#121614] border border-[#22332a] rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 border-b border-[#22332a] font-semibold text-lg text-white">
                Manage Products ({products.length})
            </div>

            {loading ? (
                <div className="p-8 text-center text-gray-400">Loading products...</div>
            ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-400">No products found. Add some!</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-300">
                        <thead className="bg-[#0d1411] text-xs uppercase text-gray-400 border-b border-[#22332a]">
                            <tr>
                                <th className="p-4">Image</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#22332a]">
                            {products.map((item) => (
                                <tr key={item._id} className="hover:bg-[#182620]/50 transition">
                                    <td className="p-4">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-12 h-12 object-cover rounded-md border border-[#22332a]"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-[#0d1411] rounded-md flex items-center justify-center text-xs text-gray-500">
                                                No Img
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-white">{item.title}</td>
                                    <td className="p-4 text-gray-400">{item.category || "N/A"}</td>
                                    <td className="p-4 font-semibold text-[#10B981]">
                                        {editingId === item._id ? (
                                            <div className="flex items-center gap-1">
                                                $
                                                <input
                                                    type="number"
                                                    value={editedPrice}
                                                    onChange={(e) => setEditedPrice(e.target.value)}
                                                    className="w-20 bg-[#0d1411] border border-[#10B981] rounded px-2 py-1 text-white text-sm focus:outline-none"
                                                />
                                            </div>
                                        ) : (
                                            `$${item.price}`
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {editingId === item._id ? (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdatePrice(item._id)}
                                                        className="p-1.5 bg-[#10B981] text-white rounded hover:bg-[#0d9668]"
                                                        title="Save Price"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="p-1.5 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
                                                        title="Cancel"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setEditingId(item._id);
                                                        setEditedPrice(item.price);
                                                    }}
                                                    className="p-1.5 text-blue-400 hover:bg-[#1a2922] rounded transition"
                                                    title="Edit Price"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleDeleteProduct(item._id)}
                                                className="p-1.5 text-red-400 hover:bg-[#1a2922] rounded transition"
                                                title="Delete Product"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}