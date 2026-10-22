import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
    {
        eyebrow: "NEW FASHION COLLECTION",
        title: "Upgrade Your",
        highlight: "Everyday Style",
        description:
            "Discover trendy outfits made for your style, comfort and confidence.",
        image: "/images/",
        category: "womens-dresses",
        bg: "bg-[#f0e2ff]",
        accent: "#7543a5",
    },
    {
        eyebrow: "BEAUTY ESSENTIALS",
        title: "Glow With",
        highlight: "Confidence",
        description:
            "Explore beauty essentials and skincare favorites for your daily routine.",
        image: "/images/",
        category: "beauty",
        bg: "bg-[#ffe9ef]",
        accent: "#b34469",
    },
    {
        eyebrow: "STEP INTO STYLE",
        title: "Find Your",
        highlight: "Perfect Pair",
        description:
            "Discover stylish sneakers and shoes that complete every outfit.",
        image: "/images/shoes-model.png",
        category: "mens-shoes",
        bg: "bg-[#e5edff]",
        accent: "#3157a4",
    },
];

export default function HeroSection() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slide = slides[activeSlide];

    const nextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setActiveSlide(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section
            className={`relative w-full overflow-hidden transition-colors duration-700 ${slide.bg}`}
        >
            <div className="relative mx-auto grid min-h-[600px] max-w-[1600px] items-center md:min-h-[680px] md:grid-cols-2 lg:min-h-[720px]">

                {/* LEFT: TEXT */}
                <div
                    key={`text-${activeSlide}`}
                    className="relative z-10 flex items-center px-7 pb-8 pt-16 sm:px-12 md:py-16 lg:px-16 xl:px-24 animate-[heroTextIn_700ms_ease-out]"
                >
                    <div className="max-w-xl">
                        <p
                            className="mb-5 text-sm font-semibold tracking-wider"
                            style={{ color: slide.accent }}
                        >
                            {slide.eyebrow}
                        </p>

                        <h1 className="text-4xl font-medium leading-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                            {slide.title}
                            <span
                                className="mt-2 block font-semibold"
                                style={{ color: slide.accent }}
                            >
                                {slide.highlight}
                            </span>
                        </h1>

                        <p className="mt-6 max-w-md text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                            {slide.description}
                        </p>

                        <Link
                            to={`/products?category=${encodeURIComponent(slide.category)}`}
                            className="mt-8 inline-flex items-center gap-3 border px-8 py-4 text-sm font-semibold transition-all duration-300 hover:bg-slate-950 hover:text-white"
                            style={{
                                borderColor: slide.accent,
                                color: slide.accent,
                            }}
                        >
                            SHOP NOW <span className="text-lg">→</span>
                        </Link>

                        {/* SLIDE DOTS */}
                        <div className="mt-10 flex items-center gap-3">
                            {slides.map((item, index) => (
                                <button
                                    key={item.eyebrow}
                                    onClick={() => setActiveSlide(index)}
                                    aria-label={`Show ${item.eyebrow}`}
                                    className={`h-2.5 rounded-full transition-all duration-500 ${index === activeSlide
                                        ? "w-9"
                                        : "w-2.5 bg-slate-400/50"
                                        }`}
                                    style={
                                        index === activeSlide
                                            ? { backgroundColor: slide.accent }
                                            : undefined
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: TRANSPARENT MODEL IMAGE */}
                <div className="relative flex min-h-[360px] items-end justify-center overflow-hidden md:min-h-[680px] lg:min-h-[720px]">
                    {slides.map((item, index) => (
                        <img
                            key={item.image}
                            src={item.image}
                            alt={item.eyebrow}
                            className={`absolute bottom-0 right-0 h-full w-full object-contain object-bottom transition-all duration-700 ease-in-out ${index === activeSlide
                                ? "translate-y-0 opacity-100"
                                : "pointer-events-none translate-y-4 opacity-0"
                                }`}
                            loading="eager"
                        />
                    ))}
                </div>
            </div>

            {/* PREVIOUS / NEXT */}
            <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 top-[30%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-2xl text-slate-900 shadow-sm transition hover:bg-white md:left-5 md:top-1/2 md:-translate-y-1/2"
            >
                ‹
            </button>

            <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 top-[30%] z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-2xl text-slate-900 shadow-sm transition hover:bg-white md:right-5 md:top-1/2 md:-translate-y-1/2"
            >
                ›
            </button>
        </section>
    );
}