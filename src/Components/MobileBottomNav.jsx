
import {
    Home,
    Grid,
    ShoppingCart,
    PackageCheck,
    LayoutDashboard,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { authClient } from "../lib/auth-client";

const MobileBottomNav = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const { data: session, isPending } = authClient.useSession();

    const userRole = session?.user?.role || "user";

    const dashboardPath =
        userRole === "admin"
            ? "/admin/dashboard"
            : "/user/dashboard";

    const bottomNavItems = [
        { name: "Home", href: "/", icon: Home },
        { name: "Categories", href: "/shop", icon: Grid },
        { name: "Cart", href: "/cart", icon: ShoppingCart, badge: 3 },
        { name: "Track", href: "/track-order", icon: PackageCheck },
        {
            name: "Dashboard",
            href: dashboardPath,
            icon: LayoutDashboard,
        },
    ];

    return (
        <nav
            aria-label="Mobile navigation"
            className="fixed bottom-0 left-0 z-50 w-full border-t border-[#1f2924] bg-[#0d1411]/95 backdrop-blur-md md:hidden"
        >
            <div className="flex h-16 items-center justify-around px-2">
                {bottomNavItems.map((item) => {
                    const Icon = item.icon;

                    const isActive =
                        item.name === "Dashboard"
                            ? currentPath === item.href ||
                            currentPath.startsWith(`${item.href}/`)
                            : item.href === "/"
                                ? currentPath === "/"
                                : currentPath === item.href;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            aria-label={item.name}
                            aria-current={isActive ? "page" : undefined}
                            onClick={(e) => {
                                if (item.name === "Dashboard" && isPending) {
                                    e.preventDefault();
                                }
                            }}
                            className={`group relative flex h-full w-full flex-col items-center justify-center gap-1 transition-colors duration-200 ${isActive
                                    ? "text-[#10B981]"
                                    : "text-gray-400 hover:text-gray-200"
                                } ${item.name === "Dashboard" && isPending
                                    ? "pointer-events-none opacity-50"
                                    : ""
                                }`}
                        >
                            {isActive && (
                                <span className="absolute top-0 h-[2px] w-8 rounded-full bg-[#10B981]" />
                            )}

                            <div className="relative">
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 2.2 : 1.8}
                                />

                                {item.badge !== undefined && item.badge > 0 && (
                                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#10B981] px-1 text-[10px] font-bold text-[#121614]">
                                        {item.badge}
                                    </span>
                                )}
                            </div>

                            <span
                                className={`text-[11px] font-medium tracking-tight ${isActive
                                        ? "text-[#10B981]"
                                        : "text-gray-400"
                                    }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default MobileBottomNav;
