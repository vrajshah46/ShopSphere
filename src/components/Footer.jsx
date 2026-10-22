
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-16 bg-[#0e1d55] text-slate-300">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="text-2xl font-extrabold tracking-tight text-white"
                        >
                            Shop<span className="text-violet-400">Sphere</span>
                            <span className="text-violet-400">.</span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
                            Discover products you'll love. Shop your
                            favorites and enjoy a simple shopping experience.
                        </p>

                        <div className="mt-5 flex gap-3">
                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600 hover:text-white"
                            >
                                IG
                            </a>

                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600 hover:text-white"
                            >
                                FB
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition hover:bg-violet-600 hover:text-white"
                            >
                                IN
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link to="/" className="transition hover:text-violet-400">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="transition hover:text-violet-400">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="transition hover:text-violet-400">
                                    My Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="transition hover:text-violet-400">
                                    Shopping Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-bold text-white">
                            Customer Service
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link to="/login" className="transition hover:text-violet-400">
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link to="/register" className="transition hover:text-violet-400">
                                    Create Account
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@example.com" className="transition hover:text-violet-400">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Shopping Benefits */}
                    <div>
                        <h3 className="font-bold text-white">
                            Shop With Confidence
                        </h3>

                        <ul className="mt-5 space-y-4 text-sm text-slate-400">
                            <li className="flex items-center gap-3">
                                <span className="text-lg">🚚</span>
                                Convenient Delivery
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-lg">🔒</span>
                                Secure Shopping
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-lg">↩️</span>
                                Easy Returns
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
                    <p>
                        © {new Date().getFullYear()} ShopSphere. All rights reserved.
                    </p>

                    <p>
                        Made with <span className="text-pink-500">♥</span> for better shopping.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
