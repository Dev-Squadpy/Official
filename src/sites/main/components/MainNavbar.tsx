import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Gamepad2 } from 'lucide-react';
import { getCart } from '../../../utils/storage';

const MainNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = async () => {
      const cart = await getCart();
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    };

    updateCartCount();
  }, [location]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-surface bg-opacity-95 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <Link 
              to="/" 
              className="text-white font-heading text-2xl font-bold flex items-center"
            >
              <Gamepad2 className="mr-2" />
              MOB Entertainment
            </Link>
          </div>

          <nav className="hidden md:flex items-center justify-end flex-1 space-x-8">
            <NavLink to="/" label="Home" />
            <NavLink to="/games" label="Our Games" />
            <NavLink to="/store" label="Store" />
            <NavLink to="http://localhost:4321/" label="Esports" />
            <NavLink to="/blog" label="Blog" />
            <NavLink to="/contact" label="Contact" />
            
            <Link 
              to="/store/cart" 
              className="relative text-white hover:text-primary-400 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <button
            className="md:hidden text-white hover:text-primary-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/games" label="Our Games" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/store" label="Store" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/blog" label="Blog" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink to="/store/cart" label={`Cart (${cartCount})`} onClick={() => setIsMenuOpen(false)} />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      className={`font-medium text-sm tracking-wider uppercase transition-all duration-300 ${
        isActive
          ? 'text-primary-400 border-b-2 border-primary-400'
          : 'text-white hover:text-primary-300 hover:border-b-2 hover:border-primary-300'
      }`}
    >
      {label}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || 
    (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`font-medium text-lg py-2 px-4 rounded transition-colors ${
        isActive
          ? 'text-primary-400 bg-dark-card'
          : 'text-white hover:bg-dark-card hover:text-primary-300'
      }`}
    >
      {label}
    </Link>
  );
};

export default MainNavbar;