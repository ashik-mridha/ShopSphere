
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Check,
  Package,
  Truck,
  MapPin,
  Clock,
  ArrowLeft,
  ShoppingBag,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://localhost:5000";

const STEPS = [
  {
    label: "Confirmed",
    description: "We've received your order.",
    icon: Check,
  },
  {
    label: "Processing",
    description: "Your order is being prepared.",
    icon: Package,
  },
  {
    label: "Shipped",
    description: "Your package is on its way.",
    icon: Truck,
  },
  {
    label: "Delivered",
    description: "Your order has been delivered.",
    icon: MapPin,
  },
];

const STATUS_ORDER = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "out for delivery",
  "delivered",
];

function getStepIndex(status = "pending") {
  const normalized = status.toLowerCase();

  if (normalized === "cancelled" || normalized === "canceled") {
    return -1;
  }

  if (normalized === "out for delivery") return 2;

  const index = STATUS_ORDER.indexOf(normalized);

  if (index === -1) return 0;
  if (index === 4) return 2;

  return Math.min(index, 3);
}

function formatDate(date) {
  if (!date) return "Date unavailable";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Date unavailable";

  return parsed.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackOrderPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch orders from the existing backend API.
        const response = await fetch(`${ API_URL } /api/orders`);

        if (!response.ok) {
          throw new Error("Could not load orders.");
        }

        const data = await response.json();

        const foundOrder = data.find(
          (item) =>
            String(item._id) === id ||
            String(item.orderId) === id
        );

        if (!foundOrder) {
          throw new Error("Order not found. Please check your order ID.");
        }

        setOrder(foundOrder);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <LoaderCircle className="animate-spin text-emerald-600" size={42} />
        <p className="text-sm text-gray-500">Loading order tracking...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="mx-auto flex min-h-[55vh] max-w-lg flex-col items-center justify-center px-5 text-center">
        <AlertCircle size={48} className="mb-4 text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900">
          Unable to track order
        </h1>
        <p className="mt-2 text-gray-500">
          {error || "We couldn't find this order."}
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

  const status = order.status || "Pending";
  const currentStep = getStepIndex(status);
  const cancelled = currentStep === -1;

  const productImage = order.productImage || order.image;
  const unitPrice = Number(order.unitPrice ?? order.price ?? 0);
  const quantity = Number(order.quantity || 1);
  const total = Number(order.total ?? unitPrice * quantity);

  const timeline = [
    {
      label: "Order Confirmed",
      description: "We've received your order.",
      date: order.createdAt,
    },
    {
      label: "Processing",
      description: "Your order is being prepared.",
      date: order.processingAt,
    },
    {
      label: "Shipped",
      description: "Your package is on its way.",
      date: order.shippedAt,
    },
    {
      label: "Delivered",
      description: "Your order has been delivered successfully!",
      date: order.deliveredAt,
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <Link
          to="/user/orders"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-700"
        >
          <ArrowLeft size={17} />
          Back to My Orders
        </Link>

        {/* Order title */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Track Order #{String(order._id || id).slice(-8).toUpperCase()}
              </h1>

              <span
                className={`rounded - full px - 3 py - 1 text - xs font - semibold ${
    cancelled
        ? "bg-red-100 text-red-700"
        : currentStep === 3
            ? "bg-emerald-100 text-emerald-700"
            : "bg-blue-100 text-blue-700"
} `}
              >
                {status}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShoppingBag size={18} />
            Cash on Delivery
          </div>
        </div>

        {/* Progress steps */}
        <section className="my-12">
          {cancelled ? (
            <div className="rounded-xl bg-red-50 p-5 text-center text-red-700">
              This order has been cancelled.
            </div>
          ) : (
            <div className="grid grid-cols-4">
              {STEPS.map((step, index) => {
                const completed = index <= currentStep;
                const Icon = step.icon;

                return (
                  <div key={step.label} className="relative text-center">
                    {index > 0 && (
                      <div
                        className={`absolute right - 1 / 2 top - 4 h - 0.5 w - full ${
    index <= currentStep
        ? "bg-emerald-600"
        : "bg-gray-200"
} `}
                      />
                    )}

                    <div
                      className={`relative mx - auto flex h - 8 w - 8 items - center justify - center rounded - full ${
    completed
        ? "bg-emerald-600 text-white"
        : "bg-gray-200 text-gray-500"
} `}
                    >
                      <Icon size={16} />
                    </div>

                    <p
                      className={`mt - 3 text - xs font - semibold sm: text - sm ${
    completed ? "text-gray-900" : "text-gray-400"
} `}
                    >
                      {step.label}
                    </p>

                    <p className="mt-1 hidden text-xs text-gray-500 sm:block">
                      {completed ? "Completed" : "Pending"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-5">

          {/* Tracking timeline */}
          <section className="rounded-2xl border border-gray-200 p-5 sm:p-7 lg:col-span-3">
            <h2 className="mb-7 text-lg font-bold">Tracking Details</h2>

            <div className="space-y-0">
              {timeline.map((event, index) => {
                const completed = index <= currentStep;
                const isLast = index === timeline.length - 1;

                return (
                  <div key={event.label} className="relative flex gap-4 pb-8 last:pb-0">
                    {!isLast && (
                      <div
                        className={`absolute left - [9px] top - 5 h - full w - px ${
    index < currentStep
        ? "bg-emerald-400"
        : "bg-gray-200"
} `}
                      />
                    )}

                    <div
                      className={`relative z - 10 flex h - 5 w - 5 shrink - 0 items - center justify - center rounded - full ${
    completed
        ? "bg-emerald-600 text-white"
        : "border-2 border-gray-300 bg-white text-gray-400"
} `}
                    >
                      {completed && <Check size={12} />}
                    </div>

                    <div className="-mt-0.5">
                      <h3
                        className={`text - sm font - semibold ${
    completed ? "text-emerald-700" : "text-gray-400"
} `}
                      >
                        {event.label}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {event.description}
                      </p>

                      {event.date && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                          <Clock size={12} />
                          {formatDate(event.date)}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Order summary */}
          <section className="rounded-2xl border border-gray-200 p-5 sm:p-7 lg:col-span-2">
            <h2 className="mb-6 text-lg font-bold">Order Items</h2>

            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                {productImage ? (
                  <img
                    src={productImage}
                    alt={order.productTitle || "Product"}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Package size={30} className="text-gray-400" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="break-words text-sm font-semibold">
                  {order.productTitle || "Product"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  ${unitPrice.toFixed(2)} × {quantity}
                </p>
              </div>

              <p className="shrink-0 text-sm font-semibold">
                ${total.toFixed(2)}
              </p>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-medium text-emerald-700">Free</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-base font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {order.customer && (
              <div className="mt-6 rounded-xl bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-semibold">
                  Delivery Information
                </h3>
                <p className="text-sm text-gray-700">
                  {order.customer.name}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {order.customer.phone}
                </p>
                <p className="mt-1 break-words text-sm text-gray-500">
                  {order.customer.address}
                </p>
              </div>
            )}

            <Link
              to="/shop"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
