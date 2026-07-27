import { ArrowRight, ShieldCheck, Award, Lightbulb, Headset, Building2, Package, CheckCircle2, MessageSquare, PenTool, Factory, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

import heroImg from '../assets/images/hero-branded.png';
import facilityImg from '../assets/images/facility-man.png';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data.data || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      } finally {
        setLoadingCats(false);
      }
    };
    fetchCategories();
  }, []);

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-secondary selection:text-white overflow-hidden">

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            src={heroImg}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-52 md:mt-64">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-2 tracking-tighter flex flex-wrap items-center gap-x-4">
              <span className="text-primary drop-shadow-md">BCR</span>
              <span className="text-orange-400 drop-shadow-md">INNOVATIONS</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-white font-bold tracking-[0.15em] mb-10 max-w-3xl uppercase flex items-center gap-3 drop-shadow-md">
              <span className="text-orange-400 text-3xl italic font-black">/</span> INNOVATION IN PRODUCTION
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
              <Link to="/products" className="group inline-flex items-center justify-center gap-2 bg-primary text-white hover:bg-white hover:text-primary rounded-full px-10 h-14 text-lg shadow-[0_0_20px_rgba(2,119,189,0.4)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 w-full sm:w-auto font-bold overflow-hidden relative">
                <span className="relative z-10 flex items-center gap-2">View Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:border-white rounded-full px-10 h-14 text-lg transition-all duration-300 w-full sm:w-auto font-bold backdrop-blur-sm">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section className="relative z-20 mt-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-y border-white p-8 md:p-10"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center divide-x divide-gray-100">
            <div className="px-4">
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">1000<span className="text-secondary">+</span></p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Trusted Clients</p>
            </div>
            <div className="px-4">
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">3</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Global Facilities</p>
            </div>
            <div className="px-4">
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">27</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Years Experience</p>
            </div>
            <div className="px-4">
              <p className="text-4xl md:text-5xl font-black text-primary mb-2">ISO</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Certified Quality</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 rounded-l-[100px] z-0 hidden lg:block"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 w-full relative"
            >
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[450px] md:h-[600px] group border-4 border-white">
                <img
                  src={facilityImg}
                  alt="Industrial Facility"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-xs border border-white/50"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-primary font-black text-2xl leading-none">1997</p>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Established</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <span className="text-secondary font-black tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">
                <span className="w-8 h-1 bg-secondary rounded-full"></span> About BCR Innovations
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
                Setting the Standard in Manufacturing
              </h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light mb-10">
                <p>At BCR Innovations, we engineer state-of-the-art commercial kitchen and industrial refrigeration solutions. Our mission is to empower businesses with high-performance, sustainable, and reliable equipment that transforms daily operations.</p>
                <p>With over two decades of dedicated expertise, we blend cutting-edge manufacturing technology with precision engineering. We don't just build equipment—we build the reliable foundation your business needs to scale and succeed.</p>
              </div>
              <Link to="/about" className="text-primary font-bold text-lg group flex items-center hover:text-secondary transition-colors">
                Discover Our Heritage
                <span className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center ml-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Services / Core Offerings */}
      <section className="py-32 bg-gray-50 border-t border-gray-100 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-secondary font-black tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span> Core Offerings <span className="w-8 h-1 bg-secondary rounded-full"></span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Our Categories</h2>
            <p className="text-gray-500 text-lg">Explore our precision-engineered product lines designed for maximum efficiency and durability.</p>
          </motion.div>

          {loadingCats ? (
            <div className="text-center text-gray-500 py-10 animate-pulse font-medium text-lg">Loading categories...</div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            >
              {categories.map((cat) => (
                <motion.div variants={scaleIn} key={cat.id} className="h-full">
                  <Link
                    to={`/products?category=${cat.id}`}
                    className="bg-white rounded-[2rem] p-6 text-center hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 group border border-transparent hover:border-gray-100 flex flex-col items-center h-full hover:-translate-y-2"
                  >
                    <div className="w-full aspect-[4/3] mb-8 rounded-3xl overflow-hidden bg-gray-50 flex items-center justify-center relative">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <span className="text-gray-300 font-black text-6xl uppercase">{cat.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{cat.name}</h3>
                    <span className="text-sm font-bold bg-gray-50 text-gray-500 group-hover:bg-primary/5 group-hover:text-primary px-4 py-1.5 rounded-full transition-colors">{cat.count} Products</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-secondary font-black tracking-widest uppercase text-sm mb-4 block flex items-center gap-2">
                <span className="w-8 h-1 bg-secondary rounded-full"></span> Our Purpose
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Our Mission & Vision</h2>
              <p className="text-gray-300 text-xl mb-6 font-light leading-relaxed">
                To revolutionize the commercial kitchen industry by providing highly durable, energy-efficient, and meticulously crafted SS304 grade equipment that exceeds professional culinary standards.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                We believe that the heart of every great restaurant is its kitchen. That's why we focus on delivering ergonomic designs that enhance chef productivity while ensuring impeccable hygiene and safety.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6 text-center"
            >
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-2xl mb-2 text-white">Quality First</h4>
                <p className="text-sm text-gray-400 font-medium">100% SS304 Steel</p>
              </div>
              <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group mt-8">
                <div className="w-16 h-16 bg-secondary/20 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Building2 className="w-8 h-8" />
                </div>
                <h4 className="font-black text-2xl mb-2 text-white">Modern Tech</h4>
                <p className="text-sm text-gray-400 font-medium">Laser Cutting Precision</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <span className="text-secondary font-black tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span> Our Advantage <span className="w-8 h-1 bg-secondary rounded-full"></span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Why Choose BCR Innovations</h2>
            <p className="text-gray-500 text-lg">We engineer excellence into every unit, providing peace of mind for your critical operations.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: Award, title: "Unmatched Quality", desc: "Built with premium materials and rigorous testing to endure the toughest environments." },
              { icon: ShieldCheck, title: "Absolute Reliability", desc: "Consistent temperature control ensuring your products remain perfectly preserved." },
              { icon: Lightbulb, title: "Continuous Innovation", desc: "Integrating smart technology and energy-efficient designs to lower running costs." },
              { icon: Headset, title: "Dedicated Service", desc: "Global support network providing rapid response maintenance and expert technical advice." }
            ].map((feature, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="bg-gray-50 p-10 rounded-[2rem] hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200 hover:bg-white hover:-translate-y-2">
                <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-500 text-base leading-relaxed font-light">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-32 bg-gray-50 border-t border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <span className="text-secondary font-black tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
              <span className="w-8 h-1 bg-secondary rounded-full"></span> How It Works <span className="w-8 h-1 bg-secondary rounded-full"></span>
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Our Proven Process</h2>
            <p className="text-gray-500 text-lg">From initial concept to full installation, we partner with you every step of the way to build the perfect commercial kitchen.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative"
          >
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-200 z-0 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-secondary rounded-full"
              ></motion.div>
            </div>

            {[
              { icon: MessageSquare, title: "1. Consultation", desc: "We discuss your menu, space, and operational needs to understand your unique requirements." },
              { icon: PenTool, title: "2. Custom Design", desc: "Our engineers draft ergonomic layouts and specify the exact SS304 equipment required." },
              { icon: Factory, title: "3. Manufacturing", desc: "Precision fabrication using laser-cutting technology for maximum durability and hygiene." },
              { icon: Wrench, title: "4. Installation", desc: "Professional delivery, setup, and testing to ensure your kitchen is ready for service." }
            ].map((step, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-gray-100 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl group hover:border-secondary transition-colors duration-300">
                  <step.icon className="w-10 h-10 text-primary group-hover:text-secondary group-hover:scale-110 transition-all duration-300" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h4>
                <p className="text-gray-500 text-base px-2 font-light">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative pt-20 pb-32 bg-primary overflow-hidden mb-20">
        <div className="absolute -top-[500px] -right-[500px] w-[1000px] h-[1000px] bg-secondary/20 rounded-full blur-[120px] z-0 animate-pulse"></div>
        <div className="absolute -bottom-[500px] -left-[500px] w-[1000px] h-[1000px] bg-white/5 rounded-full blur-[120px] z-0"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.1] tracking-tight">Ready to Upgrade Your <br /><span className="text-secondary">Commercial Kitchen?</span></h2>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-light leading-relaxed">Get in touch with our experts today for a free consultation and customized quote tailored to your specific culinary needs.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="group inline-flex items-center justify-center gap-3 bg-secondary text-white hover:bg-white hover:text-primary rounded-full px-12 h-16 text-xl shadow-[0_0_20px_rgba(242,139,47,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all duration-300 font-bold overflow-hidden">
                Request a Free Quote <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/products" className="inline-flex items-center justify-center gap-3 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-12 h-16 text-xl transition-all duration-300 font-bold">
                Browse Equipment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
