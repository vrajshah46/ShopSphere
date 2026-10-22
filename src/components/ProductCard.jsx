
import { Link } from "react-router-dom";

const ProductCard = ({
    product,
    addToCart,
    wishlist = [],
    toggleWishlist,
    viewMode = "grid",
}) => {
    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const priceInINR = product.price * 85;

    const formattedPrice = priceInINR.toLocaleString("en-IN", {
        maximumFractionDigits: 0,
    });

    const discount = Math.round(product.discountPercentage || 0);

    const handleAddToCart = () => {
        if (addToCart) addToCart(product);
    };

    const handleWishlist = () => {
        if (toggleWishlist) toggleWishlist(product);
    };

    // LIST VIEW
    if (viewMode === "list") {
        return (
            <article className="group flex flex-col gap-5 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-300 hover:border-indigo-200 hover:shadow-lg sm:flex-row sm:items-center sm:p-5">

                {/* Left: Product image */}
                <Link
                    to={`/products/${product.id}`}
                    className="relative flex h-56 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 p-5 sm:h-48 sm:w-52 lg:h-52 lg:w-56"
                >
                    {discount > 0 && (
                        <span className="absolute left-3 top-3 z-10 rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                            {discount}% OFF
                        </span>
                    )}

                    <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                {/* Right: Product details */}
                <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch py-1">
                    <div>
                        <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                                {product.category?.replace(/-/g, " ")}
                            </p>

                            <button
                                type="button"
                                onClick={handleWishlist}
                                aria-label={
                                    isWishlisted
                                        ? "Remove from wishlist"
                                        : "Add to wishlist"
                                }
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${isWishlisted
                                    ? "border-rose-200 bg-rose-50 text-rose-500"
                                    : "border-gray-200 text-gray-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500"
                                    }`}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill={isWishlisted ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                                </svg>
                            </button>
                        </div>

                        <Link to={`/products/${product.id}`}>
                            <h2 className="mt-2 line-clamp-2 text-lg font-bold text-gray-900 transition hover:text-indigo-600 sm:text-xl">
                                {product.title}
                            </h2>
                        </Link>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                            <span className="rounded-md bg-amber-50 px-2 py-1 font-semibold text-amber-700">
                                ★ {Number(product.rating || 0).toFixed(1)}
                            </span>

                            <span className="text-gray-400">
                                Customer rating
                            </span>
                        </div>


                    </div>

                    <div className="mt-5 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-end">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    ₹{formattedPrice}
                                </span>

                                {discount > 0 && (
                                    <span className="text-sm font-semibold text-emerald-600">
                                        {discount}% off
                                    </span>
                                )}
                            </div>

                            <p className={`mt-1 text-xs font-medium ${product.stock > 0
                                ? "text-emerald-600"
                                : "text-rose-600"
                                }`}>
                                {product.stock > 0
                                    ? `In stock · ${product.stock} available`
                                    : "Out of stock"}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Link
                                to={`/products/${product.id}`}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:border-indigo-300 hover:bg-indigo-50"
                            >
                                View Details
                            </Link>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <path d="M5 8h14l1 13H4L5 8Z" />
                                    <path d="M9 8a3 3 0 0 1 6 0" />
                                </svg>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    // GRID VIEW
    return (
        <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative bg-gray-50 p-4">
                <Link
                    to={`/products/${product.id}`}
                    className="flex h-56 items-center justify-center"
                >
                    <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                </Link>

                {discount > 0 && (
                    <span className="absolute left-3 top-3 rounded-lg bg-rose-500 px-2.5 py-1 text-xs font-bold text-white">
                        {discount}% OFF
                    </span>
                )}

                <button
                    type="button"
                    onClick={handleWishlist}
                    aria-label={
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-sm transition ${isWishlisted
                        ? "bg-rose-50 text-rose-500"
                        : "bg-white text-gray-500 hover:bg-rose-50 hover:text-rose-500"
                        }`}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={isWishlisted ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
                    </svg>
                </button>
            </div>

            <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    {product.category?.replace(/-/g, " ")}
                </p>

                <Link to={`/products/${product.id}`}>
                    <h2 className="mt-2 line-clamp-1 font-bold text-gray-900 transition hover:text-indigo-600">
                        {product.title}
                    </h2>
                </Link>



                <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-lg font-bold text-gray-900">
                        ₹{formattedPrice}
                    </span>

                    <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-700">
                        ★ {Number(product.rating || 0).toFixed(1)}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="mt-4 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </article>
    );
};

export default ProductCard;