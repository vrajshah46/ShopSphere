
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ wishlist, addToCart, toggleWishlist }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://dummyjson.com/products?limit=8&sortBy=rating&order=desc"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products || []);
            } catch {
                setError("Products load nahi ho paaye. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <section className="py-12">
            {/* Section heading */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Handpicked for you
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Featured Products
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Discover popular picks for your everyday needs.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="rounded-xl bg-[#0e1d55] px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
                >
                    View All Products →
                </Link>
            </div>

            {/* Loading state */}
            {loading && (
                <p className="py-12 text-center text-slate-500">
                    Loading featured products...
                </p>
            )}

            {/* Error state */}
            {!loading && error && (
                <p role="alert" className="py-8 text-center text-red-600">
                    {error}
                </p>
            )}

            {/* Products grid */}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>
    );
};

export default FeaturedProducts;
