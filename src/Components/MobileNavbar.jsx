import React from "react";
import { Search, Heart, UserRound, Sun, Moon } from "lucide-react";

const MobileNavbar = ({
    isSearchOpen,
    setIsSearchOpen,
    
    theme,
    toggleTheme,
}) => {
    return (
        <div className="flex md:hidden items-center justify-between w-full h-full">
            {/* Logo */}
            <a href="/" aria-label="ShopSphere home" className="flex items-center gap-2">
                <svg viewBox="0 0 40 40" className="h-8 w-8 text-[#10B981]" fill="currentColor">
                    <ellipse cx="20" cy="8" rx="6" ry="8" />
                    <ellipse cx="11" cy="19" rx="6" ry="8" transform="rotate(-45 11 19)" />
                    <ellipse cx="29" cy="19" rx="6" ry="8" transform="rotate(45 29 19)" />
                    <ellipse cx="15" cy="30" rx="5" ry="7" />
                    <ellipse cx="25" cy="30" rx="5" ry="7" />
                </svg>
                <span className="text-xl font-bold text-white tracking-tight">ShopSphere</span>
            </a>

            {/* Top Action Icons (Search, Theme, Profile) */}
            <div className="flex items-center gap-2">
                {/* Search Toggle */}
                <button
                    type="button"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    aria-label="Search"
                    className="rounded-full p-2 text-gray-300 hover:bg-[#1a2922] hover:text-[#10B981]"
                >
                    <Search size={20} />
                </button>

                {/* Theme Toggle */}
                <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="rounded-full p-2 text-gray-300 hover:bg-[#1a2922] hover:text-[#10B981]"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Profile Link */}
                <a
                    href="/profile"
                    aria-label="Profile"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#22332a] bg-[#182620] text-gray-300"
                >
                    <UserRound size={17} />
                </a>
            </div>
        </div>
    );
};

export default MobileNavbar;