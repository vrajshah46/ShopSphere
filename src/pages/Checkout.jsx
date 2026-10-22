
import { useState } from "react";
import { Link } from "react-router-dom";

const Checkout = ({ cart, clearCart, setToast }) => {
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState("");

    const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? 50 : 0;
    const total = subtotal + shipping;

    const formatINR = (amount) =>
        (amount * 85).toLocaleString("en-IN", {
            maximumFractionDigits: 0,
        });

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const form = e.currentTarget;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (cart.length === 0) {
            setToast({
                message: "Your cart is empty!",
                type: "error",
            });
            return;
        }

        const formData = new FormData(form);
        const paymentMethod = formData.get("paymentMethod");

        if (paymentMethod === "online") {
            setToast({
                message: "Online payment is not available yet. Please select Cash on Delivery.",
                type: "error",
            });
            return;
        }

        const newOrderId = `SS-${Date.now()}`;

        setOrderId(newOrderId);
        clearCart();
        setOrderPlaced(true);

        setToast({
            message: "Order placed successfully!",
            type: "success",
        });
    };

    return (
        <section className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-900">
                    Checkout
                </h1>

                <p className="mt-2 text-gray-500">
                    Complete your order
                </p>

                {!orderPlaced && (
                    <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <form
                                id="checkout-form"
                                onSubmit={handlePlaceOrder}
                                className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
                                <h2 className="mb-4 text-xl font-bold text-gray-900">
                                    Shipping Information
                                </h2>

                                <div>
                                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        placeholder="Enter your full name"
                                        autoComplete="name"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        autoComplete="tel"
                                        required
                                        maxLength={10}
                                        pattern="[0-9]{10}"
                                        inputMode="numeric"
                                        title="Please enter a valid 10-digit phone number"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                                        Full Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        rows={3}
                                        placeholder="House no., street, area..."
                                        autoComplete="street-address"
                                        required
                                        className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="Enter your city"
                                            autoComplete="address-level2"
                                            required
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="pinCode" className="mb-2 block text-sm font-medium text-gray-700">
                                            PIN Code
                                        </label>
                                        <input
                                            type="text"
                                            id="pinCode"
                                            name="pinCode"
                                            placeholder="6-digit PIN code"
                                            autoComplete="postal-code"
                                            required
                                            maxLength={6}
                                            pattern="[0-9]{6}"
                                            inputMode="numeric"
                                            title="Please enter a valid 6-digit PIN code"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="mb-4 text-xl font-bold text-gray-900">
                                        Payment Method
                                    </h2>

                                    <div className="space-y-3">
                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-blue-400">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                defaultChecked
                                                className="h-4 w-4 accent-blue-600"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Cash on Delivery
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Pay when your order arrives
                                                </p>
                                            </div>
                                        </label>

                                        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-blue-400">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="online"
                                                className="h-4 w-4 accent-blue-600"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Online Payment
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Currently unavailable in this demo
                                                </p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{formatINR(subtotal)}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹{formatINR(shipping)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between gap-3 text-lg font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>₹{formatINR(total)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={cart.length === 0}
                                className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                Place Order
                            </button>

                            <p className="mt-3 text-center text-sm text-gray-500">
                                Thank you for shopping with us!
                            </p>
                        </aside>
                    </div>
                )}

                {orderPlaced && (
                    <div className="mt-8 rounded-2xl border border-green-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <svg
                                className="h-9 w-9 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12l4 4L19 6"
                                />
                            </svg>
                        </div>

                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                            Order Placed Successfully!
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Thank you for shopping with ShopSphere.
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            Your order confirmation is ready.
                        </p>

                        <p className="mt-4 text-sm text-gray-500">
                            Order ID:{" "}
                            <span className="font-semibold text-gray-900">
                                {orderId}
                            </span>
                        </p>

                        <Link
                            to="/"
                            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Checkout;
