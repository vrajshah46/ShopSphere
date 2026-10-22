
import { Link } from "react-router-dom";

const blogPosts = [
    {
        id: 1,
        category: "STYLE GUIDE",
        title: "Everyday Style: Build a Wardrobe You Love",
        description:
            "Discover simple ways to mix essentials, explore your style, and make every outfit feel effortless.",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85",
        date: "Oct 12, 2026",
        readTime: "5 min read",
        slug: "everyday-style-guide",
    },
    {
        id: 2,
        category: "TECH & GADGETS",
        title: "How to Choose the Right Laptop for You",
        description:
            "From everyday browsing to creative work, learn what matters when choosing your next laptop.",
        image:
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
        date: "Oct 08, 2026",
        readTime: "6 min read",
        slug: "choose-the-right-laptop",
    },
    {
        id: 3,
        category: "HOME & LIVING",
        title: "Small Changes That Make Your Home Feel Better",
        description:
            "Explore practical decor ideas that bring comfort, character, and a fresh look to your space.",
        image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
        date: "Oct 04, 2026",
        readTime: "4 min read",
        slug: "home-decor-ideas",
    },
];

const BlogSection = () => {
    return (
        <section className="py-16 sm:py-20">
            {/* Section heading */}
            <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-7 rounded-full bg-violet-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">
                            Ideas, guides & inspiration
                        </p>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        The ShopSphere{" "}
                        <span className="text-violet-600">Journal.</span>
                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                        Fresh ideas, helpful guides, and inspiration to help
                        you shop smarter and live better.
                    </p>
                </div>

                <Link
                    to="/blog"
                    className="group inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-violet-600 hover:bg-violet-600 hover:text-white"
                >
                    Explore all articles
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </div>

            {/* Blog cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                    <article
                        key={post.id}
                        className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/50"
                    >
                        <Link
                            to={`/blog/${post.slug}`}
                            aria-label={`Read ${post.title}`}
                            className="block overflow-hidden"
                        >
                            <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        </Link>

                        <div className="p-5 sm:p-6">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wider text-violet-700">
                                <span>{post.category}</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-medium tracking-normal text-slate-400">
                                    {post.readTime}
                                </span>
                            </div>

                            <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 sm:text-xl">
                                <Link to={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-500">
                                {post.description}
                            </p>

                            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                                <span className="text-xs text-slate-400">
                                    {post.date}
                                </span>

                                <Link
                                    to={`/blog/${post.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-violet-700"
                                >
                                    Read article
                                    <span className="transition-transform group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default BlogSection;
