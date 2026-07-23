import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function Contact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form submitted:", data);
    alert("Thank you for contacting us! We'll be in touch shortly.");
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gray-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Get in touch with our team for inquiries, support, or partnership opportunities.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        
        {/* Contact Info & Map */}
        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Headquarters</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Address</h4>
                  <p className="text-gray-600 mt-1">No. 860/A, Ground Floor, Narendra Chambers,<br />Opp. Modi Eye Hospital, West of Chord Road,<br />2nd Stage, Rajajinagar, Bengaluru - 560086</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Phone</h4>
                  <p className="text-gray-600 mt-1">+1 (234) 567-890</p>
                  <p className="text-gray-600">+1 (234) 567-891 (Support)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Email</h4>
                  <p className="text-gray-600 mt-1">info@bcrinnovations.com</p>
                  <p className="text-gray-600">sales@bcrinnovations.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="h-[300px] w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280010992!2d-74.14448737213876!3d40.69763123336688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1693425316314!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Email Inquiry Form */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
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

            <button type="submit" className="w-full py-4 bg-secondary hover:bg-secondary-dark text-white rounded-xl font-bold text-lg transition-colors shadow-lg flex items-center justify-center gap-2">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
