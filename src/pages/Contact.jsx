import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2, AlertCircle, Package } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';
import { getImageUrl } from '../utils';

export default function Contact() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [searchParams] = useSearchParams();
  const productName = searchParams.get('product');
  const productImage = searchParams.get('image');

  useEffect(() => {
    if (productName) {
      setValue('subject', `Inquiry regarding ${productName}`);
      setValue('message', `Hello,\n\nI am interested in learning more about the ${productName}. Please provide a quote and further details.\n\nThank you.`);
    }
  }, [productName, setValue]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    const payload = {
      ...data,
      product: productName || undefined,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[#0277bd] text-white pt-32 pb-20 px-6 text-center md:pt-40"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-white/80 max-w-2xl mx-auto">Get in touch with our team for inquiries, support, or partnership opportunities.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">

        {/* Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Headquarters</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0277bd]/10 flex items-center justify-center text-[#0277bd] shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600 mt-1">No. 860/A, Ground Floor, Narendra Chambers,<br />Opp. Modi Eye Hospital, West of Chord Road,<br />2nd Stage, Rajajinagar, Bengaluru - 560086</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0277bd]/10 flex items-center justify-center text-[#0277bd] shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+91 98440 13768</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#0277bd]/10 flex items-center justify-center text-[#0277bd] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">bcrinnovations2026@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src="https://maps.google.com/maps?q=Narendra%20Chambers,%20Rajajinagar,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        {/* Email Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

          {/* Selected Product Card Banner inside Form */}
          {(productName || productImage) && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#0277bd]/5 to-slate-50 border border-[#0277bd]/20 flex items-center gap-4 shadow-sm">
              {productImage ? (
                <div className="w-16 h-16 rounded-xl bg-white p-2 shrink-0 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <img src={getImageUrl(productImage)} alt={productName || 'Product'} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-[#0277bd]/10 text-[#0277bd] flex items-center justify-center shrink-0">
                  <Package className="w-7 h-7" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#0277bd]/10 text-[#0277bd] text-[11px] font-bold uppercase tracking-wider mb-1">
                  Inquiring Product
                </div>
                <h4 className="font-bold text-gray-900 truncate text-base md:text-lg">{productName || 'Selected Product'}</h4>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">First Name *</label>
                <input
                  {...register("firstName", { required: true })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Last Name *</label>
                <input
                  {...register("lastName", { required: true })}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address *</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Subject</label>
              <input
                {...register("subject")}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Message *</label>
              <textarea
                {...register("message", { required: true })}
                rows="5"
                className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-gray-50 resize-none`}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>
              ) : (
                <><Send className="w-5 h-5" /> Send Message</>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-xl border border-green-100">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p>Thank you for contacting us! We'll be in touch shortly.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>Something went wrong. Please try again later.</p>
              </div>
            )}
          </form>
        </motion.div>

      </div>
    </div>
  );
}
