import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-24">
      <div className="bg-[#0277bd] text-white pt-32 pb-20 px-6 text-center shadow-md relative overflow-hidden md:pt-40">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10">Privacy Policy</h1>
        <p className="text-white/80 max-w-2xl mx-auto relative z-10">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 space-y-8 text-gray-700"
        >
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
            <p className="leading-relaxed">
              At BCR Innovations, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">2. Data We Collect</h2>
            <p className="leading-relaxed">
              We may collect, use, store, and transfer different kinds of personal data about you, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Data:</strong> First name, last name.</li>
              <li><strong>Contact Data:</strong> Email address, telephone numbers.</li>
              <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Data</h2>
            <p className="leading-relaxed">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your inquiries and support requests.</li>
              <li>To manage job applications submitted via our Careers page.</li>
              <li>To improve our website, products, services, marketing, and customer relationships.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">4. Data Security</h2>
            <p className="leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees and agents who have a business need to know.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this privacy policy or our privacy practices, please contact us at <strong>bcrinnovations2026@gmail.com</strong>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
