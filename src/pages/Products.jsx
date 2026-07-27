import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ChevronRight, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryFilter = searchParams.get('category');
  const subcategoryFilter = searchParams.get('subcategory');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryFilter, subcategoryFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes, subRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories'),
          api.get('/subcategories')
        ]);
        setProducts(prodRes.data.data || []);
        setCategories(catRes.data.data || []);
        setSubcategories(subRes.data.data || []);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeCategory = useMemo(() => categories.find(c => c.id === categoryFilter), [categoryFilter, categories]);
  const activeSubcategory = useMemo(() => subcategories.find(s => s.id === subcategoryFilter), [subcategoryFilter, subcategories]);

  // Which view are we in?
  // 1. If no category -> Category View
  // 2. If category but no subcategory (and subcategories exist) -> Subcategory View
  // 3. If subcategory -> Product View
  
  const relevantSubcategories = useMemo(() => {
    if (!categoryFilter) return [];
    return subcategories.filter(sub => sub.parentCategory === categoryFilter);
  }, [categoryFilter, subcategories]);

  const viewState = useMemo(() => {
    if (!categoryFilter) return 'CATEGORIES';
    if (categoryFilter && !subcategoryFilter && relevantSubcategories.length > 0) return 'SUBCATEGORIES';
    return 'PRODUCTS';
  }, [categoryFilter, subcategoryFilter, relevantSubcategories]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      const matchesSubcategory = subcategoryFilter ? product.subcategory === subcategoryFilter : true;
      return matchesCategory && matchesSubcategory;
    });
  }, [categoryFilter, subcategoryFilter, products]);

  if (loading) {
    return <div className="min-h-screen pt-40 pb-20 text-center text-gray-500 text-xl font-medium">Loading products...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      {/* Dynamic Header Block */}
      <div className="bg-[#4b77b7] text-white py-24 mb-12 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          
          {/* Breadcrumbs / Back button */}
          {viewState === 'SUBCATEGORIES' && (
            <button onClick={() => setSearchParams({})} className="flex items-center text-white/80 hover:text-white transition-colors mb-8 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </button>
          )}
          {viewState === 'PRODUCTS' && activeCategory && (
            <button onClick={() => setSearchParams({ category: activeCategory.id })} className="flex items-center text-white/80 hover:text-white transition-colors mb-8 text-sm font-medium">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to {activeCategory.name}
            </button>
          )}

          <motion.h1 
            key={viewState} // Forces re-animation on state change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-wider uppercase mb-8"
          >
            {viewState === 'CATEGORIES' && "OUR PRODUCTS"}
            {viewState === 'SUBCATEGORIES' && activeCategory?.name}
            {viewState === 'PRODUCTS' && (activeSubcategory?.name || activeCategory?.name || "PRODUCTS")}
          </motion.h1>
          
          <motion.div 
            key={`${viewState}-desc`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl leading-relaxed space-y-6"
          >
            {viewState === 'CATEGORIES' && (
              <p>Explore our comprehensive range of high-quality industrial supplies, machinery, and automation systems.</p>
            )}
            {viewState === 'SUBCATEGORIES' && activeCategory?.description?.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
            {viewState === 'PRODUCTS' && activeSubcategory?.description?.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Categories View */}
        {viewState === 'CATEGORIES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                key={cat.id} 
                onClick={() => setSearchParams({ category: cat.id })}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer flex flex-col group border border-gray-100"
              >
                <div className="p-8 pb-4 flex-grow flex items-center justify-center bg-white aspect-[4/3]">
                  {cat.image ? (
                    <img src={getImageUrl(cat.image)} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-5xl text-gray-300 font-bold uppercase">{cat.name.charAt(0)}</div>
                  )}
                </div>
                <div className="p-6 text-center pt-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.name}</h3>
                  {cat.description && (
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3">{cat.description}</p>
                  )}
                  <div className="mt-auto">
                    <button className="px-8 py-2.5 rounded-full border border-blue-100 text-[#4b77b7] font-semibold text-sm group-hover:bg-[#4b77b7] group-hover:border-[#4b77b7] group-hover:text-white transition-all duration-300 w-full md:w-auto">
                      View Range
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Subcategories View */}
        {viewState === 'SUBCATEGORIES' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relevantSubcategories.map((sub, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                key={sub.id} 
                onClick={() => setSearchParams({ category: categoryFilter, subcategory: sub.id })}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer flex flex-col group border border-gray-100"
              >
                <div className="p-8 pb-4 flex-grow flex items-center justify-center bg-white aspect-[4/3]">
                  {sub.image ? (
                    <img src={getImageUrl(sub.image)} alt={sub.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-32 h-32 bg-gray-50 rounded-2xl flex items-center justify-center text-5xl text-gray-300 font-bold uppercase">{sub.name.charAt(0)}</div>
                  )}
                </div>
                <div className="p-6 text-center pt-4 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{sub.name}</h3>
                  {sub.description && (
                    <p className="text-gray-500 text-sm mb-6 line-clamp-3">{sub.description}</p>
                  )}
                  <div className="mt-auto">
                    <button className="px-8 py-2.5 rounded-full border border-blue-100 text-[#4b77b7] font-semibold text-sm group-hover:bg-[#4b77b7] group-hover:border-[#4b77b7] group-hover:text-white transition-all duration-300 w-full md:w-auto">
                      View Range
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Products View */}
        {viewState === 'PRODUCTS' && (
          <div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
                <p className="text-gray-500 text-lg">No products found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
                    key={product._id} 
                    className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col border border-gray-100 p-6"
                  >
                    <Link to={`/products/${product._id}`} className="block relative aspect-square mb-6 bg-white overflow-hidden">
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.name} 
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <div className="text-center flex flex-col flex-grow">
                      <Link to={`/products/${product._id}`}>
                        <h3 className="text-lg font-bold text-gray-900 mb-6 group-hover:text-[#4b77b7] transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      <div className="mt-auto">
                         <Link to={`/products/${product._id}`} className="inline-block px-6 py-2.5 rounded-full border border-blue-100 text-[#4b77b7] font-semibold text-xs uppercase tracking-wider group-hover:bg-[#4b77b7] group-hover:border-[#4b77b7] group-hover:text-white transition-all duration-300">
                          Product Details
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
