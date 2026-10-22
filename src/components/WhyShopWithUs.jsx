
const benefits = [
    {
        icon: "🚚",
        title: "Fast Delivery",
        description:
            "Get your favorite products delivered right to your doorstep.",
        color: "bg-blue-100",
    },
    {
        icon: "🔒",
        title: "Secure Shopping",
        description:
            "Enjoy a smooth shopping experience with secure checkout.",
        color: "bg-green-100",
    },
    {
        icon: "↩️",
        title: "Easy Returns",
        description:
            "Shop confidently with a simple and hassle-free return experience.",
        color: "bg-orange-100",
    },
    {
        icon: "💬",
        title: "Customer Support",
        description:
            "We're here to help whenever you need assistance.",
        color: "bg-purple-100",
    },
];

const WhyShopWithUs = () => {
    return (
        <section className="py-14">
            <div className="mb-10 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                    The ShopSphere Difference
                </p>

                <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                    Why Shop With Us?
                </h2>

                <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                    We make finding and shopping for your favorite products
                    simple, convenient, and enjoyable.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit) => (
                    <div
                        key={benefit.title}
                        className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.color} text-3xl transition group-hover:scale-110`}
                        >
                            {benefit.icon}
                        </div>

                        <h3 className="mt-5 text-lg font-bold text-slate-900">
                            {benefit.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            {benefit.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyShopWithUs;
