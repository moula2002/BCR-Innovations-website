import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

const faqs = [
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship our products globally. We have partnered with leading logistics providers to ensure safe and timely delivery to over 50 countries worldwide."
  },
  {
    question: "How can I request a custom bulk order?",
    answer: "You can request a custom bulk order by visiting the specific Product Details page and filling out the Inquiry Form, or by contacting our sales team directly at bcrinnovations2026@gmail.com."
  },
  {
    question: "Are your products covered by a warranty?",
    answer: "Absolutely. All our heavy machinery and automation systems come with a standard 2-year manufacturer's warranty. Extended warranty options are also available upon request."
  },
  {
    question: "What are your payment terms?",
    answer: "For standard orders, we accept all major credit cards and wire transfers. For bulk and custom orders, we typically require a 30% advance payment with the balance due upon shipping."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="w-full bg-gray-50 min-h-screen pt-32 pb-20 md:pt-40">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-lg">Find answers to common questions about our products and services.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              key={index} 
              className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-primary shadow-md' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className={`font-bold text-lg ${openIndex === index ? 'text-primary' : 'text-gray-900'}`}>{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
