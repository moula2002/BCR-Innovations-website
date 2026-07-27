import { useState, useEffect } from 'react';
import { Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const res = await api.get('/careers');
        setJobs(res.data.data);
      } catch (err) {
        console.error('Failed to load careers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className="w-full">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900 text-white pt-32 pb-20 px-6 text-center md:pt-40"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Join Our Team</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Help us shape the future of the industrial supply chain. We are always looking for passionate, driven individuals to join the BCR family.</p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Open Positions</h2>
        
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading open positions...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">There are currently no open positions. Please check back later.</div>
          ) : jobs.map((job, index) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              key={job._id || index}  
              className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors shrink-0">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 font-medium">
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.department}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.location}</span>
                    <span className="bg-gray-100 px-3 py-1 rounded-full">{job.type}</span>
                  </div>
                </div>
              </div>
              <button className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors flex items-center justify-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
