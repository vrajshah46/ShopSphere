import { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [message, onClose]);

    return (
        <div
            className={`fixed right-5 top-20 z-50 flex items-center gap-3 rounded-xl px-5 py-4 text-white shadow-xl ${type === "success" ? "bg-green-600" : "bg-red-600"
                }`}
        >
            <span className="text-xl">
                {type === "success" ? "✓" : "!"}
            </span>

            <p className="font-medium">{message}</p>

            <button
                onClick={onClose}
                className="ml-2 text-xl text-white/80 hover:text-white"
                aria-label="Close notification"
            >
                ×
            </button>
        </div>
    );
};

export default Toast;