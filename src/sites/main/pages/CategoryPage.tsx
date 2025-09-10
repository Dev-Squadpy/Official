import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducts, addToCart } from '../../../utils/storage';
import { Product } from '../../../types';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await getProducts();
      const filteredProducts = allProducts.filter(
        p => p.category.toLowerCase() === category?.toLowerCase()
      );
      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = async (product: Product) => {
    await addToCart(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
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
        <div className="mb-8">
          <Link
            to="/store"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Volver a la Tienda</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-heading font-bold text-white mb-4">
            {category?.charAt(0).toUpperCase() + category?.slice(1)}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora nuestra colección de {category?.toLowerCase()}
          </p>
        </motion.div>

        {products.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/store/product/${product.id}`}>
                  <div className="product-image">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Agotado
                      </div>
                    )}
                  </div>
                  <div className="product-details">
                    <h3 className="text-lg font-medium text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-400 font-bold">${product.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                        disabled={!product.inStock || addedToCart === product.id}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          !product.inStock
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : addedToCart === product.id
                            ? 'bg-green-600 text-white'
                            : 'bg-primary-600 text-white hover:bg-primary-700'
                        }`}
                      >
                        {addedToCart === product.id ? '¡Añadido!' : 'Añadir al Carrito'}
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay productos disponibles en esta categoría.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;