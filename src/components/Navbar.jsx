import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Settings, LogOut, LayoutDashboard, User, Home } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-xl border-b border-purple-100 py-3 shadow-sm" : "bg-transparent py-6"
    }`}>
      <div className="flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-black italic text-[#1e1b4b] tracking-tighter z-[110]">
          TaxPal
        </Link>
        
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex gap-10 text-[11px] font-black text-slate-500 tracking-[0.2em] uppercase">
            {navLinks.map((link) => (
              <a key={link.name} href={link.path} className="hover:text-[#9333ea] transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#9333ea] transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 border-l border-purple-100 pl-8">
            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate('/login')} className="text-[#1e1b4b] text-[13px] font-black uppercase tracking-widest hover:text-[#9333ea] transition-colors px-4">
                  Sign In
                </button>
                <button onClick={() => navigate('/register')} className="bg-[#9333ea] text-white px-7 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-purple-100 hover:bg-[#7c2dd3] hover:-translate-y-0.5 transition-all">
                  Get Started
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all shadow-sm group">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#9333ea] font-black group-hover:bg-[#9333ea] group-hover:text-white transition-colors">
                    JD
                  </div>
                  <span className="text-sm font-black text-[#1e1b4b]">Alex Morgan</span>
                  <ChevronDown size={14} className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-purple-50 p-3 z-[120]">
                      <div className="px-5 py-4 border-b border-slate-50 mb-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Freelancer Account</p>
                        <p className="text-sm font-black text-[#1e1b4b] truncate">alex.m@taxpal.com</p>
                      </div>
                      <div className="space-y-1">
                        <DropdownItem onClick={() => navigate('/dashboard')} icon={<LayoutDashboard size={18}/>} label="Dashboard" />
                        <DropdownItem onClick={() => navigate('/settings')} icon={<Settings size={18}/>} label="Settings" />
                        <div className="my-2 border-t border-slate-50" />
                        <DropdownItem onClick={() => setIsLoggedIn(false)} icon={<LogOut size={18}/>} label="Sign Out" variant="danger" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <button className="lg:hidden p-3 rounded-2xl bg-purple-50 text-[#9333ea] transition-all z-[110]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="fixed inset-0 bg-[#1e1b4b]/40 backdrop-blur-sm lg:hidden z-[100]" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white lg:hidden z-[105] shadow-2xl flex flex-col p-8">
              <div className="mt-20 flex flex-col gap-6 flex-1">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.path} className="text-3xl font-black text-[#1e1b4b] italic hover:text-[#9333ea] transition-colors">{link.name}</a>
                ))}
              </div>
              <div className="mt-auto space-y-3">
                {isLoggedIn ? (
                  <>
                    <button onClick={() => navigate('/dashboard')} className="w-full flex items-center justify-center gap-3 bg-purple-50 text-[#9333ea] py-4 rounded-2xl font-black uppercase tracking-widest text-xs"><LayoutDashboard size={18}/> Dashboard</button>
                    <button onClick={() => setIsLoggedIn(false)} className="w-full text-red-500 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border border-red-50">Sign Out</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate('/login')} className="w-full text-[#1e1b4b] py-5 rounded-2xl font-black uppercase tracking-widest text-xs border border-purple-100">Sign In</button>
                    <button onClick={() => navigate('/register')} className="w-full bg-[#9333ea] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-purple-100">Get Started</button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

const DropdownItem = ({ icon, label, onClick, variant = "default" }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-black rounded-2xl transition-all ${
    variant === "danger" ? "text-red-500 hover:bg-red-50" : "text-slate-600 hover:bg-purple-50 hover:text-[#9333ea]"
  }`}>
    {icon} {label}
  </button>
);