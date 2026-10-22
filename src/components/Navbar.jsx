
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ cart = [], wishlist = [], isLoggedIn, onLogout }) => {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();

        const query = search.trim();
        if (!query) return;

        setMenuOpen(false);
        navigate(`/?search=${encodeURIComponent(query)}`);
    };

    const closeMenu = () => setMenuOpen(false);

    const searchForm = (mobile = false) => (
        <form
            onSubmit={handleSearch}
            className={
                mobile
                    ? "flex w-full md:hidden"
                    : "hidden min-w-0 max-w-md flex-1 md:flex"
            }
        >
            <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands and more..."
                aria-label="Search products"
                className="min-w-0 flex-1 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
            />

            <button
                type="submit"
                className="rounded-r-lg bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
            >
                Search
            </button>
        </form>
    );

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-800 bg-[#0e1d55] text-white shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Main navbar row */}
                <div className="flex min-h-[68px] items-center justify-between gap-3">

                    {/* Logo */}
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex shrink-0 items-center gap-2"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl font-extrabold text-black sm:h-10 sm:w-10">
                            S
                        </div>

                        <span className="text-lg font-bold tracking-tight sm:text-2xl">
                            ShopSphere
                        </span>
                    </Link>

                    {/* Desktop search */}
                    {searchForm(false)}

                    {/* Desktop navigation */}

                    <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">

                        <Link
                            to="/products"
                            className="flex items-center gap-2 font-medium text-white transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9h18l-2-6H5L3 9Z" />
                                <path d="M5 9v12h14V9" />
                                <path d="M9 21v-7h6v7" />
                            </svg>
                            Shop
                        </Link>

                        <Link
                            to="/wishlist"
                            className="flex items-center gap-2 font-medium text-white transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fb7185" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                            </svg>
                            Wishlist
                            {wishlist.length > 0 && (
                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/cart"
                            className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-white transition hover:border-gray-500 hover:bg-gray-800"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H5" />
                            </svg>
                            <span className="text-sm font-semibold">Cart</span>
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-black">
                                {cart.length}
                            </span>
                        </Link>

                        {isLoggedIn ? (
                            <button
                                onClick={onLogout}
                                className="flex items-center gap-2 rounded-lg border border-gray-700 px-3 py-2 text-sm font-semibold text-white transition hover:border-red-500 hover:bg-red-950"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                    <path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" />
                                </svg>
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="8" r="4" />
                                    <path d="M5 21a7 7 0 0 1 14 0" />
                                </svg>
                                Login
                            </Link>
                        )}
                    </div>


                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-700 text-2xl text-white transition hover:bg-gray-800 md:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {/* Mobile search: separate row */}
                <div className="pb-3 md:hidden">
                    {searchForm(true)}
                </div>
            </div>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="border-t border-gray-800 bg-[#0e1d55] px-4 py-3 md:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col gap-1">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800"
                        >
                            Home
                        </Link>

                        <Link
                            to="/wishlist"
                            onClick={closeMenu}
                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800"
                        >
                            <span>♡ Wishlist</span>
                            <span className="text-gray-400">
                                {wishlist.length}
                            </span>
                        </Link>

                        <Link
                            to="/cart"
                            onClick={closeMenu}
                            className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800"
                        >
                            <span>🛒 Cart</span>
                            <span className="text-gray-400">
                                {cart.length}
                            </span>
                        </Link>

                        {isLoggedIn ? (
                            <button
                                onClick={() => {
                                    closeMenu();
                                    onLogout();
                                }}
                                className="rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-800"
                            >
                                Login / Sign Up
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
