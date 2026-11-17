
import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useCartStore from "../store/cartStore";
import AddToCartButton from "../components/AddToCartButton";

const ProductDetails = () => {
    const { addToCart } = useCartStore();
    const { id } = useParams();
    const buttonRef = useRef(null);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);

    const handleAddToCart = (e) => {
        // Ripple effect
        const button = buttonRef.current;
        if (button) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            button.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }

        addToCart(product);
    };

    // Fetch Current Product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");
                setProduct(null);
                setRelatedProducts([]);

                const response = await fetch(
                    `https://dummyjson.com/products/${id}`
                );

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                const data = await response.json();
                setProduct(data);

            } catch (err) {
                setError(err.message || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    // Fetch Same Category Products
    useEffect(() => {
        if (!product?.category) return;

        const fetchRelatedProducts = async () => {
            try {
                setRelatedLoading(true);

                const response = await fetch(
                    `https://dummyjson.com/products/category/${product.category}`
                );

                if (!response.ok) {
                    throw new Error("Unable to fetch related products");
                }

                const data = await response.json();

                const filteredProducts = data.products
                    .filter(
                        (item) =>
                            item.id !== product.id &&
                            item.category === product.category
                    )
                    .slice(0, 4);

                setRelatedProducts(filteredProducts);

            } catch (err) {
                console.log(err);
                setRelatedProducts([]);
            } finally {
                setRelatedLoading(false);
            }
        };

        fetchRelatedProducts();
    }, [product]);

    // Loading State
    if (loading) {
        return (
            <p className="p-8 text-center text-gray-600">
                Loading product...
            </p>
        );
    }

    // Error State
    if (error || !product) {
        return (
            <p className="p-8 text-center text-red-600">
                {error || "Product not found"}
            </p>
        );
    }

    const rating = Number(product.rating || 0);
    const reviewCount = product.reviews?.length || 0;
    const priceInINR = product.price * 85;

    return (
        <main>

            {/* Product Details */}
            <section className="mx-auto max-w-6xl p-4 sm:p-8">

                <div className="grid gap-8 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-8">

                    {/* Product Image */}
                    <div className="flex items-center justify-center rounded-xl bg-gray-50 p-6">
                        <img
                            src={product.images?.[0] || product.thumbnail}
                            alt={product.title}
                            className="h-72 w-full object-contain sm:h-96"
                        />
                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        <p className="mb-3 text-sm capitalize text-blue-600">
                            {product.category?.replace(/-/g, " ")}
                        </p>

                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <p className="mt-3 text-sm text-gray-600">
                            ⭐ {rating.toFixed(1)} / 5
                            <span className="ml-2">
                                ({reviewCount} reviews)
                            </span>
                        </p>

                        {/* Price */}
                        <div className="mt-5 flex flex-wrap items-center gap-3">

                            <p className="text-3xl font-bold text-gray-900">
                                ₹{priceInINR.toLocaleString("en-IN", {
                                    maximumFractionDigits: 0,
                                })}
                            </p>

                            {product.discountPercentage > 0 && (
                                <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
                                    {Math.round(product.discountPercentage)}% OFF
                                </span>
                            )}

                        </div>

                        {/* Stock */}
                        <p
                            className={`mt-3 text-sm font-medium ${product.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {product.stock > 0
                                ? `In stock (${product.stock} available)`
                                : "Out of stock"}
                        </p>

                        {/* Description */}
                        <p className="mt-5 leading-7 text-gray-600">
                            {product.description}
                        </p>


                        <AddToCartButton
                            onAddToCart={() => addToCart?.(product)}
                            text="Add to Cart"
                            addedText="Added"
                            loadingTime={1000}
                            resetTime={2000}
                            disabled={product.stock <= 0}
                            className="!rounded-xl !bg-indigo-600 !px-5 !py-3 !text-sm hover:!bg-indigo-700 w-[50%] mt-5"
                        />

                    </div>
                </div>
            </section>

            {/* Recommended Products */}
            <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-8">

                {/* Heading */}
                <div className="mb-7">

                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        You May Also Like
                    </h2>

                    <p className="mt-2 text-sm capitalize text-gray-500">
                        More products in {product.category?.replace(/-/g, " ")}
                    </p>

                </div>

                {/* Related Products */}
                {relatedLoading ? (

                    <p className="py-8 text-center text-gray-500">
                        Loading recommendations...
                    </p>

                ) : relatedProducts.length > 0 ? (

                    <div className="flex w-full min-w-0 max-w-full gap-5 overflow-x-auto scroll-smooth pb-4">

                        {relatedProducts.map((item) => (

                            <Link
                                to={`/products/${item.id}`}
                                key={item.id}
                                className="w-[250px] min-w-[250px] flex-none overflow-hidden rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg "
                            >

                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-48 w-full object-contain"
                                />

                                <h3 className="mt-3 font-semibold text-gray-800">
                                    {item.title}
                                </h3>

                                <p className="mt-2 font-bold text-gray-900">
                                    ₹{(item.price * 85).toLocaleString("en-IN", {
                                        maximumFractionDigits: 0,
                                    })}
                                </p>

                            </Link>

                        ))}

                    </div>

                ) : (

                    <p className="py-8 text-center text-gray-500">
                        No related products found.
                    </p>

                )}

            </section>

        </main>
    );
};

export default ProductDetails;
