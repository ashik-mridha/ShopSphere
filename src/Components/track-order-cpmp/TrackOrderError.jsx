
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function TrackOrderError({ message }) {
    return (
        <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center px-5 text-center">
            <AlertCircle
                size={48}
                className="mb-4 text-red-500"
            />

            <h1 className="text-2xl font-bold text-gray-900">
                Unable to track order
            </h1>

            <p className="mt-2 text-gray-500">
                {message || "We couldn't find this order."}
            </p>

            <Link
                to="/shop"
                className="mt-6 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800"
            >
                Continue Shopping
            </Link>
        </div>
    );
}
