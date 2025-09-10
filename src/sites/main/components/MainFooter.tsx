import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';

const MainFooter: React.FC = () => {
  return (
    <footer className="bg-dark-surface text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">MOB Entertainment</h3>
            <p className="text-gray-400 mb-4">
              Creating immersive gaming experiences and entertainment content since 2010.
            </p>
            <div className="flex space-x-4">
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Youtube size={20} />} />
              <SocialIcon icon={<Twitch size={20} />} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">About</h3>
            <ul className="space-y-2">
              <FooterLink to="/about" label="About Us" />
              <FooterLink to="/team" label="Our Team" />
              <FooterLink to="/careers" label="Careers" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Store</h3>
            <ul className="space-y-2">
              <FooterLink to="/store" label="All Products" />
              <FooterLink to="/store?category=Plushies" label="Plushies" />
              <FooterLink to="/store?category=Clothing" label="Clothing" />
              <FooterLink to="/store?category=Collectibles" label="Collectibles" />
              <FooterLink to="/store?category=Accessories" label="Accessories" />
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Games</h3>
            <ul className="space-y-2">
              <FooterLink to="/games" label="All Games" />
              <FooterLink to="/games/1" label="League of Legends" />
              <FooterLink to="/games/2" label="Valorant" />
              <FooterLink to="/games/3" label="Teamfight Tactics" />
              <FooterLink to="/games/4" label="Legends of Runeterra" />
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 MOB Entertainment. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 text-sm hover:text-primary-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-primary-400 transition-colors">
        {label}
      </Link>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
      {icon}
    </a>
  );
};

export default MainFooter;