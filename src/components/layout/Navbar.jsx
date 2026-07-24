import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from "../../assets/Logo.png";

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
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
    >
      {/* Top Bar - Deep Navy */}
      <div className={`bg-primary text-white text-xs transition-all duration-500 overflow-hidden w-full pointer-events-auto ${scrolled ? 'h-0 opacity-0 py-0' : 'h-10 py-2 opacity-100 hidden md:flex items-center'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="mailto:bcrinnovations2026@gmail.com" className="hover:text-secondary transition-colors flex items-center gap-2 group">
              <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" /> bcrinnovations2026@gmail.com
            </a>
          </div>
          <div className="flex space-x-6 items-center">
            <a href="tel:+919844013768" className="hover:text-secondary transition-colors flex items-center gap-2 font-semibold group">
              <Phone className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" /> +91 98440 13768
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - Full Width Design */}
      <div className="w-full transition-all duration-500 flex justify-center pointer-events-auto">
        <nav className={`transition-all duration-500 w-full relative ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-gray-100' : 'bg-white border-b border-gray-100 shadow-sm'}`}>
          <div className={`mx-auto px-6 md:px-8 flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16 max-w-7xl' : 'h-20 max-w-7xl'}`}>
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logoUrl} 
                alt="BCR Innovations Logo" 
                className={`w-auto object-contain origin-left transition-all duration-500 ${scrolled ? 'h-10 scale-110' : 'h-14 scale-[1.35]'}`} 
                onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} 
              />
              <span className={`font-bold text-primary hidden lg:block tracking-tight pl-2 transition-all duration-500 ${scrolled ? 'text-xl' : 'text-2xl'}`}>BCR Innovations</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 h-full">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="group h-full flex items-center relative px-2"
                >
                  <span className={`font-black uppercase tracking-wider text-sm transition-colors duration-300 relative z-10 ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>
                    {link.name}
                  </span>
                  
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-t-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Indicator (Only when not active) */}
                  {location.pathname !== link.path && (
                    <div className="absolute bottom-0 left-1/2 right-1/2 h-1 bg-gray-200 rounded-t-full transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100"></div>
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center">
              <Link to="/contact">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden bg-primary text-white px-7 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl transition-shadow group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Get a Quote</span>
                  <div className="absolute inset-0 h-full w-0 bg-secondary transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                </motion.button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors z-50"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 overflow-hidden ${scrolled ? 'rounded-3xl mt-4 border' : 'rounded-b-3xl'}`}
              >
                <div className="px-6 py-6 space-y-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      key={link.name}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition-all ${location.pathname === link.path
                            ? 'bg-blue-600/10 text-blue-600 pl-6'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600 hover:pl-6'
                          }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.3 }}
                    className="pt-6 mt-4 border-t border-gray-100"
                  >
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="block w-full text-center bg-primary text-white px-6 py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
                      Get a Quote
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </motion.header>
  );
}
