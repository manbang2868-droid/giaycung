import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Products } from "./pages/Products";
import { News } from "./pages/News";
import { Contact } from "./pages/Contact";
import { Order } from "./pages/Order";
import { OrderTracking } from "./pages/OrderTracking";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";

function NotFound() {
  return <Box sx={{ p: 2 }}>Not Found</Box>;
}

function UserLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* ✅ ADMIN */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* ✅ USER */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/order" element={<Order />} />
              <Route path="/track-order" element={<OrderTracking />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
