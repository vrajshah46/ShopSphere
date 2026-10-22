
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail) {
            setError("Please enter your email.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        let savedUsers = [];

        try {
            const data = JSON.parse(
                localStorage.getItem("users") || "[]"
            );

            savedUsers = Array.isArray(data) ? data : [];
        } catch {
            setError("Unable to read registered accounts.");
            return;
        }

        const matchedUser = savedUsers.find(
            (user) =>
                user.email?.trim().toLowerCase() === normalizedEmail
        );

        if (!matchedUser) {
            setError("No account found with this email.");
            return;
        }

        onLogin();
        navigate(from, { replace: true });
    };

    return (
        <section className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                <h1 className="text-center text-3xl font-bold text-gray-900">
                    Welcome Back
                </h1>

                <p className="mt-2 text-center text-gray-500">
                    Login to your ShopSphere account
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
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

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
