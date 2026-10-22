
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Products = ({ addToCart, wishlist = [], toggleWishlist }) => {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(
        () => searchParams.get("search") || ""
    );

    const [selectedCategories, setSelectedCategories] = useState(() => {
        const value = searchParams.get("category");
        return value ? value.split(",").filter(Boolean) : [];
    });

    const [selectedTags, setSelectedTags] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const productsPerPage = 6;

    // Sync filters when URL changes
    useEffect(() => {
        setSearch(searchParams.get("search") || "");

        const categoryParam = searchParams.get("category");
        setSelectedCategories(
            categoryParam ? categoryParam.split(",").filter(Boolean) : []
        );

        setCurrentPage(1);
    }, [searchParams]);

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(
                    "https://dummyjson.com/products?limit=0"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products.");
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

    // Categories and tags from API
    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category))].sort(),
        [products]
    );

    const tags = useMemo(
        () => [...new Set(products.flatMap((p) => p.tags || []))].sort(),
        [products]
    );

    const popularTags = tags.slice(0, 12);

    // Update URL category filter
    const updateCategoryParams = (nextCategories) => {
        const params = new URLSearchParams(searchParams);

        if (nextCategories.length === 0) {
            params.delete("category");
        } else {
            params.set("category", nextCategories.join(","));
        }

        setSearchParams(params);
        setCurrentPage(1);
    };

    // Category checkbox
    const handleCategoryChange = (value) => {
        const nextCategories = selectedCategories.includes(value)
            ? selectedCategories.filter((item) => item !== value)
            : [...selectedCategories, value];

        updateCategoryParams(nextCategories);
    };

    // Tag checkbox
    const handleTagChange = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((item) => item !== tag)
                : [...prev, tag]
        );

        setCurrentPage(1);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearch("");
        setSelectedTags([]);
        setSelectedCategories([]);
        setSortBy("default");
        setCurrentPage(1);
        setSearchParams({});
    };

    // Filter products
    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                (product.tags || []).some((tag) =>
                    tag.toLowerCase().includes(query)
                );

            const matchesCategory =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.every((tag) =>
                    (product.tags || []).includes(tag)
                );

            return matchesSearch && matchesCategory && matchesTags;
        });
    }, [products, search, selectedCategories, selectedTags]);

    // Sort products
    const sortedProducts = useMemo(() => {
        const result = [...filteredProducts];

        if (sortBy === "price-low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating") {
            result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        }

        return result;
    }, [filteredProducts, sortBy]);

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    const safePage = Math.min(currentPage, Math.max(totalPages, 1));

    useEffect(() => {
        setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)));
    }, [totalPages]);

    const currentProducts = sortedProducts.slice(
        (safePage - 1) * productsPerPage,
        safePage * productsPerPage
    );

    const hasActiveFilters =
        search.trim() !== "" ||
        selectedCategories.length > 0 ||
        selectedTags.length > 0;

    const formatLabel = (value) =>
        value
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());

    // Sidebar content
    const FilterSidebar = () => (
        <div className="space-y-7">
            {/* Categories */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Categories</h3>
                    {selectedCategories.length > 0 && (
                        <button
                            onClick={() => updateCategoryParams([])}
                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
                    {categories.map((item) => (
                        <label
                            key={item}
                            className="flex cursor-pointer items-center gap-3 text-sm text-gray-600 transition hover:text-indigo-700"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(item)}
                                onChange={() => handleCategoryChange(item)}
                                className="h-4 w-4 rounded border-gray-300 accent-indigo-600"
                            />
                            <span className="flex-1">
                                {formatLabel(item)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Tags */}
            <div>
                <h3 className="mb-4 font-bold text-gray-900">
                    Popular Tags
                </h3>

                <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => {
                        const active = selectedTags.includes(tag);

                        return (
                            <button
                                key={tag}
                                onClick={() => handleTagChange(tag)}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${active
                                    ? "border-indigo-600 bg-indigo-600 text-white"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-700"
                                    }`}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Help card */}
            <div className="rounded-2xl bg-indigo-50 p-4">
                <p className="text-sm font-bold text-indigo-950">
                    Find your next favourite
                </p>
                <p className="mt-2 text-xs leading-5 text-indigo-800">
                    Use categories and tags to narrow down your search.
                </p>
            </div>
        </div>
    );

    return (
        <section className="min-h-screen bg-[#f8f9fc]">
            <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">

                {/* Page heading */}
                <div className="mb-8">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                        Discover your style
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Explore Products
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 sm:text-base">
                        Find the right products for you.
                    </p>
                </div>

                {/* Search bar */}
                <div className="mb-7 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2 shadow-sm focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-50">
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="shrink-0 text-gray-400"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="m20 20-4-4" />
                    </svg>

                    <input
                        type="search"
                        placeholder="Search products, categories or tags..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-transparent py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400"
                    />

                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="rounded-lg px-2 py-1 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                            aria-label="Clear search"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">

                    {/* Desktop sidebar */}
                    <aside className="hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6 lg:block">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">
                                Filters
                            </h2>

                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        <FilterSidebar />
                    </aside>

                    {/* Products section */}
                    <div className="min-w-0">

                        {/* Mobile filter button */}
                        <div className="mb-4 lg:hidden">
                            <button
                                onClick={() =>
                                    setMobileFiltersOpen((open) => !open)
                                }
                                className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-800 shadow-sm"
                            >
                                <span>☷ Filters & Categories</span>
                                <span>{mobileFiltersOpen ? "−" : "+"}</span>
                            </button>

                            {mobileFiltersOpen && (
                                <div className="mt-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                                    <div className="mb-5 flex items-center justify-between">
                                        <h2 className="font-bold text-gray-900">
                                            Filter Products
                                        </h2>

                                        <button
                                            onClick={clearFilters}
                                            className="text-xs font-semibold text-indigo-600"
                                        >
                                            Clear all
                                        </button>
                                    </div>

                                    <FilterSidebar />
                                </div>
                            )}
                        </div>

                        {/* Toolbar */}
                        <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="font-bold text-gray-900">
                                    {selectedCategories.length === 1
                                        ? formatLabel(selectedCategories[0])
                                        : "All Products"}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {loading
                                        ? "Loading products..."
                                        : `${sortedProducts.length} products found`}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <label
                                    htmlFor="sort-products"
                                    className="text-sm text-gray-500"
                                >
                                    Sort by
                                </label>

                                <select
                                    id="sort-products"
                                    value={sortBy}
                                    onChange={(e) => {
                                        setSortBy(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="min-w-36 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-indigo-400"
                                >
                                    <option value="default">Recommended</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                </select>

                                {/* Grid / List toggle */}
                                <div className="flex rounded-xl border border-gray-200 bg-gray-50 p-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        aria-label="Grid view"
                                        title="Grid view"
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === "grid"
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "text-gray-500 hover:bg-white"
                                            }`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            aria-hidden="true"
                                        >
                                            <rect x="3" y="3" width="7" height="7" rx="1" />
                                            <rect x="14" y="3" width="7" height="7" rx="1" />
                                            <rect x="3" y="14" width="7" height="7" rx="1" />
                                            <rect x="14" y="14" width="7" height="7" rx="1" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => setViewMode("list")}
                                        aria-label="List view"
                                        title="List view"
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${viewMode === "list"
                                            ? "bg-indigo-600 text-white shadow-sm"
                                            : "text-gray-500 hover:bg-white"
                                            }`}
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            aria-hidden="true"
                                        >
                                            <path d="M9 5h12M9 12h12M9 19h12" />
                                            <circle cx="4" cy="5" r="1" />
                                            <circle cx="4" cy="12" r="1" />
                                            <circle cx="4" cy="19" r="1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {hasActiveFilters && (
                            <div className="mb-5 flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-xs font-semibold text-gray-500">
                                    Active:
                                </span>

                                {selectedCategories.map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => handleCategoryChange(item)}
                                        className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100"
                                    >
                                        {formatLabel(item)} ×
                                    </button>
                                ))}

                                {selectedTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagChange(tag)}
                                        className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100"
                                    >
                                        {tag} ×
                                    </button>
                                ))}

                                {search.trim() && (
                                    <button
                                        onClick={() => setSearch("")}
                                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
                                    >
                                        Search: {search} ×
                                    </button>
                                )}

                                <button
                                    onClick={clearFilters}
                                    className="px-2 py-1 text-xs font-semibold text-gray-500 underline hover:text-gray-900"
                                >
                                    Reset
                                </button>
                            </div>
                        )}

                        {/* Loading */}
                        {loading && (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <div
                                        key={index}
                                        className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4"
                                    >
                                        <div className="h-48 rounded-xl bg-gray-100" />
                                        <div className="mt-4 h-4 w-3/4 rounded bg-gray-100" />
                                        <div className="mt-3 h-4 w-1/2 rounded bg-gray-100" />
                                        <div className="mt-5 h-10 rounded-lg bg-gray-100" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Error */}
                        {!loading && error && (
                            <div className="rounded-2xl border border-red-100 bg-white px-5 py-14 text-center">
                                <p className="font-semibold text-red-600">
                                    {error}
                                </p>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        )}

                        {/* Product cards */}
                        {!loading && !error && (
                            <>
                                {currentProducts.length === 0 ? (
                                    <div className="rounded-2xl border border-gray-200 bg-white px-5 py-16 text-center">
                                        <div className="text-4xl">⌕</div>

                                        <h3 className="mt-4 text-lg font-bold text-gray-900">
                                            No products found
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Try another search or remove some filters.
                                        </p>

                                        <button
                                            onClick={clearFilters}
                                            className="mt-5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            viewMode === "grid"
                                                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                                                : "grid grid-cols-1 gap-4"
                                        }
                                    >
                                        {currentProducts.map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                                addToCart={addToCart}
                                                wishlist={wishlist}
                                                toggleWishlist={toggleWishlist}
                                                viewMode={viewMode}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                                        <button
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.max(1, page - 1)
                                                )
                                            }
                                            disabled={safePage === 1}
                                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            ← Prev
                                        </button>

                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => index + 1
                                        )
                                            .filter(
                                                (page) =>
                                                    page === 1 ||
                                                    page === totalPages ||
                                                    Math.abs(page - safePage) <= 1
                                            )
                                            .reduce((result, page, index, pages) => {
                                                if (
                                                    index > 0 &&
                                                    page - pages[index - 1] > 1
                                                ) {
                                                    result.push("ellipsis-" + page);
                                                }

                                                result.push(page);
                                                return result;
                                            }, [])
                                            .map((page) =>
                                                typeof page === "string" ? (
                                                    <span
                                                        key={page}
                                                        className="px-1 text-gray-400"
                                                    >
                                                        ...
                                                    </span>
                                                ) : (
                                                    <button
                                                        key={page}
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                        className={`min-w-10 rounded-xl px-3.5 py-2.5 text-sm font-bold ${safePage === page
                                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                                                            : "border border-gray-200 bg-white text-gray-600 hover:border-indigo-400 hover:text-indigo-700"
                                                            }`}
                                                    >
                                                        {page}
                                                    </button>
                                                )
                                            )}

                                        <button
                                            onClick={() =>
                                                setCurrentPage((page) =>
                                                    Math.min(totalPages, page + 1)
                                                )
                                            }
                                            disabled={safePage === totalPages}
                                            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:border-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Products;
