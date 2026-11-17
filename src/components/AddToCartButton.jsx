
import { useState } from "react";

const AddToCartButton = ({
    onAddToCart,
    text = "Add to cart",
    addedText = "Added",
    loadingTime = 1000,
    resetTime = 2000,
    disabled = false,
    className = "",
}) => {
    const [status, setStatus] = useState("idle");

    const handleClick = async () => {
        if (status !== "idle" || disabled) return;

        setStatus("loading");

        try {
            await onAddToCart?.();

            setTimeout(() => {
                setStatus("added");

                setTimeout(() => {
                    setStatus("idle");
                }, resetTime);

            }, loadingTime);

        } catch (error) {
            console.error("Failed to add product:", error);
            setStatus("idle");
        }
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={disabled || status !== "idle"}
            className={`group inline-flex items-center justify-center gap-2
        rounded-full bg-blue-600 px-6 py-3 text-sm font-medium
        text-white transition-colors duration-300
        hover:bg-blue-700
        disabled:cursor-not-allowed disabled:bg-gray-300
        ${className}`}
        >
            {/* Text */}
            <span
                className={`transition-transform duration-300 ${status === "idle" && !disabled
                    ? "group-hover:-translate-x-1"
                    : ""
                    }`}
            >
                {disabled ? "Out of Stock" : status === "added" ? addedText : text}
            </span>

            {/* Arrow */}
            {status === "idle" && !disabled && (
                <span
                    className="grid w-0 translate-x-2 place-items-center
          overflow-hidden opacity-0 transition-all duration-300
          group-hover:w-5 group-hover:translate-x-0
          group-hover:opacity-100"
                >
                    →
                </span>
            )}

            {/* Spinner */}
            {status === "loading" && (
                <span
                    className="h-[18px] w-[18px] animate-spin rounded-full
          border-2 border-white border-t-transparent"
                />
            )}

            {/* Checkmark */}
            {status === "added" && (
                <svg
                    className="h-[18px] w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M4 12.5 L9.5 18 L20 6"
                        stroke="#22c55e"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray="24"
                        strokeDashoffset="24"
                        className="animate-draw-check"
                    />
                </svg>
            )}
        </button>
    );
};

export default AddToCartButton;
