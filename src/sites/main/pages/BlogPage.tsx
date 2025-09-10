import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../../../utils/storage';
import { BlogPost } from '../../../types';
import { Calendar, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-heading font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Mantente al día con las últimas novedades, actualizaciones y contenido exclusivo 
            sobre nuestros juegos y eventos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-dark-surface rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300"
                >
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        <span>
                          {new Date(post.publishedDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        <span>{post.content.length > 3000 ? '10 min' : '5 min'} lectura</span>
                      </div>
                    </div>
                    
                    <Link to={`/blog/${post.id}`} className="block">
                      <h2 className="text-2xl font-heading font-bold text-white mb-3 hover:text-primary-400 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-block text-primary-400 font-medium hover:text-primary-300 transition-colors"
                    >
                      Leer más &rarr;
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
          
          <div>
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-dark-surface rounded-lg p-6 mb-8"
              >
                <h3 className="text-xl font-heading font-semibold text-white mb-4">
                  Buscar
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                  />
                  <button className="absolute right-3 top-2.5 text-gray-400 hover:text-primary-400 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-dark-surface rounded-lg p-6 mb-8"
              >
                <h3 className="text-xl font-heading font-semibold text-white mb-4">
                  Categorías
                </h3>
                <ul className="space-y-2">
                  {['Anuncios', 'Actualizaciones', 'Guías', 'Eventos', 'Entrevistas'].map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex justify-between items-center text-gray-300 hover:text-primary-400 transition-colors"
                      >
                        <span>{category}</span>
                        <span className="bg-dark-card text-xs px-2 py-1 rounded">
                          {Math.floor(Math.random() * 10) + 1}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-dark-surface rounded-lg p-6"
              >
                <h3 className="text-xl font-heading font-semibold text-white mb-4">
                  Suscríbete
                </h3>
                <p className="text-gray-300 mb-4">
                  Recibe las últimas noticias y actualizaciones directamente en tu correo.
                </p>
                <form className="space-y-3">
                  <div>
                    <input
                      type="email"
                      placeholder="Tu email"
                      className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Suscribirse
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;