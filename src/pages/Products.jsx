import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodRes.data.data);
        setCategories(catRes.data.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm, products]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">Loading products...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-40 md:pb-20">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl">Explore our comprehensive range of high-quality industrial supplies, machinery, and automation systems.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-1/4"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setSearchParams({})}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${!categoryFilter ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                    <Filter className="w-4 h-4" />
                  </div>
                  <span>All Products</span>
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSearchParams({ category: cat.id })}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${categoryFilter === cat.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-md object-cover border border-gray-100 shrink-0 bg-white" />
                      ) : (
                        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center shrink-0 border border-gray-100">
                          <span className="text-gray-400 text-xs font-medium uppercase">{cat.name.charAt(0)}</span>
                        </div>
                      )}
                      <span className="truncate">{cat.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500 shrink-0">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search products by name or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            />
          </div>

          {/* Results */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={product._id} 
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <Link to={`/products/${product._id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                      {categories.find(c => c.id === product.category)?.name}
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-sm text-gray-400 mb-2 font-medium">{product.brands}</div>
                    <Link to={`/products/${product._id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg text-sm">{product.price}</span>
                      <Link to={`/products/${product._id}`} className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
