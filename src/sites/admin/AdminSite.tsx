import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { initializeData, getUser } from '../../utils/storage';

// Pages
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminBlogPage from './pages/AdminBlogPage';
import AdminCommentsPage from './pages/AdminCommentsPage';

// Components
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

const AdminSite: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<{username: string} | null>(null);

  useEffect(() => {
    // Initialize mock data
    initializeData();
    
    // Check if user is already logged in from local storage
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const validUser = await getUser(parsedUser.username);
        
        if (validUser && validUser.isAdmin) {
          setIsAuthenticated(true);
          setUser(parsedUser);
        } else {
          localStorage.removeItem('adminUser');
        }
      }
      
      setLoading(false);
    };
    
    checkAuth();
    
    // Update page title
    document.title = 'MOB Entertainment - Admin Panel';
  }, []);

  const handleLogin = (username: string) => {
    setIsAuthenticated(true);
    setUser({ username });
    localStorage.setItem('adminUser', JSON.stringify({ username }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminHeader username={user?.username || ''} onLogout={handleLogout} />
        <main className="admin-content bg-dark">
          <Routes>
            <Route path="/" element={<AdminDashboardPage />} />
            <Route path="/products" element={<AdminProductsPage />} />
            <Route path="/blog" element={<AdminBlogPage />} />
            <Route path="/comments" element={<AdminCommentsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminSite;