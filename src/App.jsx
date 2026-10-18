import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Auth Pages
import LoginPage from "./auth/login/page";
import RegisterPage from "./auth/register/page";

// Dashboard Pages
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

// Homepage
import Homepage from "./Components/Homepage"


function Placeholder({ title }) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-500">
        This page will be connected to the backend next.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Placeholder title="Products" />} />
          <Route path="/cart" element={<Placeholder title="Cart" />} />
          <Route path="/wishlist" element={<Placeholder title="Wishlist" />} />
        </Route>

        {/* Auth Routes (Navbar/Footer ছাড়া) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User Dashboard */}
        <Route path="/user" element={<DashboardLayout role="user" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="orders" element={<Placeholder title="My Orders" />} />
          <Route path="wishlist" element={<Placeholder title="My Wishlist" />} />
          <Route path="profile" element={<Placeholder title="My Profile" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Placeholder title="Manage Products" />} />
          <Route path="orders" element={<Placeholder title="Manage Orders" />} />
          <Route path="users" element={<Placeholder title="Manage Users" />} />
          <Route path="settings" element={<Placeholder title="Admin Settings" />} />
        </Route>

        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}