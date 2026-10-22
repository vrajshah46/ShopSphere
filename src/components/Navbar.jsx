
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

const Navbar = ({
    cart = [],
    wishlist = [],
    isLoggedIn,
    onLogout,
}) => {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    const navbarRef = useRef(null);

    const closeMenu = () => setMenuOpen(false);

    // Search products
    const handleSearch = (e) => {
        e.preventDefault();

        const query = search.trim();

        if (!query) return;

        closeMenu();
        navigate(`/?search=${encodeURIComponent(query)}`);
    };

    // Close menu when clicking outside or scrolling the page
    useEffect(() => {
        if (!menuOpen) return;

        const openedAtY = window.scrollY;

        const handleOutsideClick = (event) => {
            if (
                navbarRef.current &&
                !navbarRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        const handleScroll = () => {
            if (Math.abs(window.scrollY - openedAtY) > 8) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);
        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            document.removeEventListener(
                "pointerdown",
                handleOutsideClick
            );

            window.removeEventListener("scroll", handleScroll);
        };
    }, [menuOpen]);

    // Reusable search form
    const SearchForm = ({ mobile = false }) => (
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
                placeholder="Search products, brands..."
                aria-label="Search products"
                className="min-w-0 flex-1 rounded-l-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/30"
            />

            <button
                type="submit"
                className="rounded-r-lg bg-violet-400 px-4 py-2 text-sm font-semibold text-[#0e1d55] transition hover:bg-violet-300"
            >
                Search
            </button>
        </form>
    );

    const mobileLinkClass =
        "flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-200 hover:border-violet-300/30 hover:bg-white/10 active:bg-white/15";

    return (
        <>
            <nav
                ref={navbarRef}
                className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0e1d55] text-white shadow-lg"
            >
                {/* Main navbar */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex min-h-[68px] items-center justify-between gap-3">
                        {/* Logo */}
                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="flex shrink-0 items-center gap-2"
                        >
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-xl font-extrabold text-[#0e1d55] sm:h-10 sm:w-10">
                                S
                            </span>

                            <span className="text-lg font-bold tracking-tight sm:text-2xl">
                                Shop<span className="text-violet-400">Sphere</span>
                                <span className="text-violet-400">.</span>
                            </span>
                        </Link>

                        {/* Desktop search */}
                        <SearchForm />

                        {/* Desktop navigation */}
                        <div className="hidden shrink-0 items-center gap-4 md:flex">
                            <Link
                                to="/products"
                                className="font-medium transition hover:text-violet-300"
                            >
                                Shop
                            </Link>

                            <Link
                                to="/wishlist"
                                className="flex items-center gap-2 font-medium transition hover:text-violet-300"
                            >
                                <span className="text-rose-300">♡</span>
                                Wishlist

                                {wishlist.length > 0 && (
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            <Link
                                to="/cart"
                                className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 transition hover:border-violet-300/40 hover:bg-white/10"
                            >
                                <span>🛒</span>
                                <span className="text-sm font-semibold">Cart</span>

                                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-[#0e1d55]">
                                    {cart.length}
                                </span>
                            </Link>

                            {isLoggedIn ? (
                                <button
                                    type="button"
                                    onClick={onLogout}
                                    className="rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold transition hover:border-red-400 hover:bg-red-500/10"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-[#0e1d55] transition hover:bg-violet-200"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            type="button"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 transition hover:bg-white/10 active:scale-95 md:hidden"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            aria-controls="mobile-navigation"
                        >
                            {menuOpen ? (
                                <svg
                                    width="23"
                                    height="23"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            ) : (
                                <svg
                                    width="23"
                                    height="23"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                >
                                    <path d="M4 6h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile search */}
                    <div className="pb-3 md:hidden">
                        <SearchForm mobile />
                    </div>
                </div>

                {/* Mobile dropdown: positioned outside normal page flow */}
                <div
                    id="mobile-navigation"
                    aria-hidden={!menuOpen}
                    className={`absolute left-0 right-0 top-full border-t border-white/10 bg-[#0e1d55] shadow-2xl transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none md:hidden ${menuOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-2 opacity-0 pointer-events-none"
                        }`}
                >
                    <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
                        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/70">
                                    Navigation
                                </p>

                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-100">
                                    ShopSphere
                                </span>
                            </div>

                            <div className="space-y-2">
                                <Link
                                    to="/"
                                    onClick={closeMenu}
                                    className={mobileLinkClass}
                                >
                                    <span className="text-xl">⌂</span>
                                    <span className="flex-1 text-sm font-semibold">
                                        Home
                                    </span>
                                    <span className="text-white/40">›</span>
                                </Link>

                                <Link
                                    to="/products"
                                    onClick={closeMenu}
                                    className={mobileLinkClass}
                                >
                                    <span className="text-xl">▤</span>
                                    <span className="flex-1 text-sm font-semibold">
                                        Shop Products
                                    </span>
                                    <span className="text-white/40">›</span>
                                </Link>

                                <Link
                                    to="/wishlist"
                                    onClick={closeMenu}
                                    className={mobileLinkClass}
                                >
                                    <span className="text-xl text-rose-300">♡</span>
                                    <span className="flex-1 text-sm font-semibold">
                                        Wishlist
                                    </span>
                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-500 px-2 text-xs font-bold">
                                        {wishlist.length}
                                    </span>
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={closeMenu}
                                    className={mobileLinkClass}
                                >
                                    <span className="text-xl">🛒</span>
                                    <span className="flex-1 text-sm font-semibold">
                                        Shopping Cart
                                    </span>
                                    <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-emerald-500 px-2 text-xs font-bold">
                                        {cart.length}
                                    </span>
                                </Link>
                            </div>

                            <div className="mt-4 border-t border-white/10 pt-4">
                                {isLoggedIn ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            closeMenu();
                                            onLogout();
                                        }}
                                        className="w-full rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="block rounded-xl bg-white px-4 py-3.5 text-center text-sm font-bold text-[#0e1d55] transition hover:bg-violet-200"
                                    >
                                        Login / Sign Up
                                    </Link>
                                )}
                            </div>

                            <p className="pt-4 text-center text-[11px] tracking-wide text-blue-100/40">
                                Your style, your choice.
                            </p>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
