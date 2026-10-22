
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Wishlist = ({ wishlist, addToCart, toggleWishlist }) => {
    return (
        <section className="mx-auto w-full p-4 sm:p-6 lg:w-3/4 lg:p-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                My Wishlist ❤️
            </h1>

            <p className="mb-6 text-gray-500">
                Your favourite products in one place.
            </p>

            {wishlist.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center">
                    <p className="text-5xl">♡</p>

                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        Your wishlist is empty
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Add products using the heart button to see them here.
                    </p>

                    <Link
                        to="/"
                        className="mt-6 inline-block rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        </section>
    );
};

export default Wishlist;
