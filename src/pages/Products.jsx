import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = ({ addToCart, wishlist, toggleWishlist }) => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(
        () => searchParams.get("search") || ""
    );

    const [category, setCategory] = useState(
        () => searchParams.get("category") || "all"
    );

    const [sortBy, setSortBy] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const productsPerPage = 6;

    // Sync search and category when URL query changes
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setCategory(searchParams.get("category") || "all");
        setCurrentPage(1);
    }, [searchParams]);

    // Fetch products from DummyJSON
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://dummyjson.com/products?limit=0"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.products || []);
            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Get categories from fetched products
    const categories = [
        ...new Set(products.map((product) => product.category)),
    ].sort();

    // Search and category filtering
    const filteredProducts = products.filter((product) => {
        const query = search.trim().toLowerCase();

        const matchesSearch =
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query);

        const matchesCategory =
            category === "all" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    // Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price-low") {
            return a.price - b.price;
        }

        if (sortBy === "price-high") {
            return b.price - a.price;
        }

        if (sortBy === "rating") {
            return (b.rating || 0) - (a.rating || 0);
        }

        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(
        sortedProducts.length / productsPerPage
    );

    // Keep current page valid when filters change
    useEffect(() => {
        setCurrentPage((page) =>
            Math.min(page, Math.max(totalPages, 1))
        );
    }, [totalPages]);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = sortedProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
    );

    // Update category in both state and URL
    const handleCategoryChange = (value) => {
        setCategory(value);
        setCurrentPage(1);

        const nextParams = new URLSearchParams(searchParams);

        if (value === "all") {
            nextParams.delete("category");
        } else {
            nextParams.set("category", value);
        }

        setSearchParams(nextParams);
    };

    const categoryTitle =
        category === "all"
            ? "Our Products"
            : category
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());

    return (
        <section className="mx-auto w-full max-w-7xl p-4 font-spectal sm:p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {categoryTitle}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {sortedProducts.length} products found
                </p>
            </div>

            {/* Search, category and sorting */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-black focus:ring-1 focus:ring-black sm:flex-1"
                />

                <select
                    value={category}
                    onChange={(e) =>
                        handleCategoryChange(e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black sm:w-56"
                >
                    <option value="all">All Categories</option>

                    {categories.map((item) => (
                        <option key={item} value={item}>
                            {item
                                .replace(/-/g, " ")
                                .replace(/\b\w/g, (char) =>
                                    char.toUpperCase()
                                )}
                        </option>
                    ))}
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-black sm:w-52"
                >
                    <option value="default">Sort By</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            {loading && (
                <p className="py-10 text-center font-medium text-gray-600">
                    Loading products...
                </p>
            )}

            {!loading && error && (
                <div className="py-10 text-center">
                    <p className="mb-4 text-red-600">{error}</p>

                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
                    >
                        Retry
                    </button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {currentProducts.length === 0 ? (
                            <p className="col-span-full py-10 text-center text-gray-500">
                                No products found. Try another search or category.
                            </p>
                        ) : (
                            currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                    wishlist={wishlist}
                                    toggleWishlist={toggleWishlist}
                                />
                            ))
                        )}
                    </div>



                    {totalPages > 1 && (
                        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

                            {/* Previous Button */}
                            <button
                                onClick={() =>
                                    setCurrentPage((page) => page - 1)
                                }
                                disabled={currentPage === 1}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#0e1d55] hover:text-[#0e1d55] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
                            >
                                ← Prev
                            </button>

                            {/* First Page */}
                            <button
                                onClick={() => setCurrentPage(1)}
                                className={`min-w-10 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${currentPage === 1
                                    ? "bg-[#0e1d55] text-white shadow-md shadow-[#0e1d55]/25"
                                    : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#0e1d55] hover:bg-slate-50 hover:text-[#0e1d55]"
                                    }`}
                            >
                                1
                            </button>

                            {/* Left Ellipsis */}
                            {currentPage > 3 && (
                                <span className="px-1 font-bold tracking-widest text-slate-400">
                                    ...
                                </span>
                            )}

                            {/* Nearby Pages */}
                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            )
                                .filter(
                                    (page) =>
                                        page !== 1 &&
                                        page !== totalPages &&
                                        Math.abs(page - currentPage) <= 1
                                )
                                .map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`min-w-10 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${currentPage === page
                                            ? "bg-[#0e1d55] text-white shadow-md shadow-[#0e1d55]/25"
                                            : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#0e1d55] hover:bg-slate-50 hover:text-[#0e1d55]"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                            {/* Right Ellipsis */}
                            {currentPage < totalPages - 2 && (
                                <span className="px-1 font-bold tracking-widest text-slate-400">
                                    ...
                                </span>
                            )}

                            {/* Last Page */}
                            {totalPages > 1 && (
                                <button
                                    onClick={() => setCurrentPage(totalPages)}
                                    className={`min-w-10 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all duration-200 ${currentPage === totalPages
                                        ? "bg-[#0e1d55] text-white shadow-md shadow-[#0e1d55]/25"
                                        : "border border-slate-200 bg-white text-slate-600 shadow-sm hover:border-[#0e1d55] hover:bg-slate-50 hover:text-[#0e1d55]"
                                        }`}
                                >
                                    {totalPages}
                                </button>
                            )}

                            {/* Next Button */}
                            <button
                                onClick={() =>
                                    setCurrentPage((page) => page + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-[#0e1d55] hover:text-[#0e1d55] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:text-slate-700"
                            >
                                Next →
                            </button>

                        </div>
                    )}


                </>
            )}
        </section>
    );
};

export default Products;
