import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initializeData } from '../../utils/storage';

// Pages
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import GameDetailPage from './pages/GameDetailPage';
import ChampionsPage from './pages/ChampionsPage';
import StorePage from './pages/StorePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';

// Components
import MainNavbar from './components/MainNavbar';
import MainFooter from './components/MainFooter';

const MainSite: React.FC = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Initialize mock data
    initializeData();
    
    // Update page title
    document.title = 'MOB Entertainment';

    // Show intro video for 3 seconds
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="fixed inset-0 bg-black">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          onEnded={() => setShowContent(true)}
        >
          <source src="https://assets.contentstack.io/v3/assets/blt731acb42bb3d1659/blt9037d316cc2f3d81/64e6a4e7bd8372a95fa6eb26/101723_KSante_Prestige_Empyrean_Trailer.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <MainNavbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/games/:id" element={<GameDetailPage />} />
          <Route path="/champions" element={<ChampionsPage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/store/category/:category" element={<CategoryPage />} />
          <Route path="/store/product/:id" element={<ProductDetailPage />} />
          <Route path="/store/cart" element={<CartPage />} />
          <Route path="/store/checkout" element={<CheckoutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <MainFooter />
    </div>
  );
};

export default MainSite;