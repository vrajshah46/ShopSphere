
import { useState } from "react";
import { Link } from "react-router-dom";
import blogPosts from "../data/blogPosts";

const Blog = () => {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");

    // Get unique categories
    const categories = [
        "ALL",
        ...new Set(blogPosts.map((post) => post.category)),
    ];

    // Filter blog posts
    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory =
            activeCategory === "ALL" ||
            post.category === activeCategory;

        const matchesSearch =
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.description.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <main className="bg-white">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden bg-violet-50 py-20 sm:py-28">

                <div className="mx-auto max-w-7xl px-5">
                    <div className="max-w-2xl">

                        <span className="mb-5 inline-block rounded-full bg-violet-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-700">
                            ShopSphere Journal
                        </span>

                        <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
                            Ideas, Inspiration &
                            <span className="text-violet-600">
                                {" "}Everything You Love.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                            Explore the latest trends, shopping guides,
                            lifestyle inspiration and expert tips to make
                            your everyday choices better.
                        </p>

                        <a
                            href="#articles"
                            className="mt-8 inline-flex rounded-full bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            Explore Articles →
                        </a>

                    </div>
                </div>
            </section>


            {/* ================= FEATURED ARTICLE ================= */}
            <section className="mx-auto max-w-7xl px-5 py-16">

                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                        Editor's Pick
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        Featured Article
                    </h2>
                </div>

                {blogPosts.length > 0 && (
                    <article className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2">

                        {/* Featured Image */}
                        <Link
                            to={`/blog/${blogPosts[0].slug}`}
                            className="h-72 overflow-hidden md:h-full"
                        >
                            <img
                                src={blogPosts[0].image}
                                alt={blogPosts[0].title}
                                className="h-full w-full object-cover transition duration-500 hover:scale-105"
                            />
                        </Link>

                        {/* Featured Content */}
                        <div className="flex flex-col justify-center p-7 sm:p-10">

                            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-violet-600">
                                <span>{blogPosts[0].category}</span>
                                <span className="text-slate-300">•</span>
                                <span className="font-medium text-slate-400">
                                    {blogPosts[0].readTime}
                                </span>
                            </div>

                            <h3 className="mt-5 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
                                {blogPosts[0].title}
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-500">
                                {blogPosts[0].description}
                            </p>

                            <div className="mt-6 text-xs text-slate-400">
                                {blogPosts[0].date}
                            </div>

                            <Link
                                to={`/blog/${blogPosts[0].slug}`}
                                className="mt-7 w-fit rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                            >
                                Read Full Article →
                            </Link>

                        </div>
                    </article>
                )}

            </section>


            {/* ================= BLOG LISTING ================= */}
            <section
                id="articles"
                className="mx-auto max-w-7xl px-5 py-16"
            >

                {/* Heading */}
                <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
                        Explore Our Journal
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        Latest Articles
                    </h2>

                    <p className="mt-3 text-sm text-slate-500">
                        Discover stories, guides and inspiration.
                    </p>
                </div>


                {/* Search Input */}
                <div className="mb-8">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-5 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 sm:max-w-md"
                    />
                </div>


                {/* Category Filters */}
                <div className="mb-10 flex flex-wrap gap-3">

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category
                                ? "bg-violet-600 text-white"
                                : "border border-slate-200 text-slate-600 hover:border-violet-500 hover:text-violet-600"
                                }`}
                        >
                            {category}
                        </button>
                    ))}

                </div>


                {/* Results Count */}
                <p className="mb-6 text-sm text-slate-500">
                    Showing {filteredPosts.length} articles
                </p>


                {/* Blog Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {filteredPosts.map((post) => (
                        <article
                            key={post.id}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-slate-200/50"
                        >

                            {/* Card Image */}
                            <Link
                                to={`/blog/${post.slug}`}
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


                            {/* Card Content */}
                            <div className="p-5 sm:p-6">

                                <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-wider text-violet-700">

                                    <span>{post.category}</span>

                                    <span className="text-slate-300">
                                        •
                                    </span>

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


                                {/* Card Footer */}
                                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

                                    <span className="text-xs text-slate-400">
                                        {post.date}
                                    </span>

                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors hover:text-violet-700"
                                    >
                                        Read Article
                                        <span className="transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </Link>

                                </div>

                            </div>

                        </article>
                    ))}

                </div>


                {/* No Results */}
                {filteredPosts.length === 0 && (
                    <div className="py-16 text-center">

                        <h3 className="text-xl font-bold text-slate-800">
                            No Articles Found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Try searching with a different keyword or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setActiveCategory("ALL");
                            }}
                            className="mt-5 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                        >
                            Clear Filters
                        </button>

                    </div>
                )}

            </section>

        </main>
    );
};

export default Blog;
