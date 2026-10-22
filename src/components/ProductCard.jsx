
import { Link } from "react-router-dom";

const ProductCard = ({
    product,
    addToCart,
    wishlist = [],
    toggleWishlist,
}) => {
    const isWishlisted = wishlist.some(
        (item) => item.id === product.id
    );

    const rating = product.rating;
    const reviewCount = product.reviews?.length || 0;

    // DummyJSON prices are in dollars.
    // Approximate conversion to INR.
    const priceInINR = product.price * 85;

    return (
        <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product Image */}
            <div className="relative flex h-56 items-center justify-center bg-gray-50 p-5">
                <Link
                    to={`/products/${product.id}`}
                    className="flex h-full w-full items-center justify-center"
                >
                    <img
                        src={product.thumbnail || product.images?.[0]}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>

                {/* Category */}
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-gray-600 shadow-sm">
                    {product.category?.replace(/-/g, " ")}
                </span>

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={
                        isWishlisted
                            ? "Remove from wishlist"
                            : "Add to wishlist"
                    }
                    className={`absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:scale-110 ${isWishlisted
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500"
                        }`}
                >
                    <span className="text-2xl leading-none">
                        {isWishlisted ? "♥" : "♡"}
                    </span>
                </button>

                {/* Discount Badge */}
                {product.discountPercentage > 0 && (
                    <span className="absolute bottom-3 left-3 rounded-md bg-red-600 px-2 py-1 text-xs font-semibold text-white">
                        {Math.round(product.discountPercentage)}% OFF
                    </span>
                )}
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col p-4">
                <h2 className="line-clamp-2 min-h-12 text-base font-semibold text-gray-800">
                    <Link
                        to={`/products/${product.id}`}
                        className="transition-colors hover:text-blue-600"
                    >
                        {product.title}
                    </Link>
                </h2>

                {/* Rating */}
                {rating != null && (
                    <div className="mt-2 flex items-center gap-2 text-sm">
                        <span className="rounded-md bg-green-100 px-2 py-1 font-semibold text-green-700">
                            ★ {Number(rating).toFixed(1)}
                        </span>

                        <span className="text-gray-500">
                            ({reviewCount} reviews)
                        </span>
                    </div>
                )}

                {/* Price and Button */}
                <div className="mt-auto pt-4">
                    <p className="text-xl font-bold text-gray-900">
                        ₹{priceInINR.toLocaleString("en-IN", {
                            maximumFractionDigits: 0,
                        })}
                    </p>

                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="mt-3 w-full rounded-xl bg-[#0e1d55] px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
