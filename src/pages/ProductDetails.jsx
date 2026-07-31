import { useParams, Link } from 'react-router-dom';
import { 
  Check, 
  ArrowLeft, 
  Send, 
  Package, 
  Ruler, 
  Box, 
  ShieldCheck, 
  ChevronRight, 
  Info,
  LayoutGrid,
  Sliders,
  Layers,
  Lightbulb,
  Snowflake,
  Wrench,
  ArrowUp,
  Maximize2,
  CheckCircle2,
  Mail,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import { getImageUrl } from '../utils';

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
  const [subcategoryName, setSubcategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const [prodRes, allProdRes, catRes, subRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get('/products'),
          api.get('/categories'),
          api.get('/subcategories')
        ]);
        setProduct(prodRes.data.data);
        
        const catData = catRes.data.data;
        setCategories(catData);
        
        const cat = catData.find(c => c.id === prodRes.data.data.category);
        if (cat) setCategoryName(cat.name);

        const sub = subRes.data.data.find(s => s.id === prodRes.data.data.subcategory);
        if (sub) setSubcategoryName(sub.name);

        const allProds = allProdRes.data.data;
        let related = allProds.filter(p => p.category === prodRes.data.data.category && p._id !== id);
        
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
      <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans animate-pulse">
        {/* Hero Banner Skeleton */}
        <div className="bg-[#0277bd] pt-32 pb-16 md:pt-44 md:pb-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
            <div className="h-12 md:h-16 w-3/4 max-w-2xl bg-white/20 rounded-2xl mx-auto"></div>
            <div className="flex flex-wrap justify-center gap-3.5 px-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-11 w-32 bg-white/15 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pt-12 space-y-12">
          {/* Specs Card Skeleton */}
          <div className="bg-white rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
            <div className="h-6 w-64 bg-slate-200 rounded-lg"></div>
            <div className="h-20 bg-slate-100 rounded-2xl"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
              <div className="h-16 bg-slate-100 rounded-2xl"></div>
            </div>
          </div>

          {/* Main Details Skeleton */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="h-10 w-3/4 bg-slate-200 rounded-xl"></div>
              <div className="h-4 w-full bg-slate-100 rounded-lg"></div>
              <div className="h-4 w-11/12 bg-slate-100 rounded-lg"></div>
              <div className="h-4 w-4/5 bg-slate-100 rounded-lg"></div>
            </div>
            <div className="bg-slate-100 rounded-[32px] h-[380px] flex items-center justify-center border border-slate-200/50">
              <div className="w-56 h-56 bg-slate-200/60 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Product Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">The product you are looking for might have been removed or is temporarily unavailable.</p>
        <Link to="/products" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0277bd] text-white font-bold rounded-full hover:bg-[#01579b] transition-all hover:shadow-lg">
          <ArrowLeft className="w-5 h-5" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hello! I'm interested in the ${product.name}. Could you provide more details?`);

  const getTabIcon = (name) => {
    const lower = (name || '').toLowerCase();
    if (lower.includes('overview')) return <LayoutGrid className="w-4 h-4" />;
    if (lower.includes('design')) return <Sliders className="w-4 h-4" />;
    if (lower.includes('material')) return <Layers className="w-4 h-4" />;
    if (lower.includes('light')) return <Lightbulb className="w-4 h-4" />;
    if (lower.includes('refrigerat') || lower.includes('cool')) return <Snowflake className="w-4 h-4" />;
    if (lower.includes('spec')) return <Wrench className="w-4 h-4" />;
    return <Info className="w-4 h-4" />;
  };

  const getFeatureIcon = (feature, index) => {
    const text = (typeof feature === 'string' ? feature : feature?.heading || feature?.description || '').toLowerCase();
    if (text.includes('light') || text.includes('led')) return <Lightbulb className="w-5 h-5" />;
    if (text.includes('control') || text.includes('temp') || text.includes('digital')) return <Sliders className="w-5 h-5" />;
    if (text.includes('material') || text.includes('corian') || text.includes('panel')) return <Maximize2 className="w-5 h-5" />;
    if (text.includes('top') || text.includes('glass')) return <Sliders className="w-5 h-5" />;
    if (text.includes('steel') || text.includes('finish') || text.includes('grade')) return <CheckCircle2 className="w-5 h-5" />;
    
    const icons = [
      <LayoutGrid className="w-5 h-5" />,
      <Maximize2 className="w-5 h-5" />,
      <Sliders className="w-5 h-5" />,
      <CheckCircle2 className="w-5 h-5" />
    ];
    return icons[index % icons.length];
  };

  const getFormattedSpecifications = (specs) => {
    if (!specs) return [];
    if (Array.isArray(specs)) {
      return specs.map(item => {
        if (typeof item === 'object' && item !== null) {
          return { key: item.key || item.name || '', value: item.value || item.val || '' };
        }
        return { key: 'Specification', value: String(item) };
      }).filter(s => s.key || s.value);
    }
    if (typeof specs === 'string') {
      const trimmed = specs.trim();
      if (!trimmed) return [];
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return getFormattedSpecifications(parsed);
        if (typeof parsed === 'object' && parsed !== null) {
          return Object.entries(parsed).map(([key, value]) => ({ key, value: String(value) }));
        }
      } catch {
        const lines = trimmed.split('\n').filter(l => l.trim());
        return lines.map(line => {
          const colonIdx = line.indexOf(':');
          if (colonIdx > -1) {
            return { key: line.substring(0, colonIdx).trim(), value: line.substring(colonIdx + 1).trim() };
          }
          return { key: 'Details', value: line.trim() };
        });
      }
    }
    return [];
  };

  const specificationsList = product ? getFormattedSpecifications(product.specifications) : [];

  const hasCustomTabs = product.tabs && product.tabs.length > 0;

  const defaultTabs = [
    {
      id: 'overview',
      name: 'Overview',
      label: 'Overview',
      title: 'Timeless style',
      type: 'overview',
      icon: <LayoutGrid className="w-4 h-4" />,
      description: product.description || `${product.name} is a professional, high-performance solution with unique design and high-level technical features, offering a wide range of functionality to suit your needs. A perfect balance between aesthetics and functionality.`,
      secondaryDescription: (typeof product.specifications === 'string' && product.specifications.trim())
        ? product.specifications
        : "Refrigeration is equalized on all display levels where the air flow does not affect the product. This refrigeration system has a high humidity level which favours correct conservation of the displayed products.",
      image: product.image
    },
    {
      id: 'design',
      name: 'Design',
      label: 'Design',
      title: 'Ergonomic & Modern Design',
      type: 'overview',
      icon: <Sliders className="w-4 h-4" />,
      description: `Crafted with modern engineering principles, ${product.name} blends seamless visual elegance with heavy-duty commercial reliability. Designed for maximum usability, visibility, and operational efficiency.`,
      secondaryDescription: "Featuring precision glass construction, clear sightlines, and refined architectural styling to showcase your items in the best possible light.",
      image: product.image
    },
    {
      id: 'material',
      name: 'Material',
      label: 'Material',
      title: 'Material',
      type: 'material',
      icon: <Layers className="w-4 h-4" />,
      features: [
        "The material is fundamental for every planner or designer.",
        product.material ? `Front decorative panel and frame: ${product.material}.` : "Front decorative panel is made of corian.",
        "Unit top is made of ultra-clear heavy duty glass.",
        "AISI 304 food grade stainless steel with matte finish."
      ]
    },
    {
      id: 'lighting',
      name: 'Lighting',
      label: 'Lighting',
      title: 'Lighting',
      type: 'lighting',
      icon: <Lightbulb className="w-4 h-4" />,
      image: product.image,
      features: [
        "Light is essential for a proper display of products; this is why Williams choose to install an innovative indirect lighting system with no-spot LED strips, perfectly integrated with the display.",
        "The visual appeal of food and drink merchandise is significantly enhanced by smart bright, energy efficient LED lighting.",
        "Electronic digital controller of Italian make is used for precise control and display of the temperature of the food items.",
        "Novel design of extrusion where LED strips are located at the top with optional colours white/neutral white."
      ]
    },
    {
      id: 'refrigeration',
      name: 'Refrigeration',
      label: 'Refrigeration',
      title: 'Advanced Refrigeration & Climate Control',
      type: 'overview',
      icon: <Snowflake className="w-4 h-4" />,
      description: "Equalized refrigeration across all levels ensures consistent temperature distribution without drying out sensitive products. Designed with high humidity conservation technology.",
      secondaryDescription: product.capacity ? `Capacity: ${product.capacity}. Built for continuous high-demand operation with maximum energy savings.` : "Built for continuous high-demand commercial operation with maximum energy efficiency.",
      image: product.image
    }
  ];

  const formattedCustomTabs = (product.tabs || []).map((tab, idx) => {
    const tabName = tab.name || `Tab ${idx + 1}`;
    const lowerName = tabName.toLowerCase();
    let type = 'overview';
    if (lowerName.includes('material')) type = 'material';
    else if (lowerName.includes('light')) type = 'lighting';

    return {
      id: `tab-${idx}`,
      name: tabName,
      label: tabName,
      title: tab.title || tabName,
      type: type,
      icon: getTabIcon(tabName),
      description: tab.description || '',
      secondaryDescription: '',
      image: tab.image || product.image,
      features: tab.features && tab.features.length > 0 ? tab.features : [
        "High-grade engineering and quality materials.",
        "Built to strict industrial standards for long-lasting durability.",
        "Precision craftsmanship for seamless operation.",
        "Easy maintenance and hygienic clean surface design."
      ]
    };
  });

  const displayTabs = hasCustomTabs ? formattedCustomTabs : defaultTabs;
  const currentTab = displayTabs.find(t => t.id === activeTab) || displayTabs[0];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-24 font-sans text-gray-800">
      {/* Official Logo Primary Blue Hero Banner */}
      <div className="bg-[#0277bd] text-white pt-32 pb-16 md:pt-44 md:pb-20 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Back to Category Link */}
          <div className="mb-6 flex items-center justify-start md:absolute md:-top-10 md:left-6">
            <Link 
              to={product.category ? `/products/category/${encodeURIComponent(product.category)}` : "/products"} 
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-all bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-full border border-white/25 backdrop-blur-sm shadow-sm hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4" /> {categoryName ? `Back to ${categoryName}` : 'Back to Collection'}
            </Link>
          </div>

          <div className="text-center pt-4 md:pt-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide text-white mb-10">
              {product.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3.5 px-4 max-w-4xl mx-auto">
              {displayTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full text-sm md:text-base font-medium flex items-center gap-2.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-white text-[#0277bd] shadow-xl scale-105 font-bold'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        {/* Breadcrumb & Specs Highlight Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 md:p-8 border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.04)] mb-12 space-y-6 relative overflow-hidden"
        >
          {/* Decorative subtle background glow */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#0277bd]/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-1.5 text-sm font-medium">
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-[#0277bd] px-3 py-1.5 rounded-xl hover:bg-slate-100/80 transition-all flex items-center gap-1.5"
            >
              <span>Products</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
            <Link 
              to={`/products/category/${encodeURIComponent(product.category)}`} 
              className="text-[#0277bd] font-bold px-3 py-1.5 rounded-xl hover:bg-blue-50/80 transition-all flex items-center gap-1.5"
            >
              <span>{categoryName || 'Display Cabinets'}</span>
            </Link>
            {subcategoryName && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                <Link 
                  to={`/products/category/${encodeURIComponent(product.category)}/subcategory/${encodeURIComponent(product.subcategory)}`} 
                  className="text-gray-600 font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-100/80 hover:text-[#0277bd] transition-all flex items-center gap-1.5"
                >
                  <span>{subcategoryName}</span>
                </Link>
              </>
            )}
          </div>

          {/* Material & Construction Callout Banner */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full bg-gradient-to-r from-blue-50/90 via-slate-50/90 to-blue-50/40 rounded-2xl p-4 md:p-5 border-l-4 border-[#0277bd] border-y border-r border-slate-200/60 shadow-xs flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0277bd] text-white flex items-center justify-center shadow-md shadow-blue-600/25 shrink-0 mt-0.5">
              <Package className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0277bd] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Premium Build Specifications
              </span>
              <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">
                {product.material 
                  ? `The material is fundamental for every planner or designer. Front decorative panel is made of corian. Unit top is made of glass. ${product.material}`
                  : "The material is fundamental for every planner or designer. Front decorative panel is made of corian. Unit top is made of glass. AISI 304 food grade stainless steel with matte finish."
                }
              </p>
            </div>
          </motion.div>

          {/* Dynamic Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0277bd]/40 transition-all flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0277bd] flex items-center justify-center shrink-0 border border-blue-100">
                <Ruler className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Dimensions & Size</span>
                <span className="text-slate-800 text-sm font-semibold">{product.size || "Customizable as per Requirement"}</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0277bd]/40 transition-all flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
                <Box className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Storage Capacity</span>
                <span className="text-slate-800 text-sm font-semibold">{product.capacity || "3 Deck, 6 Trays / 9 Trays Capacity"}</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-[#0277bd]/40 transition-all flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Quality Guarantee</span>
                <span className="text-slate-800 text-sm font-semibold">{product.warranty || "1 Year Manufacturer Warranty"}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            {currentTab.type === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
                    {currentTab.title}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                    {currentTab.description}
                  </p>
                  {currentTab.secondaryDescription && typeof currentTab.secondaryDescription === 'string' && (
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed pt-2 border-t border-slate-100">
                      {currentTab.secondaryDescription}
                    </p>
                  )}
                </div>
                <div className="bg-[#f4f7fa] rounded-[32px] p-8 md:p-12 relative border border-slate-100 flex items-center justify-center min-h-[380px] group shadow-sm">
                  <img
                    src={getImageUrl(currentTab.image || product.image)}
                    alt={currentTab.title}
                    className="max-h-[340px] w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => {
                      if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
                      else window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#0277bd] hover:bg-[#01579b] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer"
                    title="Scroll to Top"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {currentTab.type === 'material' && (
              <div className="py-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
                  {currentTab.title || 'Material'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                  {currentTab.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-[#f3f5f8] rounded-3xl p-8 border border-slate-100/80 flex flex-col justify-between items-start min-h-[160px] shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#0277bd]/10 text-[#0277bd] flex items-center justify-center mb-6">
                        {getFeatureIcon(feat, fIdx)}
                      </div>
                      <p className="text-gray-600 font-medium text-base leading-relaxed">
                        {typeof feat === 'string' 
                          ? feat 
                          : (feat.heading 
                              ? `${feat.heading}${feat.description ? `: ${feat.description}` : ''}` 
                              : (feat.description || (feat.key ? `${feat.key}: ${feat.value}` : '')))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab.type === 'lighting' && (
              <div className="bg-[#0277bd] rounded-[32px] p-8 md:p-14 text-white shadow-xl border border-blue-400/20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {currentTab.title || 'Lighting'}
                    </h2>
                    <div className="space-y-6">
                      {currentTab.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md shrink-0 flex items-center justify-center text-white border border-white/20 shadow-sm">
                            {getFeatureIcon(feat, fIdx)}
                          </div>
                          <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium pt-2">
                            {typeof feat === 'string' 
                              ? feat 
                              : (feat.heading 
                                  ? `${feat.heading}${feat.description ? `: ${feat.description}` : ''}` 
                                  : (feat.description || (feat.key ? `${feat.key}: ${feat.value}` : '')))}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-8 border border-white/20 flex items-center justify-center min-h-[350px] shadow-2xl">
                    <img
                      src={getImageUrl(currentTab.image || product.image)}
                      alt={currentTab.title}
                      className="max-h-[320px] w-auto object-contain drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Specifications Key-Value Table */}
        {specificationsList.length > 0 && (
          <div className="bg-white rounded-[28px] p-6 md:p-10 border border-slate-100 shadow-sm mb-16">
            <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-2xl font-extrabold text-gray-900 flex items-center gap-3">
                <Wrench className="w-6 h-6 text-[#0277bd]" /> Technical Specifications
              </h3>
              <span className="text-xs font-semibold text-gray-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
                {specificationsList.length} Parameters
              </span>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse text-sm md:text-base">
                <tbody>
                  {specificationsList.map((spec, idx) => (
                    <tr
                      key={idx}
                      className={`${
                        idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'
                      } border-b border-slate-100 last:border-b-0 hover:bg-blue-50/40 transition-colors`}
                    >
                      <td className="py-4 px-6 font-semibold text-gray-700 w-5/12 md:w-4/12 border-r border-slate-100 bg-slate-50/30">
                        {spec.key}
                      </td>
                      <td className="py-4 px-6 text-gray-800 font-medium">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Action Quote / Contact CTA Bar */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Interested in this product?</h3>
            <p className="text-gray-500 text-sm">Contact our technical team for custom quotes, dimensions, and availability.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <a
              href={`https://wa.me/1234567890?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" /> WhatsApp Inquiry
            </a>
            <Link
              to={`/contact?product=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image || '')}`}
              className="px-8 py-3.5 bg-[#0277bd] hover:bg-[#01579b] text-white rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Request Quote
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-200 pt-16 mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={related._id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <Link to={`/products/${related._id}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-50 p-4">
                    <img
                      src={getImageUrl(related.image)}
                      alt={related.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#0277bd] shadow-sm">
                      {categories.find(c => c.id === related.category)?.name || related.category}
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 mb-1 font-medium">{related.brands}</div>
                    <Link to={`/products/${related._id}`}>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0277bd] transition-colors line-clamp-2">{related.name}</h3>
                    </Link>
                    <div className="flex items-center justify-end mt-auto pt-4">
                      <Link to={`/products/${related._id}`} className="w-8 h-8 rounded-full bg-[#0277bd]/10 text-[#0277bd] flex items-center justify-center group-hover:bg-[#0277bd] group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Need a Help Section */}
        <div className="bg-[#0277bd] text-white rounded-[32px] p-10 md:p-16 mt-8 mb-12 text-center relative overflow-hidden shadow-xl border border-blue-400/20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            Need a Help?
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-8 font-normal">
            Write to us now
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8 text-white font-medium text-sm md:text-base">
            <a href="mailto:bcrinnovations07@gmail.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-5 h-5 text-white/90" />
              <span>bcrinnovations07@gmail.com</span>
            </a>
            <a href="mailto:sales@bcrinnovations.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-5 h-5 text-white/90" />
              <span>sales@bcrinnovations.com</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <Link to={`/contact?product=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image || '')}`} className="bg-[#f0f4f8] hover:bg-white text-gray-800 font-semibold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105 inline-flex items-center justify-center text-sm md:text-base">
              Contact Our Team
            </Link>
          </div>
          <button
            onClick={() => {
              if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
