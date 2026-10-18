
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
    ArrowLeft,
    ShoppingCart,
    Loader2,
    Minus,
    Plus,
} from "lucide-react";

const SERVER_URL = "http://localhost:5000";

export default function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const controller = new AbortController();

        async function loadProduct() {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(
                    `${SERVER_URL}/api/products/${id}`,
                    { signal: controller.signal }
                );

                if (!res.ok) {
                    throw new Error(
                        res.status === 404
                            ? "Product not found"
                            : "Failed to load product"
                    );
                }

                const data = await res.json();
                setProduct(data.product ?? data);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(err.message);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => controller.abort();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center py-24">
                <Loader2 className="animate-spin text-emerald-500" size={36} />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="mx-auto max-w-3xl p-10 text-center">
                <h1 className="text-2xl font-bold">
                    {error || "Product not found"}
                </h1>
                <Link
                    to="/shop"
                    className="mt-5 inline-block text-emerald-600 underline"
                >
                    Back to Shop
                </Link>
            </div>
        );
    }

    const total = Number(product.price) * quantity;

    return (
        <div className="min-h-screen bg-[#0a0f0d] px-4 py-10 text-white sm:px-8">
            <div className="mx-auto max-w-6xl">
                <Link
                    to="/shop"
                    className="mb-8 inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400"
                >
                    <ArrowLeft size={18} /> Back to Shop
                </Link>

                <div className="grid gap-10 rounded-2xl border border-[#22332a] bg-[#121816] p-5 md:grid-cols-2 md:p-8">
                    <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-xl bg-[#0d1411]">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-[480px] w-full object-contain"
                            />
                        ) : (
                            <p className="text-gray-500">No image available</p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <p className="text-sm uppercase tracking-widest text-emerald-400">
                            {product.category || "Product"}
                        </p>

                        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                            {product.title}
                        </h1>

                        <p className="mt-5 leading-7 text-gray-400">
                            {product.description || "No description available."}
                        </p>

                        <p className="mt-6 text-3xl font-bold text-emerald-400">
                            ${Number(product.price).toFixed(2)}
                        </p>

                        <div className="mt-7">
                            <label className="mb-3 block text-sm text-gray-300">
                                Quantity
                            </label>

                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    disabled={quantity <= 1}
                                    onClick={() =>
                                        setQuantity((q) => Math.max(1, q - 1))
                                    }
                                    className="rounded-lg border border-gray-700 p-2 disabled:opacity-40"
                                >
                                    <Minus size={18} />
                                </button>

                                <span className="min-w-8 text-center text-lg">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setQuantity((q) => Math.min(99, q + 1))
                                    }
                                    disabled={quantity >= 99}
                                    className="rounded-lg border border-gray-700 p-2 disabled:opacity-40"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">
                            <span className="text-gray-400">Total</span>
                            <span className="text-2xl font-bold">
                                ${total.toFixed(2)}
                            </span>
                        </div>

                        <Link
                            to={`/checkout/${product._id}?quantity=${quantity}`}
                            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold transition hover:bg-emerald-500"
                        >
                            <ShoppingCart size={19} />
                            Order Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
