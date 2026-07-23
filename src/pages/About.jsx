import { Award, ShieldCheck, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="w-full">
      <div className="bg-primary/5 py-20 px-6 text-center border-b border-primary/10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About BCR Innovations</h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">Pioneering the future of industrial supply and automation.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Company Profile</h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                BCR Innovations is a globally recognized leader in providing high-quality industrial supplies, heavy machinery, and cutting-edge automation solutions. Established with a vision to streamline complex manufacturing processes, we have consistently delivered excellence across multiple continents.
              </p>
              <p>
                Our team of dedicated engineers, supply chain experts, and customer service professionals work around the clock to ensure that your business never experiences downtime. We don't just supply products; we supply reliability.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
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
          </div>
        </div>

        <div className="bg-gray-900 text-white rounded-3xl p-12 text-center">
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
        </div>
      </div>
    </div>
  );
}
