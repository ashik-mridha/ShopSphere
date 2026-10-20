
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function useTrackOrder() {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchOrder() {
            try {
                setLoading(true);
                setError("");
                setOrder(null);

                if (!id) {
                    throw new Error("Order ID is missing.");
                }

                const response = await fetch(
                    `${API_URL}/api/orders`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Could not load orders.");
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid orders response.");
                }

                const foundOrder = data.find(
                    (item) =>
                        String(item._id) === id ||
                        String(item.orderId) === id
                );

                if (!foundOrder) {
                    throw new Error(
                        "Order not found. Please check your order ID."
                    );
                }

                setOrder(foundOrder);
            } catch (err) {
                if (err.name !== "AbortError") {
                    setError(
                        err.message || "Something went wrong."
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchOrder();

        return () => controller.abort();
    }, [id]);

    return { order, loading, error };
}
