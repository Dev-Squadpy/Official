import React, { useState } from 'react';
import { authenticateUser } from '../../../utils/storage';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';

interface AdminLoginPageProps {
  onLogin: (username: string) => void;
}

const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Por favor, complete todos los campos');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const user = await authenticateUser(username, password);
      
      if (user && user.isAdmin) {
        onLogin(username);
      } else {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-dark-surface rounded-lg p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Gamepad2 size={48} className="text-primary-400 mx-auto mb-3" />
          <h1 className="text-2xl font-heading font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 mt-2">Accede para gestionar el contenido de MOB Entertainment</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-1">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-dark-card border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500"
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-card border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-primary-500"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Usuario: admin | Contraseña: admin123</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;