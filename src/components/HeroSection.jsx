
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section
            className="relative flex min-h-[540px] items-center overflow-hidden bg-cover bg-center bg-no-repeat sm:min-h-[620px] lg:min-h-[680px]"
            style={{
                backgroundImage: "url('/images/Hero-bg.jpg')",
            }}
        >
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10" />

            {/* Content */}
            <div className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
                <div className="max-w-2xl text-white">

                    {/* Label */}
                    <div className="mb-6 flex items-center gap-3">
                        <span className="h-[2px] w-10 bg-violet-400" />

                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300 sm:text-sm">
                            Discover The Difference
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="font-serif text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[72px]">
                        Style That Speaks
                        <br />
                        <span className="font-normal italic">
                            For Yourself.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-md text-sm leading-7 text-gray-200 sm:text-base">
                        From everyday essentials to standout pieces,
                        discover collections that match your style
                        and make every moment special.
                    </p>

                    {/* Buttons */}
                    <div className="mt-9 flex flex-wrap items-center gap-6">
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-4 rounded-sm bg-violet-600 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-violet-700"
                        >
                            Explore Collection

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="19"
                                height="19"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>

                        <Link
                            to="/products"
                            className="border-b border-white/60 pb-2 text-sm font-semibold transition-colors duration-300 hover:border-violet-400 hover:text-violet-300"
                        >
                            Discover More
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
