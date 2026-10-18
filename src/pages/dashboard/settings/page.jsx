import  { useState, useEffect } from "react";
import { Plus, Package } from "lucide-react";
import AddProductCard from "./AddProductCard";
import ManageProductsTable from "./ManageProductsTable";

export default function AdminSettings() {
    const [products, setProducts] = useState([]);
    const [showAddCard, setShowAddCard] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [newProduct, setNewProduct] = useState({
        title: "",
        price: "",
        category: "",
        image: "",
        description: "",
    });

    // Price Edit State
    const [editingId, setEditingId] = useState(null);
    const [editedPrice, setEditedPrice] = useState("");

    const SERVER_URL = "http://localhost:5000";

    // Fetch All Products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${SERVER_URL}/api/products`);
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 1. Add Product Handler
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${SERVER_URL}/api/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });

            if (res.ok) {
                setNewProduct({ title: "", price: "", category: "", image: "", description: "" });
                setShowAddCard(false);
                fetchProducts();
            }
        } catch (err) {
            console.error("Error adding product:", err);
        }
    };

    // 2. Delete Product Handler
    const handleDeleteProduct = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        try {
            const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProducts(products.filter((p) => p._id !== id));
            }
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    // 3. Edit Price Handler
    const handleUpdatePrice = async (id) => {
        try {
            const res = await fetch(`${SERVER_URL}/api/products/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ price: editedPrice }),
            });

            if (res.ok) {
                setProducts(
                    products.map((p) => (p._id === id ? { ...p, price: Number(editedPrice) } : p))
                );
                setEditingId(null);
                setEditedPrice("");
            }
        } catch (err) {
            console.error("Error updating price:", err);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-gray-100">
            {/* Header Bar */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Package className="text-[#10B981]" /> Admin Settings - Product Management
                </h1>
                <button
                    onClick={() => setShowAddCard(!showAddCard)}
                    className="flex items-center gap-2 bg-[#10B981] hover:bg-[#0d9668] text-white px-4 py-2 rounded-lg font-medium transition shadow-md cursor-pointer"
                >
                    <Plus size={18} /> {showAddCard ? "Close Form" : "Add Product"}
                </button>
            </div>

            {/* Part 1: Add Product Form Component */}
            {showAddCard && (
                <AddProductCard
                    newProduct={newProduct}
                    setNewProduct={setNewProduct}
                    handleAddProduct={handleAddProduct}
                    onClose={() => setShowAddCard(false)}
                />
            )}

            {/* Part 2: Product Table & Edit/Remove Component */}
            <ManageProductsTable
                products={products}
                loading={loading}
                editingId={editingId}
                setEditingId={setEditingId}
                editedPrice={editedPrice}
                setEditedPrice={setEditedPrice}
                handleUpdatePrice={handleUpdatePrice}
                handleDeleteProduct={handleDeleteProduct}
            />
        </div>
    );
}