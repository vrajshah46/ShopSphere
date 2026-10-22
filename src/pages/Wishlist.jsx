
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const HeartIcon = ({ size = 24, filled = false, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
);

const ArrowIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const Wishlist = ({ wishlist = [], addToCart, toggleWishlist }) => {
    return (
        <main className="min-h-screen bg-[#f8f8fa]">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

                {/* Page heading */}
                <div className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-r from-rose-50 via-white to-pink-50 p-6 sm:p-10">
                    <div className="absolute -right-8 -top-12 h-48 w-48 rounded-full bg-pink-100/60 blur-2xl" />

                    <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-rose-600 shadow-sm">
                                <HeartIcon size={15} filled />
                                Saved with love
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                My Wishlist<span className="text-rose-500">.</span>
                            </h1>

                            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600 sm:text-base">
                                Your favourite finds, all in one place.
                                Keep the things you love close.
                            </p>
                        </div>

                        <div className="flex h-20 w-20 shrink-0 items-center justify-center self-start rounded-2xl bg-white text-rose-500 shadow-sm ring-1 ring-pink-100 sm:self-center">
                            <HeartIcon size={38} filled />
                        </div>
                    </div>
                </div>

                {/* Wishlist toolbar */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Your favourites
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            {wishlist.length}{" "}
                            {wishlist.length === 1 ? "product" : "products"} saved
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-rose-300 hover:text-rose-600"
                    >
                        Explore products
                        <ArrowIcon />
                    </Link>
                </div>

                {/* Empty state */}
                {wishlist.length === 0 ? (
                    <div className="rounded-3xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm sm:py-20">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-50">
                            <HeartIcon
                                size={43}
                                className="text-rose-400"
                            />
                        </div>

                        <h2 className="mt-6 text-xl font-bold text-gray-900 sm:text-2xl">
                            Nothing saved just yet
                        </h2>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                            Found something you love? Tap the heart on any
                            product and it will be waiting here for you.
                        </p>

                        <Link
                            to="/products"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-600"
                        >
                            Discover products
                            <ArrowIcon />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {wishlist.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                addToCart={addToCart}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Wishlist;
