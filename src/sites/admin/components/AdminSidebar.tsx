import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, FileText, MessageCircle, Gamepad2 } from 'lucide-react';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="admin-sidebar h-screen p-6 hidden md:block">
      <div className="flex items-center mb-10">
        <h1 className="text-white font-heading text-xl font-bold">MOB Admin</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <NavItem to="/products" icon={<ShoppingBag size={20} />} label="Productos" />
        <NavItem to="/blog" icon={<FileText size={20} />} label="Blog" />
        <NavItem to="/comments" icon={<MessageCircle size={20} />} label="Comentarios" />
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-dark-card rounded-lg p-4 text-center">
          <Gamepad2 size={24} className="text-primary-400 mx-auto mb-2" />
          <p className="text-white text-sm mb-2">Panel de Administración</p>
          <p className="text-gray-500 text-xs">v1.0.0</p>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
          isActive
            ? 'bg-primary-600/20 text-primary-400'
            : 'text-gray-400 hover:bg-dark hover:text-white'
        }`
      }
      end
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export default AdminSidebar;