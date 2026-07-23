import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { Check, ArrowLeft, Send, PhoneCall } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Link to="/products" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  const onSubmit = (data) => {
    console.log("Inquiry submitted for:", product.name, data);
    setFormSubmitted(true);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden border border-gray-200 relative group">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Thumbnail Gallery (Mock) */}
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${i === 1 ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}>
                <img src={product.image} alt="Thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-primary font-bold tracking-wider text-sm uppercase">
            {categories.find(c => c.id === product.category)?.name}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
          <div className="text-xl text-gray-500 mb-6 font-medium">Brand: <span className="text-gray-900">{product.brands}</span></div>
          
          <div className="w-full h-px bg-gray-200 mb-8"></div>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <h3 className="font-bold text-xl mb-4">Key Features</h3>
          <ul className="space-y-3 mb-10">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700">
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-auto bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Pricing</div>
              <div className="text-2xl font-bold text-gray-900">{product.price}</div>
            </div>
            <a href="#inquiry-form" className="w-full sm:w-auto px-8 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-center transition-colors shadow-lg flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Request Quote
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Form Section */}
      <section id="inquiry-form" className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto scroll-mt-24">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Interested in this product?</h2>
          <p className="text-gray-600">Fill out the form below to request a quote or bulk supply pricing for <strong className="text-gray-900">{product.name}</strong>.</p>
        </div>

        {formSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h3>
            <p className="text-green-700 mb-6">Thank you for your inquiry. Our sales team will get back to you within 24 hours.</p>
            <button onClick={() => setFormSubmitted(false)} className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name *</label>
                <input 
                  {...register("name", { required: true })} 
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white`}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email Address *</label>
                <input 
                  type="email"
                  {...register("email", { required: true })} 
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white`}
                  placeholder="john@company.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number *</label>
                <input 
                  {...register("phone", { required: true })} 
                  className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input 
                  {...register("company")} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="Acme Corp"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Inquiry Type *</label>
              <select 
                {...register("type", { required: true })} 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white"
              >
                <option value="quote">Request a Quote</option>
                <option value="bulk">Bulk Supply Inquiry</option>
                <option value="info">General Product Info</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message / Requirements</label>
              <textarea 
                {...register("message")} 
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                placeholder="Please specify quantity, delivery location, or any specific requirements..."
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Submit Inquiry
            </button>
            <p className="text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1">
              Need immediate assistance? <PhoneCall className="w-3 h-3 ml-1" /> <a href="tel:+1234567890" className="text-primary hover:underline font-medium">+1 (234) 567-890</a>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}
