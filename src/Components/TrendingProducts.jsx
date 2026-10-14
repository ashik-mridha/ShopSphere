import React from "react";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

const TrendingProducts = () => {
    const products = [
        {
            id: 1,
            title: "AirPods Pro",
            rating: 4.9,
            reviews: 120,
            price: "$249.00",
            image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
            alt: "AirPods Pro"
        },
        {
            id: 2,
            title: "Nike Running Shoes",
            rating: 4.8,
            reviews: 86,
            price: "$129.00",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
            alt: "Nike Running Shoes"
        },
        {
            id: 3,
            title: "Smart Watch",
            rating: 4.7,
            reviews: 78,
            price: "$199.00",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
            alt: "Smart Watch"
        },
        {
            id: 4,
            title: "Backpack",
            rating: 4.6,
            reviews: 64,
            price: "$89.00",
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
            alt: "Minimalist Backpack"
        },
    ];

    return (
        <section className="bg-[#121614] py-6 sm:py-10 px-4 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1440px]">

                {/* Section Header */}
                <div className="flex items-center justify-between mb-5 sm:mb-8">
                    <div>
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-[#10B981]">
                            Handpicked Choice
                        </span>
                        <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5 sm:mt-1">
                            Trending Products
                        </h2>
                    </div>

                    <a
                        href="/shop"
                        className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-[#10B981]"
                    >
                        <span>View All</span>
                        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1 sm:w-4 sm:h-4" />
                    </a>
                </div>

                {/* Product Grid - Mobile e grid-cols-2 (পাসাপাশি ২টা) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#1f2924] bg-[#0d1411] p-2.5 sm:p-4 transition-all duration-300 hover:border-[#10B981]/50 hover:shadow-xl hover:shadow-[#10B981]/10"
                        >
                            {/* Product Image Box */}
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#15241d]/40 p-2 sm:p-4 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.alt}
                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="mt-2 sm:mt-4 flex flex-col gap-1">
                                <h3 className="text-xs sm:text-base font-bold text-white transition-colors duration-200 group-hover:text-[#10B981] truncate">
                                    {product.title}
                                </h3>

                                {/* Ratings */}
                                <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                                    <div className="flex items-center text-amber-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={11} fill="currentColor" className="sm:w-3.5 sm:h-3.5" />
                                        ))}
                                    </div>
                                    <span className="font-semibold text-gray-300">{product.rating}</span>
                                    <span className="text-gray-500 hidden sm:inline">({product.reviews})</span>
                                </div>

                                {/* Price & Add to Cart Button */}
                                <div className="mt-1 sm:mt-2 flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#1f2924]/60">
                                    <span className="text-xs sm:text-lg font-extrabold text-white">
                                        {product.price}
                                    </span>

                                    <button
                                        type="button"
                                        aria-label={`Add ${product.title} to cart`}
                                        className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-lg sm:rounded-xl bg-[#15241d] text-gray-200 border border-[#22332a] transition-all duration-200 hover:bg-[#10B981] hover:text-[#121614] hover:border-[#10B981] active:scale-90"
                                    >
                                        <ShoppingCart size={13} className="sm:w-4 sm:h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default TrendingProducts;