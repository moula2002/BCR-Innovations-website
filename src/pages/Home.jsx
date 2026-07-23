import { ArrowRight, ShieldCheck, Award, Lightbulb, Headset, Building2, Package, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              WHERE INNOVATION MEETS PRESERVATION
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl animate-fade-in-up animation-delay-200">
              Sustainable, High-Performance Manufacturing & Refrigeration Solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <Link to="/products" className="inline-flex items-center justify-center gap-2 bg-secondary text-white hover:bg-secondary-dark rounded-full px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all w-full sm:w-auto font-medium">
                View Products <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-10 h-14 text-lg transition-all w-full sm:w-auto font-medium">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section className="relative z-20 -mt-12 mx-4 sm:mx-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center divide-x divide-gray-100">
            <div className="px-4">
              <p className="text-3xl md:text-5xl font-bold text-primary mb-1 animate-fade-in-up">1000+</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Trusted Clients</p>
            </div>
            <div className="px-4">
              <p className="text-3xl md:text-5xl font-bold text-primary mb-1 animate-fade-in-up animation-delay-200">3</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Manufacturing Facilities</p>
            </div>
            <div className="px-4">
              <p className="text-3xl md:text-5xl font-bold text-primary mb-1 animate-fade-in-up animation-delay-400">27</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Years of Experience</p>
            </div>
            <div className="px-4">
              <p className="text-3xl md:text-5xl font-bold text-primary mb-1 animate-fade-in-up animation-delay-600">ISO</p>
              <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-widest">Certified Quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 w-full relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[550px] group">
                <img 
                  src="https://images.unsplash.com/photo-1565043666747-69f6646db940?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Industrial Facility" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-6 left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-gray-100">
                  <p className="text-primary font-bold text-2xl mb-1">Pioneering</p>
                  <p className="text-gray-500 text-sm">Industrial Solutions Since 1997</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">About BCR Innovations</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">Setting the Standard in Manufacturing & Fabrication</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-light mb-8">
                <p>BCR Innovations is a premier manufacturer of professional industrial solutions. Combining global engineering standards with deep local expertise, we deliver innovative products tailored to the unique demands of multiple sectors.</p>
                <p>Our commitment to high-quality manufacturing and precision drives our design process, ensuring our products perform flawlessly in the most demanding climates while significantly reducing operational costs for your business.</p>
              </div>
              <Link to="/about" className="text-secondary font-bold text-lg group flex items-center hover:text-secondary-dark transition-colors">
                Discover Our Heritage
                <span className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center ml-4 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services / New Launches Style */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">Core Offerings</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Key Services</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="h-64 mb-8 rounded-2xl overflow-hidden bg-gray-50">
                <img src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Fabrication" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Manufacturing & Fabrication</h3>
              <p className="text-gray-500">Precision steel fabrication panels customized to specifications.</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="h-64 mb-8 rounded-2xl overflow-hidden bg-gray-50">
                <img src="https://images.unsplash.com/photo-1585888201206-cb8452e82f42?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Refrigeration" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Industrial Refrigeration</h3>
              <p className="text-gray-500">High-capacity units for optimal temperature control.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 group border border-gray-100">
              <div className="h-64 mb-8 rounded-2xl overflow-hidden bg-gray-50">
                <img src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Clean Room" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Clean Room & Furnitures</h3>
              <p className="text-gray-500">State-of-the-art clean room equipments and durable furniture.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-3 block">Our Advantage</span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BCR Innovations</h2>
            <p className="text-gray-500 text-lg">We engineer excellence into every unit, providing peace of mind for your critical operations.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unmatched Quality</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Built with premium materials and rigorous testing to endure the toughest environments.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Absolute Reliability</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Consistent temperature control ensuring your products remain perfectly preserved.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Continuous Innovation</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Integrating smart technology and energy-efficient designs to lower running costs.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-gray-200">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <Headset className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Service</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Global support network providing rapid response maintenance and expert technical advice.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
