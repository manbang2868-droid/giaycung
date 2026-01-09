import { useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { AdminLoadingScreen } from '../../components/admin/AdminLoadingScreen';
import { AdminDashboardHome } from './AdminDashboardHome';
import { AdminServices } from './AdminServices';
import { AdminProducts } from './AdminProducts';
import { AdminNews } from './AdminNews';
import { AdminOrders } from './AdminOrders';
import { AdminServiceOrders } from './AdminServiceOrders';

export function AdminDashboard() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin/login');
    }
  }, [user, navigate, loading]);

  if (loading) {
    return <AdminLoadingScreen />;
  }

  if (!user) {
    return null;
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminDashboardHome />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="news" element={<AdminNews />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="service-orders" element={<AdminServiceOrders />} />
        <Route path="*" element={<AdminDashboardHome />} />
      </Routes>
    </AdminLayout>
  );
}