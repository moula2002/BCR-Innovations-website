import { useState, useMemo } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck, Wrench, Package, PhoneCall, Sparkles, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const faqCategories = [
  { id: 'all', label: 'All Questions' },
  { id: 'products', label: 'Products & Materials' },
  { id: 'quality', label: 'Quality & Warranty' },
  { id: 'ordering', label: 'Custom Orders & Services' },
  { id: 'support', label: 'Maintenance & Support' }
];

const faqs = [
  {
    category: 'products',
    question: "What types of equipment does BCR Innovations manufacture?",
    answer: "BCR Innovations specializes in premium commercial kitchen equipment, industrial refrigeration units (display cabinets, cake displays, gelato counters), bakery machinery, cleanroom systems, and custom stainless steel fabrication for commercial, industrial, and food service applications."
  },
  {
    category: 'products',
    question: "What materials are used in BCR Innovations equipment?",
    answer: "Our equipment is engineered primarily using heavy-duty AISI 304 food-grade stainless steel with matte finish, ultra-clear tempered glass, precision LED indirect lighting, and premium Corian decorative panels for maximum hygiene, aesthetic appeal, and corrosion resistance."
  },
  {
    category: 'products',
    question: "Are your kitchen solutions customizable for specific floor layouts?",
    answer: "Yes! All our commercial display cabinets, worktables, storage racks, and refrigeration units can be fully customized in size, capacity (number of decks/trays), door types, power specs, and layout configurations to fit your exact facility requirements."
  },
  {
    category: 'quality',
    question: "What quality certifications do your products carry?",
    answer: "BCR Innovations operates under strict international quality and safety management systems. Our manufacturing facilities and products are ISO 9001:2015 certified, CE Certified, RoHS Compliant, and strictly adhere to OSHA safety standards."
  },
  {
    category: 'quality',
    question: "What warranty is provided on BCR Innovations equipment?",
    answer: "All BCR Innovations commercial equipment and machinery come with a comprehensive 1-Year Manufacturer Warranty covering mechanical components and manufacturing defects. Extended warranty and maintenance contracts are also available upon request."
  },
  {
    category: 'ordering',
    question: "How can I request a custom quote or place a bulk order?",
    answer: "You can request a custom quote directly from any Product Details page using the 'Request Quote' button, by filling out our Contact Form, or by emailing our sales team at bcrinnovations07@gmail.com / calling +91 91138 23660."
  },
  {
    category: 'ordering',
    question: "Do you offer kitchen layout planning and on-site installation services?",
    answer: "Yes, our experienced technical engineering team provides end-to-end solutions, from initial consultation and CAD floor plan drafting to precision laser fabrication, delivery, on-site installation, and pre-commissioning testing."
  },
  {
    category: 'ordering',
    question: "What is the typical lead time for custom fabrication and delivery?",
    answer: "Standard in-stock catalog products are dispatched within 3-5 business days. Custom-engineered fabrications and large commercial kitchen projects usually take 2 to 3 weeks depending on complexity and specifications."
  },
  {
    category: 'support',
    question: "How do I properly clean and maintain SS304 stainless steel surfaces?",
    answer: "We recommend cleaning stainless steel surfaces with warm water and mild detergent or dedicated non-abrasive stainless steel cleaners. Avoid using chlorine bleach or wire brushes. Wipe along the metal grain lines to maintain the pristine matte finish."
  },
  {
    category: 'support',
    question: "How can I request technical support or spare parts?",
    answer: "For technical assistance, spare parts, or routine maintenance, reach out to our customer support team directly at bcrinnovations07@gmail.com or call +91 91138 23660. We maintain inventory for standard components to ensure fast turnaround."
  }
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      return activeCategory === 'all' || faq.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pt-28 pb-24 font-sans text-gray-800">
      {/* Hero Header */}
      <div className="bg-[#0277bd] text-white pt-24 pb-20 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-transparent pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <span className="bg-white/15 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/25 inline-flex items-center gap-1.5 backdrop-blur-sm">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center & Knowledge Base
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto font-medium">
              Everything you need to know about BCR Innovations products, food-grade materials, custom engineering, and warranty.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {faqCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${isActive
                    ? 'bg-[#0277bd] text-white shadow-md shadow-blue-600/20 scale-105'
                    : 'bg-white text-gray-600 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={faq.question}
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                      ? 'border-[#0277bd] shadow-lg shadow-blue-500/5 ring-1 ring-[#0277bd]/20'
                      : 'border-slate-200/80 shadow-xs hover:border-slate-300'
                    }`}
                >
                  <button
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none gap-4 cursor-pointer"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className={`font-bold text-base md:text-lg transition-colors ${isOpen ? 'text-[#0277bd]' : 'text-gray-900'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-blue-50 text-[#0277bd]' : 'bg-slate-100 text-gray-400'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-1"
                    >
                      <div className="border-t border-slate-100 pt-4 text-slate-600 text-sm md:text-base leading-relaxed font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredFaqs.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-300 space-y-3">
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No matching questions found</h3>
              <p className="text-gray-500 text-sm">Try searching with a different keyword or view all categories.</p>
              <button
                onClick={() => { setActiveCategory('all'); }}
                className="px-5 py-2 bg-[#0277bd] text-white text-xs font-bold rounded-full hover:bg-[#01579b] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Contact Support CTA Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-900 to-[#0277bd] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-400/20"
        >
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <MessageSquare className="w-6 h-6 text-orange-400" /> Still Have Questions?
            </h3>
            <p className="text-white/80 text-sm md:text-base font-normal max-w-lg">
              Our technical engineering team is ready to assist you with custom CAD layouts, machine specifications, and inquiries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 w-full md:w-auto shrink-0">
            <a
              href="tel:+919844013768"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-all border border-white/20 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Support
            </a>
            <Link
              to="/contact"
              className="px-7 py-3.5 bg-white text-[#0277bd] hover:bg-slate-100 rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              Contact Engineering Team
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
