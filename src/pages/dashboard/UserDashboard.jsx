
import { Package, Heart, ShoppingBag, UserRound, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const cards = [
    {
        title: "Total Orders",
        value: "04",
        icon: Package,
        color: "bg-blue-100 text-blue-700",
    },
    {
        title: "Wishlist Items",
        value: "08",
        icon: Heart,
        color: "bg-pink-100 text-pink-700",
    },
    {
        title: "Cart Items",
        value: "03",
        icon: ShoppingBag,
        color: "bg-emerald-100 text-emerald-700",
    },
];

const orders = [
    { id: "#SS-1001", date: "Oct 12, 2026", amount: "$120", status: "Delivered" },
    { id: "#SS-1005", date: "Oct 15, 2026", amount: "$85", status: "Processing" },
];

export default function UserDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold sm:text-3xl">My Dashboard</h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage your account, orders and wishlist.
                </p>
            </div>

            <section className="rounded-2xl bg-emerald-900 p-6 text-white sm:p-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15">
                        <UserRound size={32} />
                    </div>
                    <div>
                        <p className="text-sm text-emerald-100">Welcome back,</p>
                        <h2 className="text-2xl font-bold">ShopSphere Customer</h2>
                        <p className="mt-1 text-sm text-emerald-100">
                            Thank you for shopping with us!
                        </p>
                    </div>
                </div>
            </section>

            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map(({ title, value, icon: Icon, color }) => (
                    <div
                        key={title}
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{title}</span>
                            <span className={`rounded-xl p-3 ${color}`}>
                                <Icon size={22} />
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-bold">{value}</p>
                    </div>
                ))}
            </section>

            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="flex items-center justify-between border-b p-5 sm:p-6">
                    <div>
                        <h2 className="text-lg font-bold">Recent Orders</h2>
                        <p className="mt-1 text-sm text-gray-500">Your latest purchases</p>
                    </div>
                    <Link
                        to="/user/orders"
                        className="flex items-center gap-2 text-sm font-medium text-emerald-800"
                    >
                        View all <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[520px] text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-t">
                                    <td className="px-6 py-4 font-medium">{order.id}</td>
                                    <td className="px-6 py-4">{order.date}</td>
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
