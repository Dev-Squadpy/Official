import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getGames, getProducts, getBlogPosts } from '../../../utils/storage';
import { Game, Product, BlogPost } from '../../../types';
import { ShoppingBag, FileText, Users, TrendingUp, Package, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboardPage: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedGames, fetchedProducts, fetchedPosts] = await Promise.all([
        getGames(),
        getProducts(),
        getBlogPosts()
      ]);
      
      setGames(fetchedGames);
      setProducts(fetchedProducts);
      setBlogPosts(fetchedPosts);
      setLoading(false);
    };

    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <div className="text-gray-400 text-sm">
          {new Date().toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Juegos</h3>
            <div className="w-10 h-10 rounded-full bg-primary-600/20 flex items-center justify-center text-primary-400">
              <Users size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{games.length}</div>
          <div className="text-xs text-gray-400">Total de juegos</div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Productos</h3>
            <div className="w-10 h-10 rounded-full bg-secondary-600/20 flex items-center justify-center text-secondary-400">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{products.length}</div>
          <div className="text-xs text-gray-400">Total de productos</div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Artículos</h3>
            <div className="w-10 h-10 rounded-full bg-accent-600/20 flex items-center justify-center text-accent-400">
              <FileText size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">{blogPosts.length}</div>
          <div className="text-xs text-gray-400">Total de artículos en el blog</div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Comentarios</h3>
            <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-400">
              <TrendingUp size={20} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">
            {blogPosts.reduce((sum, post) => sum + post.comments.length, 0)}
          </div>
          <div className="text-xs text-gray-400">Total de comentarios</div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-heading font-semibold text-white">Productos Recientes</h2>
            <Link to="/products" className="text-primary-400 hover:text-primary-300 text-sm">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {products.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-4 py-2 border-b border-gray-800">
                <div className="w-10 h-10 bg-dark-card rounded overflow-hidden">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-white text-sm font-medium">{product.name}</h3>
                  <p className="text-gray-400 text-xs">{product.category}</p>
                </div>
                <div className="text-primary-400 font-bold">${product.price.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-dark-surface rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-heading font-semibold text-white">Artículos Recientes</h2>
            <Link to="/blog" className="text-primary-400 hover:text-primary-300 text-sm">
              Ver todos
            </Link>
          </div>

          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 py-2 border-b border-gray-800">
                <div className="w-10 h-10 bg-dark-card rounded overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-white text-sm font-medium">{post.title}</h3>
                  <div className="flex items-center text-gray-400 text-xs">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <Eye size={14} className="mr-1" />
                  <span>{Math.floor(Math.random() * 1000) + 100}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;