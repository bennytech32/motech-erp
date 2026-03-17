import Link from 'next/link';
import { 
  CarFront, ArrowRight, PhoneCall, MapPin, Mail, Send, CheckCircle2 
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/20">
                <CarFront size={28} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MoTech-i</span>
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</Link>
              <Link href="/book" className="text-slate-600 hover:text-blue-600 font-medium transition">Book Now</Link>
              <Link href="/parts" className="text-slate-600 hover:text-blue-600 font-medium transition">Spare Parts</Link>
              <Link href="/contact" className="text-blue-600 font-bold border-b-2 border-blue-600 transition">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/client-portal" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition shadow-md flex items-center gap-2">
                Client Portal <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <div className="bg-slate-900 text-white pt-40 pb-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6">Contact Us</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">We are here to answer any questions you may have about our services, spare parts availability, or your vehicle's status.</p>
      </div>

      {/* 2. CONTACT SECTION (Iliyohamishwa kutoka Home Page na Kuboreshwa) */}
      <section className="py-24 bg-slate-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-200">
            
            {/* Contact Form */}
            <div className="flex-1 p-10 lg:p-16">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Send Us A Message</h2>
              <p className="text-slate-600 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Your Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="john@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Subject</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="e.g. Enquiry about Spare Parts" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors shadow-lg flex items-center justify-center w-full md:w-auto gap-2">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
            
            {/* Contact Info Sidebar */}
            <div className="w-full lg:w-[450px] bg-blue-600 p-10 lg:p-16 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-blue-300 mt-1 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-lg">Our Location</h4>
                      <p className="text-blue-100 mt-1">123 Innovation Drive,<br/>Tech District, Dar es Salaam, TZ</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <PhoneCall className="text-blue-300 mt-1 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-lg">Phone Number</h4>
                      <p className="text-blue-100 mt-1">+255 123 456 789<br/>+255 987 654 321</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="text-blue-300 mt-1 shrink-0" size={24} />
                    <div>
                      <h4 className="font-bold text-lg">Email Address</h4>
                      <p className="text-blue-100 mt-1">info@motech-i.co.tz<br/>support@motech-i.co.tz</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-blue-500/50">
                <h4 className="font-bold text-lg mb-4">Emergency Support</h4>
                <p className="text-blue-100 text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-300"/> 24/7 Breakdown Assistance Available
                </p>
                <Link href="/book" className="mt-4 bg-white text-blue-600 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors block text-center shadow-md w-full">
                  Report Emergency
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <CarFront size={32} className="text-blue-500" />
                <span className="text-2xl font-extrabold text-white tracking-tight">MoTech-i</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Redefining the auto repair industry through transparency, expertise, and digital innovation. Your car is in safe hands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
                <li><Link href="/services" className="hover:text-blue-400 transition">Our Services</Link></li>
                <li><Link href="/book" className="hover:text-blue-400 transition">Book Appointment</Link></li>
                <li><Link href="/login" className="hover:text-blue-400 transition">Staff Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Working Hours</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Mon - Fri</span><span className="text-white">08:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Saturday</span><span className="text-white">09:00 AM - 03:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span><span className="text-red-400 font-medium">Emergencies Only</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} SirMoshi Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}