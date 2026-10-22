
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");



    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");
                setProduct(null);

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

    if (loading) {
        return (
            <p className="p-8 text-center text-gray-600">
                Loading product...
            </p>
        );
    }

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
                    <p className={`mt-3 text-sm font-medium ${product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                        }`}>
                        {product.stock > 0
                            ? `In stock (${product.stock} available)`
                            : "Out of stock"}
                    </p>

                    {/* Description */}
                    <p className="mt-5 leading-7 text-gray-600">
                        {product.description}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className="mt-7 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400 sm:w-fit"
                    >
                        Add to Cart
                    </button>
                </div>

            </div>
        </section>
    );
};

export default ProductDetails;
