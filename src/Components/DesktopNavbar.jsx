import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingCart, UserRound, ChevronDown, Sun, Moon, LayoutDashboard, LogOut } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";

const DesktopNavbar = ({
    navLinks,
    activeDropdown,
    setActiveDropdown,
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchRef,
    theme,
    toggleTheme,
}) => {
    const { data: session, isPending } = authClient.useSession();
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    // Outside click এ dropdown close করার জন্য
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    setProfileOpen(false);
                    navigate("/");
                },
            },
        });
    };

    // Role অনুযায়ী Dashboard Path নির্ধারণ
    const userRole = session?.user?.role || "user";
    const dashboardPath = userRole === "admin" ? "/admin/dashboard" : "/user/dashboard";

    return (
        <div className="hidden md:flex items-center justify-between w-full">

            <a
                href="/"
                aria-label="ShopSphere home"
                className="group flex shrink-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-lg p-1"
            >
                <svg
                    viewBox="0 0 40 40"
                    className="h-9 w-9 text-[#10B981] transition-transform duration-300 group-hover:scale-105"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <ellipse cx="20" cy="8" rx="6" ry="8" />
                    <ellipse cx="11" cy="19" rx="6" ry="8" transform="rotate(-45 11 19)" />
                    <ellipse cx="29" cy="19" rx="6" ry="8" transform="rotate(45 29 19)" />
                    <ellipse cx="15" cy="30" rx="5" ry="7" />
                    <ellipse cx="25" cy="30" rx="5" ry="7" />
                </svg>
                <span className="text-2xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-[#10B981]">
                    ShopSphere
                </span>
            </a>

            {/* Nav Links & Dropdowns */}
            <div className="flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                    <div
                        key={link.name}
                        className="relative"
                        onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                        onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
                    >
                        <a
                            href={link.href}
                            className="group relative flex items-center gap-1 py-2 text-[15px] font-medium text-gray-300 transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#10B981] rounded-md px-1"
                        >
                            {link.name}
                            {link.dropdown && (
                                <ChevronDown
                                    size={15}
                                    className={`transition-transform duration-200 ${activeDropdown === link.name ? "rotate-180 text-[#10B981]" : ""}`}
                                />
                            )}
                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#10B981] transition-all duration-300 ease-out group-hover:w-full"></span>
                        </a>

                        {/* Dropdown Menu */}
                        {link.dropdown && activeDropdown === link.name && (
                            <div className="absolute left-0 top-full mt-1 w-64 rounded-xl border border-[#22332a] bg-[#0d1411]/95 p-3 shadow-2xl backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-top-2">
                                <div className="flex flex-col gap-1">
                                    {link.dropdown.map((item) => (
                                        <a
                                            key={item.title}
                                            href={item.href}
                                            className="group/item rounded-lg p-2.5 transition-colors duration-150 hover:bg-[#15241d]"
                                        >
                                            <p className="text-sm font-medium text-gray-200 group-hover/item:text-[#10B981] transition-colors">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Action Icons & Search */}
            <div className="flex items-center gap-4">
                {/* Expandable Search */}
                <div ref={searchRef} className="relative flex items-center">
                    {isSearchOpen ? (
                        <div className="absolute right-0 flex items-center bg-[#0d1411] border border-[#22332a] rounded-full px-3 py-1.5 shadow-lg w-72 transition-all duration-300 animate-in fade-in zoom-in-95">
                            <Search size={18} className="text-[#10B981] shrink-0 mr-2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search products..."
                                autoFocus
                                className="w-full bg-transparent text-sm text-gray-100 placeholder-gray-400 focus:outline-none"
                            />
                            <button
                                onClick={() => setIsSearchOpen(false)}
                                className="ml-1 text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Open search"
                            className="rounded-full p-2 text-gray-300 transition-all duration-200 hover:bg-[#1a2922] hover:text-[#10B981]"
                        >
                            <Search size={22} strokeWidth={2} />
                        </button>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="rounded-full p-2 text-gray-300 transition-all duration-200 hover:bg-[#1a2922] hover:text-[#10B981]"
                >
                    {theme === "dark" ? <Sun size={21} /> : <Moon size={21} />}
                </button>

                {/* Wishlist */}
                <a
                    href="/wishlist"
                    aria-label="Wishlist"
                    className="rounded-full p-2 text-gray-300 transition-all duration-200 hover:bg-[#1a2922] hover:text-[#10B981]"
                >
                    <Heart size={22} strokeWidth={2} />
                </a>

                {/* Cart */}
                <a
                    href="/cart"
                    aria-label="Shopping cart"
                    className="relative rounded-full p-2 text-gray-300 transition-all duration-200 hover:bg-[#1a2922] hover:text-[#10B981]"
                >
                    <ShoppingCart size={22} strokeWidth={2} />
                    <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#10B981] text-[10px] font-bold text-[#121614]">
                        0
                    </span>
                </a>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    {isPending ? (
                        <div className="h-10 w-10 rounded-full bg-[#182620] animate-pulse" />
                    ) : session ? (
                        <>
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#22332a] bg-[#182620] text-gray-300 hover:border-[#10B981] transition cursor-pointer"
                            >
                                {session.user.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="avatar"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-semibold text-[#10B981]">
                                        {session.user.name?.[0]?.toUpperCase() || "U"}
                                    </span>
                                )}
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[#22332a] bg-[#0d1411]/95 py-2 shadow-2xl backdrop-blur-md z-50">
                                    <div className="px-4 py-2 border-b border-[#22332a]">
                                        <p className="text-sm font-medium text-white truncate">
                                            {session.user.name}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate capitalize">
                                            {userRole} • {session.user.email}
                                        </p>
                                    </div>

                                    {/* Role Based Dynamic Dashboard Button */}
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate(dashboardPath);
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-200 hover:bg-[#15241d] hover:text-[#10B981] transition cursor-pointer"
                                    >
                                        <LayoutDashboard size={17} />
                                        Dashboard
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <a
                            href="/login"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#22332a] bg-[#182620] text-gray-300 hover:border-[#10B981] transition"
                        >
                            <UserRound size={20} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DesktopNavbar;