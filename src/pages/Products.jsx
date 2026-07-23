import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import { motion } from 'framer-motion';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const categoryFilter = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl">Explore our comprehensive range of high-quality industrial supplies, machinery, and automation systems.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setSearchParams({})}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${!categoryFilter ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button 
                    onClick={() => setSearchParams({ category: cat.id })}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between items-center ${categoryFilter === cat.id ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

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
                  key={product.id} 
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <Link to={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
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
                    <Link to={`/products/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-semibold text-gray-900 bg-gray-50 px-3 py-1 rounded-lg text-sm">{product.price}</span>
                      <Link to={`/products/${product.id}`} className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
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
