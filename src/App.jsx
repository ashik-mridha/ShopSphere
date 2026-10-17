
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import UserDashboard from "./pages/dashboard/UserDashboard";

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
  // TEMPORARY UI DEMO ONLY.
  // Do not use a hardcoded role to authorize real users.
  const demoRole = "user";

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <DashboardLayout role="admin">
              <AdminDashboard />
            </DashboardLayout>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route
          path="/user"
          element={<DashboardLayout role={demoRole} />}
        >
          <Route
            path="dashboard"
            element={<UserDashboard />}
          />
          <Route path="orders" element={<Placeholder title="My Orders" />} />
          <Route path="wishlist" element={<Placeholder title="My Wishlist" />} />
          <Route path="profile" element={<Placeholder title="My Profile" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Placeholder title="Manage Products" />} />
          <Route path="orders" element={<Placeholder title="Manage Orders" />} />
          <Route path="users" element={<Placeholder title="Manage Users" />} />
          <Route path="settings" element={<Placeholder title="Admin Settings" />} />
        </Route>

        <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Routes>
    </BrowserRouter>
  );
}
