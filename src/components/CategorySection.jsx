
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    {
        name: "Beauty",
        description: "Everyday essentials",
        color: "from-pink-100 to-rose-200",
        category: "beauty",
    },
    {
        name: "Clothing",
        description: "Discover your style",
        color: "from-purple-100 to-violet-200",
        category: "mens-shirts",
    },
    {
        name: "Furniture",
        description: "Refresh your space",
        color: "from-orange-100 to-amber-200",
        category: "furniture",
    },
    {
        name: "Groceries",
        description: "Everyday must-haves",
        color: "from-green-100 to-emerald-200",
        category: "groceries",
    },
    {
        name: "Laptops",
        description: "Power up your work",
        color: "from-blue-100 to-cyan-200",
        category: "laptops",
    },
    {
        name: "Shoes",
        description: "Step up your style",
        color: "from-yellow-100 to-orange-200",
        category: "mens-shoes",
    },
];

const CategorySection = () => {
    const [categoryImages, setCategoryImages] = useState({});

    useEffect(() => {
        const fetchCategoryImages = async () => {
            try {
                const results = await Promise.all(
                    categories.map(async (category) => {
                        const response = await fetch(
                            `https://dummyjson.com/products/category/${category.category}?limit=1`
                        );

                        if (!response.ok) {
                            throw new Error("Failed to fetch products");
                        }

                        const data = await response.json();

                        return {
                            category: category.category,
                            image: data.products?.[0]?.thumbnail,
                        };
                    })
                );

                const images = {};

                results.forEach(({ category, image }) => {
                    if (image) {
                        images[category] = image;
                    }
                });

                setCategoryImages(images);
            } catch (error) {
                console.error("Error fetching category images:", error);
            }
        };

        fetchCategoryImages();
    }, []);

    return (
        <section className="py-14">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                        Find your favorites
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Shop by Category
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Explore collections made for you.
                    </p>
                </div>

                <Link
                    to="/products"
                    className="font-semibold text-violet-700 transition hover:text-violet-900"
                >
                    View all products →
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                    <Link
                        key={category.category}
                        to={`/products?category=${encodeURIComponent(category.category)}`}
                        className={`group overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-3 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-4`}
                    >
                        <div className="flex h-28 items-center justify-center overflow-hidden rounded-xl bg-white/60 sm:h-36">
                            {categoryImages[category.category] ? (
                                <img
                                    src={categoryImages[category.category]}
                                    alt={category.name}
                                    loading="lazy"
                                    className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-110"
                                />
                            ) : (
                                <div className="h-full w-full animate-pulse rounded-xl bg-white/50" />
                            )}
                        </div>

                        <h3 className="mt-4 font-bold text-slate-900">
                            {category.name}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-600">
                            {category.description}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
