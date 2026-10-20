import { useState } from "react";
import {
    Search,
    ShoppingCart,
    Heart,
    CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import ProgressiveImage from "../../components/ProgressiveImage";

const CART_KEY = "shopsphere_cart";

export default function ShopingPage() {
    // useProducts হুক থেকে loading বা isLoading প্রপার্টি রিসিভ করা হচ্ছে
    const { products = [], loading, error } = useProducts();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [addedProductId, setAddedProductId] = useState(null);

    // Add product to cart
    const addToCart = (product) => {
        try {
            const saved = JSON.parse(
                localStorage.getItem(CART_KEY) || "[]"
            );

            const cart = Array.isArray(saved) ? saved : [];
            const id = String(product._id ?? product.id ?? "");

            if (!id) {
                alert("Product ID missing. Cannot add to cart.");
                return;
            }

            const existing = cart.find(
                (item) => String(item._id ?? item.id ?? "") === id
            );

            let updatedCart;

            if (existing) {
                updatedCart = cart.map((item) =>
                    String(item._id ?? item.id ?? "") === id
                        ? {
                            ...item,
                            quantity: Math.min(
                                99,
                                Math.max(1, Number(item.quantity) || 1) + 1
                            ),
                        }
                        : item
                );
            } else {
                updatedCart = [...cart, { ...product, quantity: 1 }];
            }

            localStorage.setItem(
                CART_KEY,
                JSON.stringify(updatedCart)
            );

            window.dispatchEvent(new Event("cartUpdated"));

            setAddedProductId(id);

            window.setTimeout(() => {
                setAddedProductId((current) =>
                    current === id ? null : current
                );
            }, 1500);
        } catch (err) {
            console.error("Failed to add product to cart:", err);
            alert("Could not add product to cart.");
        }
    };

    // Search and category filtering (safe check with Array.isArray)
    const query = searchQuery.trim().toLowerCase();
    const productList = Array.isArray(products) ? products : [];

    const filteredProducts = productList.filter((item) => {
        const category = String(item.category ?? "").toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch = [
            item.title,
            item.description,
            item.category,
        ].some((value) =>
            String(value ?? "").toLowerCase().includes(query)
        );

        return matchesCategory && matchesSearch;
    });

    // Dynamic categories
    const categories = [
        "all",
        ...new Set(
            productList
                .map((product) =>
                    String(product.category ?? "").trim().toLowerCase()
                )
                .filter(Boolean)
        ),
    ];

    return (
        <main className="min-h-screen bg-[#0a0f0d] px-4 py-8 text-gray-100 sm:px-6 lg:px-12">
            <div className="mx-auto max-w-7xl">
                {/* Header and Search */}
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
                            type="search"
                            value={searchQuery}
                            onChange={(event) =>
                                setSearchQuery(event.target.value)
                            }
                            placeholder="Search products..."
                            aria-label="Search products"
                            className="w-full rounded-xl border border-[#22332a] bg-[#121816] py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 transition focus:border-[#10B981] focus:outline-none"
                        />
                    </div>
                </div>

                {/* Category Filters */}
                <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => setSelectedCategory(category)}
                            className={`cursor-pointer whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${selectedCategory === category
                                    ? "bg-[#10B981] text-white shadow-lg"
                                    : "border border-[#22332a] bg-[#121816] text-gray-400 hover:text-white"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#10B981] border-t-transparent"></div>
                        <p className="mt-4 text-sm text-gray-400">Loading products...</p>
                    </div>
                ) : error ? (
                    /* Error State */
                    <div className="rounded-2xl border border-red-900 bg-[#121816] py-16 text-center">
                        <p className="text-red-400">{error}</p>

                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-4 rounded-lg bg-[#10B981] px-4 py-2 text-white"
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    /* Empty State */
                    <div className="rounded-2xl border border-[#22332a] bg-[#121816] py-24 text-center">
                        <p className="text-lg font-medium text-gray-300">
                            No products found
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Try searching for something else or change category.
                        </p>

                        <button
                            type="button"
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("all");
                            }}
                            className="mt-4 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    /* Product Grid */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredProducts.map((product) => {
                            const id = String(
                                product._id ?? product.id ?? ""
                            );

                            const isAdded = addedProductId === id;

                            return (
                                <article
                                    key={id}
                                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#22332a] bg-[#121816] shadow-lg transition-all duration-300 hover:border-[#10B981]/60"
                                >
                                    <div>
                                        {/* Product Image with Spinner */}
                                        <div className="relative h-52 overflow-hidden bg-[#0d1411]">
                                            <ProgressiveImage
                                                src={product.image || ""}
                                                alt={product.title || "Product image"}
                                                imageClassName="h-full w-full object-contain p-4"
                                            />

                                            <button
                                                type="button"
                                                aria-label={`Add ${product.title || "product"
                                                    } to wishlist`}
                                                className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-gray-200 backdrop-blur-md transition hover:text-red-500"
                                            >
                                                <Heart size={18} />
                                            </button>

                                            {product.category && (
                                                <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#10B981]">
                                                    {product.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Information */}
                                        <div className="p-4">
                                            <h2 className="line-clamp-1 text-base font-semibold text-white transition-colors group-hover:text-[#10B981]">
                                                {product.title || "Untitled Product"}
                                            </h2>

                                            <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                                                {product.description ||
                                                    "No description provided for this item."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Price and Actions */}
                                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#22332a]/50 p-4">
                                        <div>
                                            <span className="block text-xs text-gray-500">
                                                Price
                                            </span>

                                            <span className="text-lg font-bold text-[#10B981]">
                                                $
                                                {Number(product.price ?? 0).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => addToCart(product)}
                                                className={`flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white shadow-md transition ${isAdded
                                                        ? "bg-emerald-700"
                                                        : "bg-[#10B981] hover:bg-[#0d9668]"
                                                    }`}
                                            >
                                                {isAdded ? (
                                                    <CheckCircle size={15} />
                                                ) : (
                                                    <ShoppingCart size={15} />
                                                )}

                                                {isAdded ? "Added" : "Add"}
                                            </button>

                                            <Link
                                                to={`/shop/${encodeURIComponent(id)}`}
                                                className="rounded-xl border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-400 transition hover:bg-emerald-600 hover:text-white"
                                            >
                                                Details
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}