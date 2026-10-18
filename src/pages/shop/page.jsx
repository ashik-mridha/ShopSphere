
import { useState, useEffect } from "react";
import {
    Search,
    ShoppingCart,
    Heart,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ShopingPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const SERVER_URL = "http://localhost:5000";

    useEffect(() => {
        const controller = new AbortController();

        async function fetchProducts() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(
                    `${SERVER_URL}/api/products`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error(`Failed to fetch products (${res.status})`);
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid products response from server");
                }

                setProducts(data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Failed to fetch products:", err);
                    setError(
                        "Products load kora jacche na. Backend server check koro."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchProducts();

        return () => controller.abort();
    }, []);

    const filteredProducts = products.filter((item) => {
        const matchesCategory =
            selectedCategory === "all" ||
            item.category?.toLowerCase() ===
            selectedCategory.toLowerCase();

        // FIX: includes() must be called on the string
        const matchesSearch = (item.title ?? "")
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#0a0f0d] px-4 py-8 text-gray-100 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">
                            Explore Shop
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Browse our collection of dynamic products
                        </p>
                    </div>

                    <div className="relative w-full md:w-80">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-[#22332a] bg-[#121816] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition focus:border-[#10B981] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4">
                    {["all", "electronics", "fashion", "home", "sports"].map(
                        (category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${selectedCategory === category
                                        ? "bg-[#10B981] text-white shadow-lg"
                                        : "border border-[#22332a] bg-[#121816] text-gray-400 hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        )
                    )}
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-24">
                        <Loader2
                            className="animate-spin text-[#10B981]"
                            size={40}
                        />
                        <p className="text-sm text-gray-400">
                            Loading products from database...
                        </p>
                    </div>
                ) : error ? (
                    <div className="rounded-2xl border border-red-900 bg-[#121816] py-16 text-center">
                        <p className="text-red-400">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-[#10B981] px-4 py-2 text-white"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="rounded-2xl border border-[#22332a] bg-[#121816] py-24 text-center">
                        <p className="text-lg font-medium text-gray-300">
                            No products found
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            Try searching for something else or change category.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <div
                                key={product._id}
                                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#22332a] bg-[#121816] shadow-lg transition-all duration-300 hover:border-[#10B981]/60"
                            >
                                <div>
                                    <div className="relative h-52 overflow-hidden bg-[#0d1411]">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.title || "Product"}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-600">
                                                No Image Available
                                            </div>
                                        )}

                                        <button
                                            aria-label="Wishlist"
                                            className="absolute right-3 top-3 rounded-full bg-black/40 p-2 text-gray-200 backdrop-blur-md transition hover:text-red-500"
                                        >
                                            <Heart size={18} />
                                        </button>

                                        {product.category && (
                                            <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#10B981]">
                                                {product.category}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="line-clamp-1 text-base font-semibold text-white transition-colors group-hover:text-[#10B981]">
                                            {product.title}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                                            {product.description ||
                                                "No description provided for this item."}
                                        </p>
                                    </div>
                                </div>
                                

                                <div className="mt-4 flex items-center justify-between border-t border-[#22332a]/50 p-4 pt-4">
                                    <div>
                                        <span className="block text-xs text-gray-500">
                                            Price
                                        </span>
                                        <span className="text-lg font-bold text-[#10B981]">
                                            ${Number(product.price ?? 0).toFixed(2)}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            alert(`Added ${product.title} to cart!`)
                                        }
                                        className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#10B981] px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#0d9668]"
                                    >
                                        <ShoppingCart size={15} />
                                        Add
                                    </button>
                                <Link
                                    to={`/shop/${product._id}`}
                                    className="rounded-xl border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-600 hover:text-white"
                                >
                                    Details
                                </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
