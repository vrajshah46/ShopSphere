
import { Link } from "react-router-dom";

const Cart = ({ cart, removeFromCart, increment, decrement }) => {
    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const formatINR = (price) =>
        (price * 85).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-3xl font-bold text-gray-900">
                    My Cart
                </h1>

                {cart.length === 0 ? (
                    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Your cart is empty
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Add some products to get started.
                        </p>

                        <Link
                            to="/"
                            className="mt-5 inline-block rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-gray-800"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
                        {/* Cart Items */}
                        <div className="space-y-4 lg:col-span-2">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                                >
                                    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                                        <div className="flex items-center gap-4">
                                            <Link to={`/products/${item.id}`}>
                                                <img
                                                    src={
                                                        item.thumbnail ||
                                                        item.images?.[0]
                                                    }
                                                    alt={item.title}
                                                    className="h-24 w-24 cursor-pointer rounded-lg object-contain transition-transform hover:scale-105"
                                                />
                                            </Link>

                                            <div>
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {item.title}
                                                </h2>

                                                <p className="mt-2 text-sm text-gray-500">
                                                    Price: ₹{formatINR(item.price)}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    Subtotal:{" "}
                                                    <span className="font-semibold text-gray-800">
                                                        ₹
                                                        {formatINR(
                                                            item.price * item.quantity
                                                        )}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quantity and Remove */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center rounded-lg border border-gray-300">
                                                <button
                                                    onClick={() => decrement(item)}
                                                    disabled={item.quantity <= 1}
                                                    className="flex h-9 w-9 items-center justify-center rounded-l-lg text-lg font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                                                    aria-label={`Decrease ${item.title} quantity`}
                                                >
                                                    −
                                                </button>

                                                <span className="min-w-10 text-center font-medium text-gray-900">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() => increment(item)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-r-lg text-lg font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                    aria-label={`Increase ${item.title} quantity`}
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(item)}
                                                className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <aside className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg shadow-gray-200/50 lg:sticky lg:top-24">
                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-5 flex items-center justify-between border-b border-gray-200 pb-4 text-sm text-gray-600">
                                <span>Total items</span>
                                <span className="font-medium text-gray-900">
                                    {totalItems}
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <span className="font-medium text-gray-700">
                                    Total Price
                                </span>

                                <span className="text-xl font-bold text-emerald-600">
                                    ₹{formatINR(totalPrice)}
                                </span>
                            </div>

                            <Link
                                to="/"
                                className="mt-5 block w-full rounded-xl border border-gray-300 px-5 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
                            >
                                Continue Shopping
                            </Link>

                            <Link
                                to="/checkout"
                                className="mt-3 block w-full rounded-xl bg-black px-5 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                            >
                                Checkout
                            </Link>
                        </aside>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
