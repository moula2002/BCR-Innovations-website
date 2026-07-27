import { Award, ShieldCheck, Target, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import aboutImg from '../assets/images/about-hero-new.png';
import chefImg from '../assets/images/facility-man.png';

export default function About() {
  return (
    <div className="w-full">
      <div className="relative bg-gray-900 pt-32 pb-24 px-6 text-center overflow-hidden md:pt-40">
        <div className="absolute inset-0 z-0">
          <img
            src={aboutImg}
            alt="About BCR Innovations"
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
        </div>
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            About BCR Innovations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto text-xl"
          >
            Pioneering the future of commercial kitchen manufacturing.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Company Profile</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                BCR Innovations is a globally recognized leader in providing high-quality commercial kitchen equipment, stainless steel fabrication, and culinary solutions. Established with a vision to streamline complex food service operations, we have consistently delivered excellence to restaurants, hotels, and cloud kitchens across the country.
              </p>
              <p>
                Our team of dedicated engineers, fabricators, and customer service professionals work around the clock to ensure that your kitchen never experiences downtime. We don't just supply equipment; we supply reliability.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"><Users className="w-6 h-6" /></div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">500+</h3>
              <p className="text-gray-500 text-sm">Global Clients</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4"><Target className="w-6 h-6" /></div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">20+</h3>
              <p className="text-gray-500 text-sm">Years Experience</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center col-span-2">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4"><Award className="w-6 h-6" /></div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">ISO 9001:2015</h3>
              <p className="text-gray-500 text-sm">Certified Quality Standards</p>
            </div>
          </motion.div>
        </div>

        {/* Legacy & Expertise Section */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white"
          >
            <img
              src={chefImg}
              alt="Our Professional Kitchens"
              className="w-full h-auto transition-transform duration-1000 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl max-w-xs border border-white/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-primary font-black text-xl leading-none">1997</p>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">Established</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">A Legacy of Culinary Excellence</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Since our establishment in 1997, BCR Innovations has been at the forefront of the commercial kitchen industry. Our journey began with a simple mission: to empower chefs and culinary professionals with the most reliable, efficient, and innovative equipment available.
              </p>
              <p>
                Decades later, we continue to honor that commitment. Every piece of machinery, every stainless steel fabrication, and every custom solution we design is crafted with the needs of the modern kitchen in mind. We build kitchens that work as hard as you do.
              </p>
            </div>
            <div className="mt-8">
              <a href="/products" className="inline-block px-8 py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:bg-primary/90 transition-all hover:-translate-y-1">
                Explore Our Solutions
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 text-white rounded-3xl p-12 text-center"
        >
          <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">Certifications & Quality Standards</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Quality is not just a buzzword for us; it's the foundation of everything we do. BCR Innovations strictly adheres to international quality and safety standards. All our products undergo rigorous testing before they reach your facility.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <span className="px-6 py-2 bg-white/10 rounded-full border border-white/20">ISO 9001:2015</span>
            <span className="px-6 py-2 bg-white/10 rounded-full border border-white/20">CE Certified</span>
            <span className="px-6 py-2 bg-white/10 rounded-full border border-white/20">RoHS Compliant</span>
            <span className="px-6 py-2 bg-white/10 rounded-full border border-white/20">OSHA Standard</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
