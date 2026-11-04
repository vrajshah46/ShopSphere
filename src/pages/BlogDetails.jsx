
import { Link, useParams } from "react-router-dom";
import blogPosts from "../data/blogPosts";

const BlogDetails = () => {
    const { slug } = useParams();

    const post = blogPosts.find(
        (item) => item.slug === slug
    );

    // Handle invalid blog URL
    if (!post) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-5">
                <h2 className="text-3xl font-bold text-slate-900">
                    Article Not Found
                </h2>

                <p className="mt-3 text-slate-500">
                    Sorry, this article doesn't exist.
                </p>

                <Link
                    to="/blog"
                    className="mt-6 rounded-full bg-violet-600 px-6 py-3 text-white"
                >
                    Back to Blog
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-white">

            {/* Article Header */}
            <section className="mx-auto max-w-4xl px-5 pb-10 pt-14">

                <Link
                    to="/blog"
                    className="text-sm font-semibold text-violet-600 hover:text-violet-800"
                >
                    ← Back to Blog
                </Link>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-violet-600">
                    <span>{post.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400">
                        {post.readTime}
                    </span>
                </div>

                <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
                    {post.title}
                </h1>

                <p className="mt-5 text-base leading-7 text-slate-500">
                    {post.description}
                </p>

                <div className="mt-7 flex items-center justify-between border-y border-slate-100 py-5">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {post.author}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                            {post.date}
                        </p>
                    </div>
                </div>

            </section>


            {/* Cover Image */}
            <section className="mx-auto max-w-6xl px-5">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                    />
                </div>
            </section>


            {/* Article Content */}
            <section className="mx-auto max-w-3xl px-5 py-14">

                {post.content.map((section, index) => (
                    <div key={index} className="mb-10">

                        <h2 className="mb-4 text-2xl font-bold text-slate-900">
                            {section.heading}
                        </h2>

                        {section.paragraphs.map((paragraph, i) => (
                            <p
                                key={i}
                                className="mb-5 text-base leading-8 text-slate-600"
                            >
                                {paragraph}
                            </p>
                        ))}

                    </div>
                ))}

                <div className="mt-12 border-t border-slate-200 pt-8">
                    <Link
                        to="/blog"
                        className="inline-flex rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                        ← Explore More Articles
                    </Link>
                </div>

            </section>

        </main>
    );
};

export default BlogDetails;
