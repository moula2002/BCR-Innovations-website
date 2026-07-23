import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from '../assets/Logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Bar - Deep Navy */}
      <div className="bg-primary text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="mailto:sales@bcrinnovations.com" className="hover:text-gray-300 transition flex items-center gap-2">
              <Mail className="h-3 w-3" /> sales@bcrinnovations.com
            </a>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="tel:+919844013768" className="hover:text-gray-300 transition flex items-center gap-2 font-semibold">
              <Phone className="h-3 w-3" /> +91 98440 13768
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-0 border-b border-gray-100' : 'bg-transparent py-2 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img src={logoUrl} alt="BCR Innovations Logo" className="h-14 w-auto object-contain scale-[1.35] origin-left transition-transform group-hover:scale-[1.45]" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            <span className="font-bold text-2xl text-primary hidden lg:block tracking-tight pl-2">BCR Innovations</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors h-full flex items-center relative ${location.pathname === link.path ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/contact" className="bg-primary text-white hover:bg-primary-dark px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm">
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="px-6 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-colors ${location.pathname === link.path
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-primary'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-primary text-white px-6 py-3 rounded-xl font-medium shadow-sm">
                    Get a Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
