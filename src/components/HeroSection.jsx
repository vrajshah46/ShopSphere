
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section
            className="relative flex min-h-[420px] items-center overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[500px] lg:min-h-[600px]"
            style={{
                backgroundImage:
                    "url('images/Hero-bg.jpg')",
            }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/30" />

            <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
                <div className="max-w-xl text-white">
                    <p
                        className="hero-fade-up mb-4 text-sm font-semibold uppercase tracking-[0.2em] sm:text-base"
                    >
                        Best Products Collection
                    </p>

                    <h1
                        className="hero-fade-up text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl"
                        style={{ animationDelay: "150ms" }}
                    >
                        Final Sale For
                        <br />
                        <span className="font-light">2026</span>
                    </h1>

                    <div
                        className="hero-fade-up mt-8"
                        style={{ animationDelay: "300ms" }}
                    >
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-3 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition duration-300 hover:bg-violet-600 hover:text-white sm:px-9 sm:py-4"
                        >
                            Shop Now
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
