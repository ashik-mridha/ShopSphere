
import {
    Users,
    Package,
    ShoppingCart,
    DollarSign,
    TrendingUp,
    Clock,
} from "lucide-react";

const stats = [
    {
        title: "Total Revenue",
        value: "$12,450",
        change: "+12.5%",
        icon: DollarSign,
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        title: "Total Orders",
        value: "248",
        change: "+8.2%",
        icon: ShoppingCart,
        color: "bg-blue-100 text-blue-700",
    },
    {
        title: "Total Products",
        value: "156",
        change: "+4.3%",
        icon: Package,
        color: "bg-purple-100 text-purple-700",
    },
    {
        title: "Total Users",
        value: "1,240",
        change: "+15.8%",
        icon: Users,
        color: "bg-orange-100 text-orange-700",
    },
];

const recentOrders = [
    { id: "#SS-1001", customer: "Rahim", amount: "$120", status: "Delivered" },
    { id: "#SS-1002", customer: "Karim", amount: "$85", status: "Pending" },
    { id: "#SS-1003", customer: "Nusrat", amount: "$210", status: "Processing" },
    { id: "#SS-1004", customer: "Sadia", amount: "$65", status: "Delivered" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl">Dashboard Overview</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Monitor your store performance and recent activity.
                </p>
            </div>

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

                        <h2 className="mt-5 text-2xl font-bold">{value}</h2>
                        <p className="mt-2 flex items-center gap-1 text-xs text-emerald-700">
                            <TrendingUp size={14} />
                            {change} <span className="text-gray-500">from last month</span>
                        </p>
                    </div>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 xl:col-span-2">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Sales Overview</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Sample weekly sales data
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

                <div className="rounded-2xl bg-emerald-900 p-6 text-white">
                    <Clock className="mb-5" size={28} />
                    <h2 className="text-xl font-bold">Store Activity</h2>
                    <p className="mt-2 text-sm text-emerald-100">
                        Your dashboard is ready to connect with live store data.
                    </p>
                    <div className="mt-6 rounded-xl bg-white/10 p-4">
                        <p className="text-sm text-emerald-100">Next step</p>
                        <p className="mt-1 font-semibold">Connect MongoDB APIs</p>
                    </div>
                </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="border-b p-5 sm:p-6">
                    <h2 className="text-lg font-bold">Recent Orders</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Latest customer orders
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[600px] text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="px-6 py-4 font-medium">{order.id}</td>
                                    <td className="px-6 py-4">{order.customer}</td>
                                    <td className="px-6 py-4">{order.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
