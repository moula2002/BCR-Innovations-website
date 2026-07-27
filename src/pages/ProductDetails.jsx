import { useParams, Link } from 'react-router-dom';
import { Check, ArrowLeft, Send, PhoneCall, Package, Ruler, Box, ShieldCheck, Wrench, ChevronRight, Info } from 'lucide-react';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const WhatsAppIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const [prodRes, allProdRes, catRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get('/products'),
          api.get('/categories')
        ]);
        setProduct(prodRes.data.data);
        
        const catData = catRes.data.data;
        setCategories(catData);
        
        const cat = catData.find(c => c.id === prodRes.data.data.category);
        if (cat) setCategoryName(cat.name);

        const allProds = allProdRes.data.data;
        let related = allProds.filter(p => p.category === prodRes.data.data.category && p._id !== id);
        
        // If we don't have enough related products in the same category, fill it up with others
        if (related.length < 4) {
          const otherProds = allProds.filter(p => p._id !== id && !related.find(r => r._id === p._id));
          related = [...related, ...otherProds].slice(0, 4);
        } else {
          related = related.slice(0, 4);
        }
        
        setRelatedProducts(related);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium tracking-wider uppercase text-sm">Loading Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Product Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The product you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/products" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all hover:shadow-lg">
          <ArrowLeft className="w-5 h-5" /> Return to Catalog
        </Link>
      </div>
    );
  }



  const whatsappMessage = encodeURIComponent(`Hello! I'm interested in the ${product.name}. Could you provide more details?`);

  return (
    <div className="bg-gray-50/50 min-h-screen pb-24">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-gray-100 pt-28 pb-6 md:pt-36 md:pb-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-sm font-medium text-gray-500">
          <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Products
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-primary">{categoryName || 'Category'}</span>
          <ChevronRight className="w-4 h-4 text-gray-300" />
          <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          {/* Product Image Gallery (Premium Design) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl shadow-gray-200/50 relative group p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white -z-10"></div>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain object-center drop-shadow-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.brands && (
                  <span className="bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wider uppercase">
                    {product.brands}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Product Info (Premium Design) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="text-primary font-bold tracking-widest text-sm uppercase bg-primary/10 px-3 py-1 rounded-full">
                {categoryName}
              </span>
              {product.sku && <span className="text-gray-400 text-sm font-medium">SKU: {product.sku}</span>}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">{product.name}</h1>
            
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {product.material && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-xl text-gray-500"><Package className="w-5 h-5" /></div>
                  <div><p className="text-xs text-gray-500 font-medium mb-0.5">Material</p><p className="font-bold text-gray-900 text-sm">{product.material}</p></div>
                </div>
              )}
              {product.size && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-xl text-gray-500"><Ruler className="w-5 h-5" /></div>
                  <div><p className="text-xs text-gray-500 font-medium mb-0.5">Dimensions</p><p className="font-bold text-gray-900 text-sm">{product.size}</p></div>
                </div>
              )}
              {product.capacity && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-xl text-gray-500"><Box className="w-5 h-5" /></div>
                  <div><p className="text-xs text-gray-500 font-medium mb-0.5">Capacity</p><p className="font-bold text-gray-900 text-sm">{product.capacity}</p></div>
                </div>
              )}
              {product.warranty && (
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="bg-gray-50 p-2 rounded-xl text-gray-500"><ShieldCheck className="w-5 h-5" /></div>
                  <div><p className="text-xs text-gray-500 font-medium mb-0.5">Warranty</p><p className="font-bold text-gray-900 text-sm">{product.warranty}</p></div>
                </div>
              )}
            </div>

            {/* Interactive Tabs */}
            <div className="mb-8">
              <div className="flex gap-6 border-b border-gray-200 mb-6">
                {['description', 'specifications', 'applications'].map((tab) => (
                  (tab === 'description' || product[tab]) && (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-4 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full" />
                      )}
                    </button>
                  )
                ))}
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 leading-relaxed min-h-[120px]"
                >
                  {activeTab === 'description' && <p>{product.description}</p>}
                  {activeTab === 'specifications' && <p className="whitespace-pre-wrap">{product.specifications}</p>}
                  {activeTab === 'applications' && <p className="whitespace-pre-wrap">{product.applications}</p>}
                </motion.div>
              </AnimatePresence>
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mb-10">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Check className="w-5 h-5 text-primary" /> Core Features</h3>
                <ul className="grid sm:grid-cols-2 gap-y-3 gap-x-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Bar */}
            <div className="mt-auto bg-white p-6 rounded-3xl border border-gray-100 shadow-lg shadow-gray-200/50 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="relative z-10 w-full sm:w-auto text-center sm:text-left">
                <div className="text-sm text-gray-500 font-medium mb-1 uppercase tracking-wider">Pricing</div>
                <div className="text-3xl font-extrabold text-gray-900">{product.price || 'Contact Us'}</div>
              </div>
              
              <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a 
                  href={`https://wa.me/1234567890?text=${whatsappMessage}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <WhatsAppIcon className="w-5 h-5" /> WhatsApp
                </a>
                <Link 
                  to={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  <Send className="w-4 h-4" /> Request Quote
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 max-w-7xl mx-auto border-t border-gray-200 pt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={related._id} 
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <Link to={`/products/${related._id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={related.image} 
                      alt={related.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {categories.find(c => c.id === related.category)?.name || related.category}
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 mb-1 font-medium">{related.brands}</div>
                    <Link to={`/products/${related._id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{related.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg text-sm">{related.price}</span>
                      <Link to={`/products/${related._id}`} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
