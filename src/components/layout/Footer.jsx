import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoUrl from '../../assets/Logo.png';

export default function Footer() {
  return (
    <footer className="bg-primary text-gray-300 pt-16 pb-8 border-t border-primary-dark">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-white rounded-lg p-1">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
            </div>
            <span className="font-bold text-2xl text-white tracking-tight">BCR Innovations</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Leading provider of innovative industrial products and solutions. Quality standards certified and globally recognized for excellence.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Quick Links
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            <li><Link to="/about" className="hover:text-secondary transition-colors">Company Profile</Link></li>
            <li><Link to="/products" className="hover:text-secondary transition-colors">Our Products</Link></li>
            <li><Link to="/about" className="hover:text-secondary transition-colors">Certifications</Link></li>
            <li><Link to="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
            <li><Link to="/faq" className="hover:text-secondary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Product Categories
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-3">
            <li><Link to="/products?category=williams-display" className="hover:text-secondary transition-colors">Williams Display Counters</Link></li>
            <li><Link to="/products?category=sln-kitchen" className="hover:text-secondary transition-colors">SLN Kitchen Equipment</Link></li>
            <li><Link to="/products?category=sml-cleanroom" className="hover:text-secondary transition-colors">SML Clean Room Equipment</Link></li>
            <li><Link to="/products?category=geebee-bakery" className="hover:text-secondary transition-colors">Gee Bee Bakery Equipment</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
            Contact Us
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
              <span>No. 860/A, Ground Floor, Narendra Chambers,<br />Opp. Modi Eye Hospital, West of Chord Road,<br />2nd Stage, Rajajinagar, Bengaluru - 560086</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <span>+91 98440 13768</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <span>bcrinnovations2026@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p>© {new Date().getFullYear()} BCR Innovations. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
