import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phoneNumber = "1234567890"; // Replace with actual number
  const message = encodeURIComponent("Hello, I have an inquiry about your products.");

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)] hover:-translate-y-1 transition-all flex items-center justify-center group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-white text-gray-800 px-4 py-2 rounded-xl text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
}
