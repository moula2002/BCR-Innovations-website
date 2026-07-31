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
      try {
        await api.post('/contacts', {
          ...payload,
          skipEmail: true
        });
      } catch (dbError) {
        console.error("Error saving contact to database:", dbError);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const emailData = await response.json();

      if (response.ok && emailData.success) {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#0277bd] text-white pt-32 pb-20 px-6 text-center md:pt-40 relative overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none transform -translate-y-1/2"></div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/25 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs">
            <Mail className="w-3.5 h-3.5 text-white/90" /> We're Here to Help
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Contact Us
          </h1>
          <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            Get in touch with our team for inquiries, support, or partnership opportunities. We respond to all messages promptly.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 md:gap-16">
        {/* Contact Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Our Headquarters</h2>
            <div className="space-y-6">
              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-[#0277bd]/30 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0277bd] shrink-0 group-hover:bg-[#0277bd] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Address</h4>
                  <p className="text-gray-500 mt-1 text-sm leading-relaxed font-medium">No. 860/A, Ground Floor, Narendra Chambers,<br />Opp. Modi Eye Hospital, West of Chord Road,<br />2nd Stage, Rajajinagar, Bengaluru - 560086</p>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-[#0277bd]/30 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0277bd] shrink-0 group-hover:bg-[#0277bd] group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Phone</h4>
                  <a href="tel:+919844013768" className="text-gray-500 hover:text-[#0277bd] mt-1 text-sm font-medium block transition-colors">+91 91138 23660</a>
                </div>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all hover:shadow-md hover:border-[#0277bd]/30 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0277bd] shrink-0 group-hover:bg-[#0277bd] group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Email</h4>
                  <a href="mailto:bcrinnovations07@gmail.com" className="text-gray-500 hover:text-[#0277bd] mt-1 text-sm font-medium block transition-colors break-all">bcrinnovations07@gmail.com</a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="h-[320px] w-full rounded-[24px] overflow-hidden shadow-lg border border-slate-200/80 group relative">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
            <iframe
              title="BCR Innovations Location"
              src="https://maps.google.com/maps?q=Narendra%20Chambers,%20Rajajinagar,%20Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[20%] contrast-125"
            ></iframe>
          </div>
        </motion.div>

        {/* Email Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-slate-200/80 relative overflow-hidden"
        >
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#0277bd]/5 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight relative z-10">Send us a Message</h2>

          {/* Selected Product Card Banner */}
          {(productName || productImage) && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-50/90 via-slate-50/90 to-blue-50/40 border-l-4 border-[#0277bd] border-y border-r border-slate-200/60 shadow-sm flex items-center gap-4 relative z-10"
            >
              {productImage ? (
                <div className="w-14 h-14 rounded-xl bg-white p-2 shrink-0 border border-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
                  <img src={getImageUrl(productImage)} alt={productName || 'Product'} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-[#0277bd] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Package className="w-6 h-6" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 text-[#0277bd] text-[10px] font-extrabold uppercase tracking-widest mb-1">
                  Product Inquiry
                </div>
                <h4 className="font-bold text-gray-900 truncate text-sm md:text-base">{productName || 'Selected Product'}</h4>
              </div>
            </motion.div>
          )}

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="show"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 relative z-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">First Name *</label>
                <input
                  {...register("firstName", { required: true })}
                  className={`w-full px-4 py-3.5 rounded-xl border ${errors.firstName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'} focus:border-[#0277bd] focus:bg-white focus:ring-4 focus:ring-[#0277bd]/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-xs hover:border-gray-300`}
                  placeholder="John"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Last Name *</label>
                <input
                  {...register("lastName", { required: true })}
                  className={`w-full px-4 py-3.5 rounded-xl border ${errors.lastName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'} focus:border-[#0277bd] focus:bg-white focus:ring-4 focus:ring-[#0277bd]/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-xs hover:border-gray-300`}
                  placeholder="Doe"
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address *</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'} focus:border-[#0277bd] focus:bg-white focus:ring-4 focus:ring-[#0277bd]/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-xs hover:border-gray-300`}
                placeholder="john@example.com"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Subject</label>
              <input
                {...register("subject")}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:border-[#0277bd] focus:bg-white focus:ring-4 focus:ring-[#0277bd]/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-xs hover:border-gray-300"
                placeholder="How can we help you?"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Message *</label>
              <textarea
                {...register("message", { required: true })}
                rows="5"
                className={`w-full px-4 py-3.5 rounded-xl border ${errors.message ? 'border-red-400 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'} focus:border-[#0277bd] focus:bg-white focus:ring-4 focus:ring-[#0277bd]/10 outline-none transition-all text-sm font-medium text-gray-800 placeholder:text-gray-400 shadow-xs hover:border-gray-300 resize-none`}
                placeholder="Write your message here..."
              ></textarea>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 mt-2 bg-[#0277bd] hover:bg-[#01579b] text-white rounded-xl font-bold text-sm md:text-base transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed border border-blue-600/30"
            >
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Sending Message...</>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-200 shadow-sm mt-4">
                <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
                <p className="text-sm font-semibold">Thank you for contacting us! We'll be in touch shortly.</p>
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-700 bg-red-50 p-4 rounded-xl border border-red-200 shadow-sm mt-4">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                <p className="text-sm font-semibold">Something went wrong. Please try again later.</p>
              </motion.div>
            )}
          </motion.form>
        </motion.div>

      </div>
    </div>
  );
}

