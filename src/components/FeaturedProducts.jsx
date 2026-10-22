
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({
    wishlist = [],
    addToCart,
    toggleWishlist,
}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const categories = [
                    "beauty",
                    "fragrances",
                    "furniture",
                    "laptops",
                    "mens-shirts",
                    "womens-dresses",
                    "mens-shoes",
                    "tops",
                ];

                const results = await Promise.all(
                    categories.map(async (category) => {
                        const response = await fetch(
                            `https://dummyjson.com/products/category/${category}?limit=1`
                        );

                        if (!response.ok) {
                            throw new Error("Failed to fetch products");
                        }

                        const data = await response.json();
                        return data.products?.[0];
                    })
                );

                if (isMounted) {
                    setProducts(results.filter(Boolean));
                }
            } catch {
                if (isMounted) {
                    setError(
                        "Products load nahi ho paaye. Please try again."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchFeaturedProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section className="py-16 sm:py-20">
            {/* Section heading */}
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-7 rounded-full bg-violet-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                            Handpicked for you
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Featured{" "}
                        <span className="text-violet-600">Products.</span>
                    </h2>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
                        Explore standout picks chosen to make your everyday
                        shopping a little more exciting.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="group inline-flex w-fit items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition duration-300 hover:border-violet-600 hover:bg-violet-600 hover:text-white"
                >
                    Explore all products
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </div>

            {/* Loading state */}
            {loading && (
                <div
                    className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
                    aria-label="Loading featured products"
                    aria-busy="true"
                >
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 sm:rounded-3xl sm:p-4"
                        >
                            <div className="aspect-square rounded-xl bg-slate-100" />
                            <div className="mt-4 h-3 w-1/3 rounded bg-slate-100" />
                            <div className="mt-3 h-4 w-4/5 rounded bg-slate-100" />
                            <div className="mt-3 h-3 w-1/2 rounded bg-slate-100" />
                            <div className="mt-5 h-10 rounded-xl bg-slate-100" />
                        </div>
                    ))}
                </div>
            )}

            {/* Error state */}
            {!loading && error && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-100 bg-red-50 px-5 py-10 text-center"
                >
                    <p className="font-medium text-red-600">{error}</p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100"
                    >
                        Reload page
                    </button>
                </div>
            )}

            {/* Products grid */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            wishlist={wishlist}
                            addToCart={addToCart}
                            toggleWishlist={toggleWishlist}
                        />
                    ))}
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && products.length === 0 && (
                <div className="rounded-2xl border border-slate-200 px-5 py-12 text-center">
                    <p className="font-semibold text-slate-800">
                        No featured products available
                    </p>
                    <p className="mt-2 text-sm text-slate-500">
                        Please check back in a little while.
                    </p>
                </div>
            )}

            {/* Bottom link */}
            {!loading && !error && products.length > 0 && (
                <div className="mt-8 text-center sm:hidden">
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700"
                    >
                        Browse all products <span>→</span>
                    </Link>
                </div>
            )}
        </section>
    );
};

export default FeaturedProducts;
