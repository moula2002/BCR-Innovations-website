import { useState, useEffect, useMemo } from 'react';
import { 
  Briefcase, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  X, 
  FileText, 
  Users, 
  Award, 
  Zap, 
  HeartHandshake,
  Search,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';

const sampleJobs = [
  {
    _id: 'sample-1',
    title: 'Senior SS304 Sheet Metal Fabricator',
    department: 'Manufacturing',
    location: 'Bengaluru, India',
    type: 'Full Time',
    description: 'Expert in TIG welding, laser cutting precision, and stainless steel fabrication for commercial kitchen equipment.'
  },
  {
    _id: 'sample-2',
    title: 'CAD Design Engineer (Kitchen Systems)',
    department: 'Engineering',
    location: 'Bengaluru, India',
    type: 'Full Time',
    description: 'Responsible for 3D modeling, sheet metal layouts, and CAD designs for commercial refrigeration & display cabinets.'
  },
  {
    _id: 'sample-3',
    title: 'Industrial Refrigeration Service Specialist',
    department: 'Operations',
    location: 'Bengaluru, India',
    type: 'Full Time',
    description: 'Specialist in commercial display counter cooling systems, compressor diagnostics, and climate control automation.'
  },
  {
    _id: 'sample-4',
    title: 'Commercial Equipment Sales Executive',
    department: 'Sales',
    location: 'Bengaluru, India',
    type: 'Full Time',
    description: 'Drive business growth across hotel, restaurant, and bakery client accounts for custom commercial kitchen solutions.'
  }
];

const cultureBenefits = [
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    desc: 'Work with laser-cutting machinery, CAD engineering, and food-grade stainless steel fabrication technology.'
  },
  {
    icon: Award,
    title: 'Career Growth & Upskilling',
    desc: 'Structured professional development, technical certifications, and clear advancement opportunities.'
  },
  {
    icon: Users,
    title: 'Collaborative Environment',
    desc: 'A supportive, team-first culture where craftsmanship, innovation, and fresh ideas are celebrated daily.'
  },
  {
    icon: HeartHandshake,
    title: 'Competitive Compensation',
    desc: 'Industry-leading salary packages, performance bonuses, comprehensive health benefits, and paid time off.'
  }
];

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Application Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    note: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const res = await api.get('/careers');
        if (res.data.data && res.data.data.length > 0) {
          setJobs(res.data.data);
        } else {
          setJobs(sampleJobs);
        }
      } catch (err) {
        console.error('Failed to load careers:', err);
        setJobs(sampleJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const departments = useMemo(() => {
    const deps = new Set(jobs.map(j => j.department).filter(Boolean));
    return ['All', ...Array.from(deps)];
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesDept = selectedDepartment === 'All' || job.department === selectedDepartment;
      const matchesQuery = 
        job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesQuery;
    });
  }, [jobs, selectedDepartment, searchQuery]);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      name: applyForm.name,
      email: applyForm.email,
      phone: applyForm.phone,
      experience: applyForm.experience,
      note: applyForm.note,
      jobTitle: selectedJob?.title || 'General Position',
      department: selectedJob?.department || 'General',
      type: 'career'
    };

    try {
      // 1. Try Backend API (/api/careers/apply) via Axios
      try {
        await api.post('/careers/apply', payload);
      } catch (err) {
        console.warn('Backend API /careers/apply warning, attempting Vercel endpoint:', err);
      }

      // 2. Try Vercel Serverless Function (/api/contact)
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            firstName: applyForm.name,
            subject: `[Job Application] ${selectedJob?.title || 'General Position'}`,
            message: applyForm.note
          })
        });
      } catch (err) {
        console.warn('Vercel serverless mail fallback:', err);
      }
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const closeModal = () => {
    setSelectedJob(null);
    setSubmitted(false);
    setApplyForm({ name: '', email: '', phone: '', experience: '', note: '' });
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen font-sans text-gray-800 pb-24">
      {/* Hero Section */}
      <div className="bg-[#0277bd] text-white pt-28 pb-14 md:pt-36 md:pb-16 shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-transparent pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/25 text-xs font-extrabold uppercase tracking-widest text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-white/90" /> We're Hiring • Shape The Future With Us
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Build Your Career at BCR Innovations
            </h1>

            <p className="text-white/85 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Join our team of engineers, fabricators, designers, and commercial kitchen specialists building world-class industrial equipment and stainless steel solutions.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="#open-positions"
                className="px-7 py-3 bg-white text-[#0277bd] hover:bg-slate-100 rounded-full font-extrabold text-sm transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
              >
                Explore Openings <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>



      {/* Open Positions Section */}
      <div id="open-positions" className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-3"
        >
          <span className="text-[#0277bd] text-xs font-black uppercase tracking-widest block">Current Opportunities</span>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Open Positions</h2>
          <p className="text-gray-500 text-base md:text-lg">Explore career opportunities across engineering, manufacturing, operations, and sales.</p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80 flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search job title or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm outline-none border border-slate-200 focus:border-[#0277bd] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDepartment === dept
                    ? 'bg-[#0277bd] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job Openings List */}
        <div className="space-y-4">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-8 border border-slate-200 space-y-4">
                  <div className="h-6 w-1/3 bg-slate-200 rounded-lg"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded-md"></div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-300 space-y-4">
              <Briefcase className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-gray-800">No positions found</h3>
              <p className="text-gray-500 text-sm">Try modifying your search or department filter.</p>
              <button
                onClick={() => { setSelectedDepartment('All'); setSearchQuery(''); }}
                className="px-5 py-2 bg-[#0277bd] text-white text-xs font-bold rounded-full hover:bg-[#01579b]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                key={job._id || index}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#0277bd] hover:shadow-xl transition-all duration-300 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-50 text-[#0277bd] text-xs font-extrabold rounded-full border border-blue-100">
                      {job.department || 'General'}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">
                      {job.type || 'Full Time'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#0277bd] transition-colors">
                    {job.title}
                  </h3>

                  {job.description && (
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {job.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0277bd]" /> {job.location || 'Bengaluru, India'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#0277bd]" /> BCR Innovations Facility
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto shrink-0">
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="w-full md:w-auto px-7 py-3.5 bg-[#0277bd] hover:bg-[#01579b] text-white rounded-2xl font-bold text-sm transition-all shadow-md shadow-blue-600/20 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Apply Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Interactive Job Application Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative overflow-hidden"
            >
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900">Application Submitted!</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Thank you for applying for <span className="font-bold text-[#0277bd]">{selectedJob.title}</span>. Our recruitment team will review your application and respond within 48 hours.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-4 px-8 py-3 bg-[#0277bd] text-white font-bold text-sm rounded-xl hover:bg-[#01579b]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#0277bd] uppercase tracking-wider block mb-1">Applying for</span>
                    <h3 className="text-xl font-extrabold text-gray-900">{selectedJob.title}</h3>
                    <p className="text-xs text-slate-500">{selectedJob.department} • {selectedJob.location}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1 block">Full Name</label>
                      <input
                        type="text"
                        required
                        value={applyForm.name}
                        onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0277bd] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-600 mb-1 block">Email</label>
                        <input
                          type="email"
                          required
                          value={applyForm.email}
                          onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                          placeholder="rahul@example.com"
                          className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0277bd] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 mb-1 block">Phone</label>
                        <input
                          type="tel"
                          required
                          value={applyForm.phone}
                          onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                          placeholder="+91 9876543210"
                          className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0277bd] focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1 block">Total Experience (Years)</label>
                      <input
                        type="text"
                        required
                        value={applyForm.experience}
                        onChange={(e) => setApplyForm({ ...applyForm, experience: e.target.value })}
                        placeholder="e.g. 3 Years"
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0277bd] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 mb-1 block">Cover Note / Resume Link</label>
                      <textarea
                        rows="3"
                        value={applyForm.note}
                        onChange={(e) => setApplyForm({ ...applyForm, note: e.target.value })}
                        placeholder="Briefly describe your experience or paste a Google Drive / LinkedIn link to your resume..."
                        className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#0277bd] focus:bg-white transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-5 py-2.5 rounded-xl text-slate-600 text-sm font-semibold hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-7 py-2.5 bg-[#0277bd] text-white text-sm font-bold rounded-xl hover:bg-[#01579b] transition-all flex items-center gap-2 shadow-md"
                    >
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
