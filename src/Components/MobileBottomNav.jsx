import React from "react";
import { Home, Grid, ShoppingCart, User, PackageCheck } from "lucide-react";

const MobileBottomNav = ({ currentPath = "/" }) => {
    // ছবি অনুযায়ী ৪-৫টি প্রধান নেভিগেশন ট্যাব
    const bottomNavItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Categories", href: "/shop", icon: Grid },
        { name: "Cart", href: "/cart", icon: ShoppingCart, badge: 3 }, // Example cart count
        { name: "Track", href: "/track-order", icon: PackageCheck },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-[#1f2924] bg-[#0d1411]/95 backdrop-blur-md md:hidden">
            <div className="flex h-16 items-center justify-around px-2">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.href;

                    return (
                        <a
                            key={item.name}
                            href={item.href}
                            className={`group relative flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-200 ${isActive ? "text-[#10B981]" : "text-gray-400 hover:text-gray-200"
                                }`}
                        >
                            {/* Top Active Line Indicator */}
                            {isActive && (
                                <span className="absolute top-0 h-[2px] w-8 rounded-full bg-[#10B981]" />
                            )}

                            {/* Icon with Cart Badge */}
                            <div className="relative">
                                <Icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                                {item.badge !== undefined && item.badge > 0 && (
                                    <span className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-[#121614]">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            {/* Label */}
                            <span className={`text-[11px] font-medium tracking-tight ${isActive ? "text-[#10B981]" : "text-gray-400"}`}>
                                {item.name}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileBottomNav;