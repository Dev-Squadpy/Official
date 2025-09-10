import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, ShoppingBag, FileText, MessageCircle } from 'lucide-react';

interface AdminHeaderProps {
  username: string;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ username, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-dark-surface border-b border-gray-800 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <button
          className="md:hidden text-white mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-white font-heading font-bold md:hidden">MOB Admin</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </button>
        
        <div className="relative">
          <button
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="w-8 h-8 rounded-full bg-primary-600/30 flex items-center justify-center text-primary-400">
              <User size={16} />
            </div>
            <span>{username}</span>
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark-card rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-300 hover:bg-dark hover:text-white transition-colors"
                >
                  <LogOut size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-dark z-50 md:hidden">
          <div className="p-4 flex justify-between items-center border-b border-gray-800">
            <h1 className="text-white font-heading font-bold">MOB Admin</h1>
            <button
              className="text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-4">
            <MobileNavItem to="/" icon={<Menu size={20} />} label="Dashboard" onClick={() => setIsMenuOpen(false)} />
            <MobileNavItem to="/products" icon={<ShoppingBag size={20} />} label="Productos" onClick={() => setIsMenuOpen(false)} />
            <MobileNavItem to="/blog" icon={<FileText size={20} />} label="Blog" onClick={() => setIsMenuOpen(false)} />
            <MobileNavItem to="/comments" icon={<MessageCircle size={20} />} label="Comentarios" onClick={() => setIsMenuOpen(false)} />
          </nav>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
            <button
              onClick={() => {
                onLogout();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full text-left px-4 py-3 text-gray-300 hover:bg-dark-card hover:text-white transition-colors rounded-md"
            >
              <LogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors mb-2 ${
          isActive
            ? 'bg-primary-600/20 text-primary-400'
            : 'text-gray-400 hover:bg-dark-card hover:text-white'
        }`
      }
      onClick={onClick}
      end
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AdminHeader;