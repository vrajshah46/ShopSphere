
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (
            !name.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        let existingUsers = [];

        try {
            const savedUsers = JSON.parse(
                localStorage.getItem("users") || "[]"
            );

            existingUsers = Array.isArray(savedUsers)
                ? savedUsers
                : [];
        } catch {
            setError("Unable to read saved users. Please try again.");
            return;
        }

        const userExists = existingUsers.some(
            (user) =>
                user.email?.trim().toLowerCase() === normalizedEmail
        );

        if (userExists) {
            setError("An account with this email already exists.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: normalizedEmail,
            role: "user",
            registeredAt: new Date().toISOString(),
        };

        const updatedUsers = [...existingUsers, newUser];

        try {
            localStorage.setItem(
                "users",
                JSON.stringify(updatedUsers)
            );
        } catch {
            setError("Unable to save your account. Please try again.");
            return;
        }

        // Notify components in the same browser tab.
        window.dispatchEvent(new Event("usersUpdated"));

        setSuccess("Registration successful!");

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-4">
            <div className="mt-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <h1 className="text-center text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Join ShopSphere today
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Enter your full name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
                            minLength={6}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            minLength={6}
                            required
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
                        >
                            {error}
                        </p>
                    )}

                    {success && (
                        <p
                            role="status"
                            className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
                        >
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
