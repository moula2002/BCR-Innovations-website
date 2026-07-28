import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoUrl from "../../assets/Logo.png";
import api from '../../services/api';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          api.get('/categories'),
          api.get('/subcategories')
        ]);
        setCategories(catRes.data.data || []);
        setSubcategories(subRes.data.data || []);
      } catch (err) {
        console.error("Failed to load nav dropdown data", err);
      }
    };
    fetchDropdownData();
  }, []);

  // For mobile menu products accordion
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

  const renderNavLink = (link) => (
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
      
      {location.pathname !== link.path && (
        <div className="absolute bottom-0 left-1/2 right-1/2 h-1 bg-gray-200 rounded-t-full transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100"></div>
      )}
    </Link>
  );

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
              {renderNavLink({ name: 'Home', path: '/' })}
              {renderNavLink({ name: 'About Us', path: '/about' })}
              
              {/* Products Dropdown */}
              <div className="group h-full flex items-center relative px-2 cursor-pointer">
                <Link to="/products" className={`font-black uppercase tracking-wider text-sm flex items-center gap-1 transition-colors duration-300 relative z-10 ${location.pathname.includes('/products') ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`}>
                  PRODUCTS <ChevronDown className="w-4 h-4 ml-1 opacity-60" />
                </Link>
                
                {location.pathname.includes('/products') && (
                  <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-t-full" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                {!location.pathname.includes('/products') && (
                  <div className="absolute bottom-0 left-1/2 right-1/2 h-1 bg-gray-200 rounded-t-full transition-all duration-300 group-hover:left-0 group-hover:right-0 opacity-0 group-hover:opacity-100"></div>
                )}

                {/* Primary Dropdown Container */}
                <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="bg-white shadow-xl rounded-xl border border-gray-100 py-3 w-72 relative">
                    {categories.map(cat => {
                      const subs = subcategories.filter(s => s.parentCategory === cat.id);
                      const hasSubs = subs.length > 0;
                      return (
                        <div key={cat.id} className="relative group/sub">
                          <Link 
                            to={`/products/category/${encodeURIComponent(cat.id)}`} 
                            className="px-6 py-3 hover:bg-gray-50 flex items-center justify-between text-gray-700 hover:text-primary transition-colors text-[15px] font-medium"
                          >
                            {cat.name}
                            {hasSubs && <ChevronRight className="w-4 h-4 text-gray-400" />}
                          </Link>

                          {/* Secondary Dropdown (Subcategories) */}
                          {hasSubs && (
                            <div className="absolute top-0 left-full pl-1 opacity-0 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto transition-all duration-200">
                              <div className="bg-white shadow-xl rounded-xl border border-gray-100 py-3 w-64">
                                {subs.map(sub => (
                                  <Link 
                                    key={sub.id} 
                                    to={`/products/category/${encodeURIComponent(cat.id)}/subcategory/${encodeURIComponent(sub.id)}`} 
                                    className="block px-6 py-2.5 hover:bg-gray-50 text-gray-600 hover:text-primary transition-colors text-[14.5px]"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {renderNavLink({ name: 'FAQ', path: '/faq' })}
              {renderNavLink({ name: 'Careers', path: '/careers' })}
              {renderNavLink({ name: 'Contact', path: '/contact' })}
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
                className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 overflow-y-auto max-h-[70vh] ${scrolled ? 'rounded-3xl mt-4 border' : 'rounded-b-3xl'}`}
              >
                <div className="px-6 py-6 space-y-1">
                  <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">HOME</Link>
                  <Link to="/about" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">ABOUT US</Link>
                  
                  {/* Mobile Products Accordion */}
                  <div>
                    <button 
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary"
                    >
                      PRODUCTS
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 pr-2"
                        >
                          <Link to="/products" onClick={() => setIsOpen(false)} className="block px-4 py-2 mt-1 rounded-lg text-sm font-semibold text-primary hover:bg-primary/5">All Products</Link>
                          {categories.map(cat => {
                            const subs = subcategories.filter(s => s.parentCategory === cat.id);
                            const hasSubs = subs.length > 0;
                            const isExpanded = mobileActiveCategory === cat.id;

                            return (
                              <div key={cat.id} className="mt-1">
                                <button 
                                  onClick={() => hasSubs ? setMobileActiveCategory(isExpanded ? null : cat.id) : (setIsOpen(false), window.location.href=`/products/category/${encodeURIComponent(cat.id)}`)}
                                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg text-[15px] font-medium text-gray-700 hover:bg-gray-50"
                                >
                                  {cat.name}
                                  {hasSubs && <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />}
                                </button>
                                
                                {hasSubs && isExpanded && (
                                  <div className="pl-4 border-l-2 border-gray-100 ml-4 mt-1 mb-2 space-y-1">
                                    <Link 
                                      to={`/products/category/${encodeURIComponent(cat.id)}`} 
                                      onClick={() => setIsOpen(false)}
                                      className="block px-4 py-2 rounded-lg text-[14px] text-gray-500 hover:text-primary hover:bg-primary/5"
                                    >
                                      All {cat.name}
                                    </Link>
                                    {subs.map(sub => (
                                      <Link 
                                        key={sub.id} 
                                        to={`/products/category/${encodeURIComponent(cat.id)}/subcategory/${encodeURIComponent(sub.id)}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2 rounded-lg text-[14px] text-gray-500 hover:text-primary hover:bg-primary/5"
                                      >
                                        {sub.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link to="/faq" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">FAQ</Link>
                  <Link to="/careers" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">CAREERS</Link>
                  <Link to="/contact" onClick={() => setIsOpen(false)} className="block px-4 py-3 rounded-xl font-black uppercase tracking-widest text-sm text-gray-600 hover:bg-gray-50 hover:text-primary">CONTACT</Link>
                  
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
