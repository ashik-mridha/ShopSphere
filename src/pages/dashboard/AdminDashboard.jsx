import { useState, useEffect } from "react";
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Clock,
    Loader2
} from "lucide-react";

export default function AdminDashboard() {
    const [productsCount, setProductsCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const SERVER_URL = "http://localhost:5000";

    useEffect(() => {
        const controller = new AbortController();

        async function fetchDashboardData() {
            try {
                setLoading(true);

                // ১. Total Products count fetch করা
                const resProducts = await fetch(`${SERVER_URL}/api/products`, {
                    signal: controller.signal
                });
                if (resProducts.ok) {
                    const productsData = await resProducts.json();
                    if (Array.isArray(productsData)) {
                        setProductsCount(productsData.length);
                    }
                }

                // ২. Total Users/Orders fetch করার জন্য (যদি API থাকে)
                const resOrders = await fetch(`${SERVER_URL}/api/orders`, {
                    signal: controller.signal
                }).catch(() => null);

                if (resOrders && resOrders.ok) {
                    const ordersData = await resOrders.json();
                    if (Array.isArray(ordersData)) {
                        setOrders(ordersData);
                    }
                }
            } catch (err) {
                if (err.name !== "AbortError") {
                    console.error("Dashboard data fetch error:", err);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        fetchDashboardData();

        return () => controller.abort();
    }, []);

    // Dynamic Stats Cards Array
    const stats = [
        {
            title: "Total Revenue",
            value: orders.length > 0 ? `$${orders.reduce((sum, o) => sum + (o.amount || o.totalPrice || 0), 0)}` : "$0.00",
            change: "+12.5%",
            icon: DollarSign,
            color: "bg-emerald-100 text-emerald-700",
        },
        {
            title: "Total Orders",
            value: orders.length > 0 ? orders.length : "0",
            change: "+8.2%",
            icon: ShoppingCart,
            color: "bg-blue-100 text-blue-700",
        },
        {
            title: "Total Products",
            value: productsCount, // Backend Database থেকে ডাইনামিকভাবে আসবে
            change: "+4.3%",
            icon: Package,
            color: "bg-purple-100 text-purple-700",
        },
        {
            title: "Total Users",
            value: usersCount || "12", // ডাইনামিক বা ডিফল্ট
            change: "+15.8%",
            icon: Users,
            color: "bg-orange-100 text-orange-700",
        },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Monitor your store performance and recent activity in real-time.
                </p>
            </div>

            {/* Stats Cards Section */}
            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(({ title, value, change, icon: Icon, color }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{title}</span>
                            <span className={`rounded-xl p-3 ${color}`}>
                                <Icon size={22} />
                            </span>
                        </div>

                        <h2 className="mt-5 text-2xl font-bold">
                            {loading ? <Loader2 className="animate-spin text-gray-400" size={24} /> : value}
                        </h2>
                        <p className="mt-2 flex items-center gap-1 text-xs text-emerald-700">
                            <TrendingUp size={14} />
                            {change} <span className="text-gray-500">from last month</span>
                        </p>
                    </div>
                ))}
            </section>

            {/* Sales Graph & Activity Section */}
            <section className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Sales Overview</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Weekly store performance data
                            </p>
                        </div>
                        <TrendingUp className="text-emerald-700" />
                    </div>

                    <div className="flex h-56 items-end justify-around gap-3 border-b border-gray-100 pb-2">
                        {[42, 68, 50, 85, 60, 95, 74].map((height, index) => (
                            <div
                                key={index}
                                className="flex h-full flex-1 items-end"
                                title={`Day ${index + 1}`}
                            >
                                <div
                                    className="w-full rounded-t-lg bg-emerald-700 transition hover:bg-emerald-500"
                                    style={{ height: `${height}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex justify-around text-xs text-gray-500">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>
                </div>

                {/* System Activity Card */}
                <div className="rounded-2xl bg-emerald-900 p-6 text-white">
                    <Clock className="mb-5" size={28} />
                    <h2 className="text-xl font-bold">Store Activity</h2>
                    <p className="mt-2 text-sm text-emerald-100">
                        Your admin dashboard is connected with MongoDB backend.
                    </p>
                    <div className="mt-6 rounded-xl bg-white/10 p-4">
                        <p className="text-sm text-emerald-100">System Status</p>
                        <p className="mt-1 font-semibold text-emerald-300">● Live & Synchronized</p>
                    </div>
                </div>
            </section>

            {/* Recent Orders Section */}
            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="border-b p-5 sm:p-6">
                    <h2 className="text-lg font-bold">Recent Orders</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Latest customer orders placed on store
                    </p>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <Loader2 className="animate-spin text-emerald-700" size={32} />
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="py-12 text-center text-sm text-gray-500">
                            No recent orders in database.
                        </div>
                    ) : (
                        <table className="w-full min-w-[600px] text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id || order.id} className="hover:bg-gray-50/50">
                                        <td className="px-6 py-4 font-medium">
                                            #{order._id ? order._id.slice(-6).toUpperCase() : order.id}
                                        </td>
                                        <td className="px-6 py-4">{order.customer?.name || order.userEmail || "Customer"}</td>
                                        <td className="px-6 py-4">${order.amount || order.totalPrice || 0}</td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                                                {order.status || "Completed"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
}