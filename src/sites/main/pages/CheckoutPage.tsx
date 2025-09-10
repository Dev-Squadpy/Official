import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, clearCart } from '../../../utils/storage';
import { CartItem } from '../../../types';
import { ChevronLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'credit-card'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await getCart();
      if (cart.length === 0) {
        navigate('/store');
        return;
      }
      setCartItems(cart);
      setLoading(false);
    };

    fetchCart();
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'El nombre es obligatorio';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'El apellido es obligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'La dirección es obligatoria';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'La ciudad es obligatoria';
    }
    
    if (!formData.postalCode.trim()) {
      errors.postalCode = 'El código postal es obligatorio';
    }
    
    if (!formData.country.trim()) {
      errors.country = 'El país es obligatorio';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate order processing
      setLoading(true);
      
      setTimeout(async () => {
        await clearCart();
        setOrderPlaced(true);
        setLoading(false);
      }, 1500);
    }
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

  if (loading && !orderPlaced) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="pt-24 pb-20 bg-dark min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-dark-surface rounded-lg p-8 text-center"
          >
            <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center mb-6">
              <Check size={40} className="text-white" />
            </div>
            
            <h1 className="text-3xl font-heading font-bold text-white mb-4">
              ¡Pedido Completado!
            </h1>
            
            <p className="text-gray-300 mb-8">
              Gracias por tu compra. Hemos recibido tu pedido y estamos trabajando en procesarlo.
              Recibirás un email de confirmación en breve.
            </p>
            
            <div className="mb-8">
              <div className="inline-block bg-dark-card rounded-lg p-4 text-left">
                <h3 className="font-heading font-semibold text-white mb-2">Resumen del Pedido:</h3>
                <p className="text-gray-400"><strong>Número de Pedido:</strong> ORD-{Math.floor(Math.random() * 1000000)}</p>
                <p className="text-gray-400"><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                <p className="text-gray-400"><strong>Total:</strong> ${calculateTotal().toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-md transition-all hover:shadow-glow"
              >
                Volver al Inicio
              </Link>
              <Link
                to="/store"
                className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-md transition-colors"
              >
                Seguir Comprando
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/store/cart"
            className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
          >
            <ChevronLeft size={20} />
            <span>Volver al Carrito</span>
          </Link>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-heading font-bold text-white mb-8"
        >
          Finalizar Compra
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="bg-dark-surface rounded-lg p-6"
            >
              <h2 className="text-xl font-heading font-semibold text-white mb-6">
                Información de Envío
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-gray-300 mb-1">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-gray-300 mb-1">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-300 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.email ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label htmlFor="address" className="block text-gray-300 mb-1">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-card border ${
                    formErrors.address ? 'border-red-500' : 'border-gray-700'
                  } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                />
                {formErrors.address && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="city" className="block text-gray-300 mb-1">
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.city ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.city && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-gray-300 mb-1">
                    Código Postal <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.postalCode ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.postalCode && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.postalCode}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-gray-300 mb-1">
                    País <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-card border ${
                      formErrors.country ? 'border-red-500' : 'border-gray-700'
                    } rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500`}
                  />
                  {formErrors.country && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.country}</p>
                  )}
                </div>
              </div>
              
              <h2 className="text-xl font-heading font-semibold text-white mb-6 mt-8">
                Método de Pago
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="paymentMethod"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleInputChange}
                    className="mr-3 accent-primary-500"
                  />
                  <label htmlFor="credit-card" className="text-white cursor-pointer">
                    Tarjeta de Crédito
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="mr-3 accent-primary-500"
                  />
                  <label htmlFor="paypal" className="text-white cursor-pointer">
                    PayPal
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bank-transfer"
                    name="paymentMethod"
                    value="bank-transfer"
                    checked={formData.paymentMethod === 'bank-transfer'}
                    onChange={handleInputChange}
                    className="mr-3 accent-primary-500"
                  />
                  <label htmlFor="bank-transfer" className="text-white cursor-pointer">
                    Transferencia Bancaria
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-md transition-all hover:shadow-glow"
                >
                  Completar Compra
                </button>
              </div>
            </motion.form>
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
              
              <div className="max-h-60 overflow-y-auto mb-6 pr-2">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 mb-3 pb-3 border-b border-gray-800">
                    <div className="w-16 h-16 bg-dark-card rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="text-white font-medium line-clamp-1">{item.product.name}</div>
                      <div className="text-gray-400 text-sm">Cantidad: {item.quantity}</div>
                      <div className="text-primary-400 font-bold">${(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
              
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
              
              <div className="mb-4 bg-dark-card rounded-lg p-4 text-sm text-gray-300">
                <p>
                  Al completar la compra, aceptas nuestros{' '}
                  <Link to="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                    Términos y Condiciones
                  </Link>{' '}
                  y{' '}
                  <Link to="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                    Política de Privacidad
                  </Link>
                  .
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;