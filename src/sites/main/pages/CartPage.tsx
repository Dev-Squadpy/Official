import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, clearCart } from '../../../utils/storage';
import { CartItem } from '../../../types';
import { Trash2, ChevronLeft, Plus, Minus, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      setCartItems(cart);
      setLoading(false);
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      const updatedCart = await updateCartItem(productId, newQuantity);
      setCartItems(updatedCart);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    const updatedCart = await updateCartItem(productId, 0);
    setCartItems(updatedCart);
  };

  const handleClearCart = async () => {
    await clearCart();
    setCartItems([]);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  const calculateShipping = () => {
    const subtotal = calculateSubtotal();
    return subtotal > 50 ? 0 : 5.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
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
            <span>Continuar Comprando</span>
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-heading font-bold text-white mb-8"
        >
          Carrito de Compras
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-surface rounded-lg p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto mb-6 text-gray-500">
              <ShoppingCartEmpty />
            </div>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-400 mb-8">
              Parece que aún no has añadido ningún producto al carrito.
            </p>
            <Link
              to="/store"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
            >
              Explorar la Tienda
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-dark-surface rounded-lg overflow-hidden"
              >
                <div className="p-6 border-b border-gray-800">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-heading font-semibold text-white">
                      Productos ({cartItems.length})
                    </h2>
                    <button
                      onClick={handleClearCart}
                      className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <RefreshCcw size={16} className="mr-1" />
                      <span>Vaciar Carrito</span>
                    </button>
                  </div>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-6 border-b border-gray-800 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="sm:w-24 h-24 bg-dark-card rounded-md overflow-hidden">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <Link
                        to={`/store/product/${item.product.id}`}
                        className="text-white font-medium hover:text-primary-400 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-gray-400 text-sm mt-1">{item.product.category}</div>
                      <div className="text-primary-400 font-bold mt-2">${item.product.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 bg-dark-card text-white rounded-l-md hover:bg-dark hover:text-primary-400 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <div className="w-10 bg-dark-card text-white text-center py-1">
                          {item.quantity}
                        </div>
                        <button
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 bg-dark-card text-white rounded-r-md hover:bg-dark hover:text-primary-400 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-400 transition-colors flex items-center mt-3 sm:mt-0"
                      >
                        <Trash2 size={16} className="mr-1" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-dark-surface rounded-lg p-6 sticky top-24"
              >
                <h2 className="text-xl font-heading font-semibold text-white mb-6">
                  Resumen del Pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Gastos de envío</span>
                    <span>
                      {calculateShipping() === 0 ? (
                        <span className="text-green-500">Gratis</span>
                      ) : (
                        `$${calculateShipping().toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-gray-800 pt-4 flex justify-between text-white font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Link
                    to="/store/checkout"
                    className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md text-center transition-all hover:shadow-glow"
                  >
                    Finalizar Compra
                  </Link>
                  <Link
                    to="/store"
                    className="block w-full bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md text-center transition-colors"
                  >
                    Continuar Comprando
                  </Link>
                </div>
                
                <div className="mt-6 text-sm text-gray-400">
                  <p className="mb-2">Métodos de pago aceptados:</p>
                  <div className="flex gap-2">
                    <div className="bg-gray-800 rounded p-1">
                      <span className="font-bold text-white">VISA</span>
                    </div>
                    <div className="bg-gray-800 rounded p-1">
                      <span className="font-bold text-white">MC</span>
                    </div>
                    <div className="bg-gray-800 rounded p-1">
                      <span className="font-bold text-white">PayPal</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingCartEmpty = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path
        d="M3 3H5L5.4 5M5.4 5H21L17 13H7M5.4 5L7 13M7 13L4.707 15.293C4.077 15.923 4.523 17 5.414 17H17M17 17C16.4696 17 15.9609 17.2107 15.5858 17.5858C15.2107 17.9609 15 18.4696 15 19C15 19.5304 15.2107 20.0391 15.5858 20.4142C15.9609 20.7893 16.4696 21 17 21C17.5304 21 18.0391 20.7893 18.4142 20.4142C18.7893 20.0391 19 19.5304 19 19C19 18.4696 18.7893 17.9609 18.4142 17.5858C18.0391 17.2107 17.5304 17 17 17ZM9 19C9 19.5304 8.78929 20.0391 8.41421 20.4142C8.03914 20.7893 7.53043 21 7 21C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19C5 18.4696 5.21071 17.9609 5.58579 17.5858C5.96086 17.2107 6.46957 17 7 17C7.53043 17 8.03914 17.2107 8.41421 17.5858C8.78929 17.9609 9 18.4696 9 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CartPage;