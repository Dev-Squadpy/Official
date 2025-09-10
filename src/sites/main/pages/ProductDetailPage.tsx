import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, addToCart } from '../../../utils/storage';
import { Product } from '../../../types';
import { ChevronLeft, ShoppingCart, Minus, Plus, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        const fetchedProduct = await getProduct(id);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (product) {
      await addToCart(product, quantity);
      setAddedToCart(true);
      
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const toggleFavorite = () => {
    setFavorited(!favorited);
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">Producto no encontrado</h2>
          <Link
            to="/store"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Volver a la Tienda
          </Link>
        </div>
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

        <div className="bg-dark-surface rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative rounded-lg overflow-hidden bg-dark-card" style={{ height: '400px' }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {product.imageUrl2 && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="block h-24 rounded overflow-hidden bg-dark-card ring-2 ring-primary-500">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    <button className="block h-24 rounded overflow-hidden bg-dark-card">
                      <img
                        src={product.imageUrl2}
                        alt={`${product.name} alternate view`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-dark text-xs text-gray-300 px-2 py-1 rounded mb-2">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-heading font-bold text-white mb-4">{product.name}</h1>
                </div>
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full ${
                    favorited ? 'bg-red-500 text-white' : 'bg-dark-card text-gray-400 hover:text-white'
                  } transition-colors`}
                >
                  <Heart size={20} fill={favorited ? 'white' : 'none'} />
                </button>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-primary-400">${product.price.toFixed(2)}</span>
                {!product.inStock && (
                  <span className="ml-3 text-red-500 text-sm font-semibold">Agotado</span>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-3">Descripción</h2>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <ul className="text-gray-300 space-y-2">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-primary-500 rounded-full"></span>
                    Producto oficial de MOB Entertainment
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-primary-500 rounded-full"></span>
                    Alta calidad garantizada
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 mt-2 mr-2 bg-primary-500 rounded-full"></span>
                    Envío rápido a todo el mundo
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-heading font-semibold text-white mb-3">Cantidad</h2>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className={`p-2 rounded-l-md ${
                      quantity <= 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-dark-card text-white hover:bg-dark hover:text-primary-400'
                    } transition-colors`}
                  >
                    <Minus size={20} />
                  </button>
                  <div className="w-16 bg-dark-card text-white text-center py-2">
                    {quantity}
                  </div>
                  <button
                    onClick={increaseQuantity}
                    className="p-2 bg-dark-card text-white rounded-r-md hover:bg-dark hover:text-primary-400 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || addedToCart}
                  className={`flex items-center gap-2 py-3 px-6 rounded-md font-medium ${
                    !product.inStock
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                      : addedToCart
                      ? 'bg-green-600 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white hover:shadow-glow'
                  } transition-all`}
                >
                  <ShoppingCart size={20} />
                  {addedToCart ? 'Añadido al Carrito' : 'Añadir al Carrito'}
                </button>
                
                <Link
                  to="/store/cart"
                  className="py-3 px-6 rounded-md font-medium bg-transparent hover:bg-white/10 text-white border border-white transition-colors"
                >
                  Ver Carrito
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Customer Reviews Section (could be expanded in a real app) */}
        <div className="mt-12">
          <h2 className="text-2xl font-heading font-bold text-white mb-6">Opiniones de Clientes</h2>
          
          <div className="bg-dark-surface rounded-lg p-6">
            <div className="text-center py-8">
              <p className="text-gray-300 mb-4">
                Aún no hay opiniones para este producto. Sé el primero en opinar.
              </p>
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors">
                Escribir una Opinión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;