
import React from "react";

const features = [
    {
        image: "https://flone.jamstacktemplates.dev/assets/img/icon-img/support-1.png",
        title: "Free Shipping",
        description: "Free shipping on all order",
        animation: "feature-float",
    },
    {
        image: "https://flone.jamstacktemplates.dev/assets/img/icon-img/support-2.png",
        title: "Support 24/7",
        description: "Free shipping on all order",
        animation: "feature-pulse",
    },
    {
        image: "https://flone.jamstacktemplates.dev/assets/img/icon-img/support-3.png",
        title: "Money Return",
        description: "Free shipping on all order",
        animation: "feature-float",
    },
    {
        image: "https://flone.jamstacktemplates.dev/assets/img/icon-img/support-4.png",
        title: "Order Discount",
        description: "Free shipping on all order",
        animation: "feature-pulse",
    },
];

const ServiceFeatures = () => {
    return (
        <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-1 px-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div
                        key={feature.title}
                        className={`flex items-center justify-center gap-4 px-4 py-5 sm:px-5 lg:py-3 ${index !== 0
                                ? "border-t border-slate-200 sm:border-t-0 sm:border-l"
                                : ""
                            }`}
                    >
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className={`h-12 w-12 object-contain ${feature.animation}`}
                                loading="lazy"
                            />

                            {feature.title === "Order Discount" && (
                                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white discount-stamp">
                                    %
                                </span>
                            )}
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-800">
                                {feature.title}
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ServiceFeatures;
