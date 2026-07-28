import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-screen pb-24">
      <div className="bg-[#0277bd] text-white pt-32 pb-20 px-6 text-center shadow-md relative overflow-hidden md:pt-40">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 relative z-10">Terms of Service</h1>
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
            <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
            <p className="leading-relaxed">
              By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">2. Use License</h2>
            <p className="leading-relaxed">
              Permission is granted to temporarily download one copy of the materials (information or software) on BCR Innovations's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="leading-relaxed">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display.</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">3. Disclaimer</h2>
            <p className="leading-relaxed">
              The materials on BCR Innovations's website are provided on an 'as is' basis. BCR Innovations makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">4. Limitations</h2>
            <p className="leading-relaxed">
              In no event shall BCR Innovations or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on BCR Innovations's website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">5. Contact</h2>
            <p className="leading-relaxed">
              If you have any queries regarding any of our terms, please contact us.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
