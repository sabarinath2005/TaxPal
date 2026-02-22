import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Receipt, Wallet, PieChart, 
  FileText, Plus, X, Search, Trash2, Undo2,
  ChevronUp, ChevronDown, Settings, LogOut, Home, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [activePage, setActivePage] = useState('DASHBOARD');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taxRate, setTaxRate] = useState(25);
  const [newEntry, setNewEntry] = useState({ label: '', amount: '', group: 'EXPENSE' });

  // HOVER STATES
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [hoveredBudget, setHoveredBudget] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 1, date: "5/8/2025", label: "Consulting", group: "INCOME", flow: 1200 },
    { id: 2, date: "5/5/2025", label: "Software", group: "EXPENSE", flow: 240 },
    { id: 3, date: "5/1/2025", label: "Rent/Mortgage", group: "EXPENSE", flow: 1800 },
  ]);

  // UNDO STATE
  const [lastDeleted, setLastDeleted] = useState(null);
  const [showUndoToast, setShowUndoToast] = useState(false);

  // --- ACTIONS ---
  const handleLogout = () => navigate('/login');

  const exportToCSV = () => {
    const headers = ["Date,Label,Group,Amount"];
    const rows = transactions.map(t => `${t.date},"${t.label}",${t.group},${t.flow}`);
    const csvContent = headers.concat(rows).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `TaxPal_Export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const entry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      label: newEntry.label,
      group: newEntry.group,
      flow: parseFloat(newEntry.amount) || 0
    };
    setTransactions([entry, ...transactions]);
    setIsModalOpen(false);
    setNewEntry({ label: '', amount: '', group: 'EXPENSE' });
  };

  const handleDelete = (id) => {
    const itemToDelete = transactions.find(t => t.id === id);
    setLastDeleted(itemToDelete);
    setTransactions(transactions.filter(t => t.id !== id));
    setShowUndoToast(true);
  };

  const handleUndo = () => {
    if (lastDeleted) {
      setTransactions(prev => [lastDeleted, ...prev].sort((a, b) => b.id - a.id));
      setLastDeleted(null);
      setShowUndoToast(false);
    }
  };

  useEffect(() => {
    if (showUndoToast) {
      const timer = setTimeout(() => setShowUndoToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showUndoToast]);

  // --- LOGIC: CALCULATIONS ---
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => 
      t.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.group === "INCOME").reduce((s, t) => s + t.flow, 0);
    const expenses = transactions.filter(t => t.group === "EXPENSE").reduce((s, t) => s + t.flow, 0);
    const softwareExp = transactions.filter(t => t.label.toLowerCase().includes('software')).reduce((s, t) => s + t.flow, 0);
    const rentExp = transactions.filter(t => t.label.toLowerCase().includes('rent')).reduce((s, t) => s + t.flow, 0);
    
    const earnings = income - expenses;
    const liability = (earnings > 0) ? earnings * (taxRate / 100) : 0;
    return { income, expenses, earnings, liability, softwareExp, rentExp };
  }, [transactions, taxRate]);

  // CHART DATA ARRAY
  const chartData = [
    { label: "Jan", v1: 85, v2: 40, inc: "8,500", exp: "4,000" },
    { label: "Feb", v1: 65, v2: 35, inc: "6,800", exp: "3,200" },
    { label: "Mar", v1: 90, v2: 45, inc: "9,200", exp: "4,500" },
    { label: "Apr", v1: 75, v2: 42, inc: "7,500", exp: "4,200" },
    { label: "May", v1: 40, v2: 50, inc: "1,200", exp: "2,040" },
    { label: "Jun", v1: 15, v2: 10, inc: "1,500", exp: "1,000" },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fe] font-sans text-[#1e1b4b]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white p-8 hidden lg:flex flex-col sticky top-0 h-screen border-r border-slate-100">
        <div onClick={() => navigate('/')} className="text-3xl font-black italic mb-12 tracking-tighter cursor-pointer hover:text-purple-600 transition-colors">
          TaxPal
        </div>
        <nav className="space-y-3 flex-1">
          <button onClick={() => navigate('/')} className="w-full text-left outline-none group">
            <NavItem icon={<Home size={20}/>} label="HOME" active={false} />
          </button>
          <button onClick={() => setActivePage('DASHBOARD')} className="w-full text-left outline-none">
            <NavItem icon={<LayoutDashboard size={20}/>} label="DASHBOARD" active={activePage === 'DASHBOARD'} />
          </button>
          <NavItem icon={<Receipt size={20}/>} label="TRANSACTIONS" />
          <NavItem icon={<Wallet size={20}/>} label="BUDGETS" />
          <button onClick={() => setActivePage('TAXES')} className="w-full text-left outline-none">
            <NavItem icon={<PieChart size={20}/>} label="TAX ESTIMATOR" active={activePage === 'TAXES'} />
          </button>
          <NavItem icon={<FileText size={20}/>} label="REPORTS" />
        </nav>
        <div className="pt-8 border-t border-slate-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full border-2 border-purple-100 overflow-hidden bg-slate-100">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex Morgan" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-lg font-black tracking-tight text-[#1e1b4b]">Alex Morgan</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Freelancer</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#1e1b4b] shadow-sm hover:bg-slate-50 transition-all">
              <Settings size={14} className="text-slate-400" /> Settings
            </button>
            <button onClick={handleLogout} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-red-400 hover:bg-red-50 transition-all shadow-sm">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-12 overflow-x-hidden relative">
        <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-purple-600 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to landing page
        </button>

        {activePage === 'DASHBOARD' ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
              <div>
                <h1 className="text-4xl font-black tracking-tighter italic">Overview</h1>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Financial pulse for May 2025</p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button onClick={exportToCSV} className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50">Export CSV</button>
                <button onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none px-6 py-3 bg-[#9333ea] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
                    <Plus size={16} /> New Entry
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <SummaryCard title="Total Income" value={`$${totals.income.toLocaleString()}`} trend="+12.5%" type="up" />
              <SummaryCard title="Total Expenses" value={`$${totals.expenses.toLocaleString()}`} trend="-8.2%" type="down" />
              <SummaryCard title="Net Earnings" value={`$${totals.earnings >= 0 ? '' : '-'}$${Math.abs(totals.earnings).toLocaleString()}`} trend="Stable" type="neutral" />
              <SummaryCard title="Top Category" value="Rent/Mort..." trend="Trend" type="category" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
              <div className="xl:col-span-2 bg-white p-6 md:p-10 rounded-[3rem] shadow-sm border border-slate-50">
                <div className="flex justify-between items-center mb-12">
                   <h3 className="text-xl font-black italic">Income vs Expenses</h3>
                   <div className="flex gap-2">
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-[#9333ea]" /> Revenue
                      </span>
                      <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="w-2 h-2 rounded-full bg-pink-100" /> Costs
                      </span>
                   </div>
                </div>
                <div className="h-64 flex items-end justify-between px-2 md:px-4">
                  {chartData.map((m) => (
                    <BarPair 
                      key={m.label} 
                      label={m.label} 
                      val1={m.v1} 
                      val2={m.v2}
                      incomeVal={m.inc}
                      expenseVal={m.exp}
                      isHovered={hoveredMonth === m.label}
                      onHover={() => setHoveredMonth(m.label)}
                      onLeave={() => setHoveredMonth(null)}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-sm border border-slate-50">
                 <h3 className="text-xl font-black italic mb-10">Budget Split</h3>
                 <div className="flex flex-col items-center">
                    <BudgetDonut 
                      isHovered={hoveredBudget}
                      onHover={() => setHoveredBudget(true)}
                      onLeave={() => setHoveredBudget(false)}
                      rentAmount={totals.rentExp.toLocaleString()}
                    />
                    <div className="w-full mt-10 space-y-6">
                       <BudgetRow label="SOFTWARE" amount={`$${totals.softwareExp}`} limit="$300" color="bg-[#9333ea]" percent={Math.min((totals.softwareExp/300)*100, 100)} />
                       <BudgetRow label="RENT/MORTGAGE" amount={`$${totals.rentExp}`} limit="$2k" color="bg-[#3b82f6]" percent={Math.min((totals.rentExp/2000)*100, 100)} />
                    </div>
                 </div>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden">
                <div className="p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h3 className="text-2xl font-black italic">Activity</h3>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input type="text" placeholder="Search Label..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-[12px] font-bold outline-none border border-transparent focus:border-purple-200 transition-all" />
                      </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-[#fcfcfd]">
                      <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <th className="px-10 py-5">Date</th>
                        <th className="px-10 py-5">Label</th>
                        <th className="px-10 py-5">Group</th>
                        <th className="px-10 py-5">Flow</th>
                        <th className="px-10 py-5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      <AnimatePresence mode='popLayout'>
                        {filteredTransactions.map(t => (
                          <motion.tr 
                            key={t.id} 
                            layout
                            initial={{ opacity: 0, x: -10 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            exit={{ opacity: 0, scale: 0.95 }} 
                            className="text-sm font-bold hover:bg-slate-50/50 transition-colors"
                          >
                            <td className="px-10 py-8 text-slate-400 font-medium">{t.date}</td>
                            <td className="px-10 py-8 text-[#1e1b4b] font-black">{t.label}</td>
                            <td className="px-10 py-8 text-slate-400 text-[11px] uppercase tracking-widest">{t.group}</td>
                            <td className={`px-10 py-8 text-lg font-black ${t.group === 'INCOME' ? 'text-[#9333ea]' : 'text-red-400'}`}>
                              {t.group === 'INCOME' ? '+' : '-'}${t.flow.toLocaleString()}
                            </td>
                            <td className="px-10 py-8 text-center">
                              <button 
                                onClick={() => handleDelete(t.id)}
                                className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
            </div>
          </motion.div>
        ) : (
          <div className="animate-in slide-in-from-bottom-10 duration-700">
             <header className="mb-14">
              <h1 className="text-5xl font-black tracking-tighter italic">Tax Estimator</h1>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">Liability projection</p>
            </header>
             <div className="bg-[#1e1b4b] text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest mb-2">Estimated Liability</p>
                  <h2 className="text-7xl font-black italic tracking-tighter mb-8">${totals.liability.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
                  <div className="flex gap-12 border-t border-white/10 pt-8">
                     <div>
                       <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Effective Rate</p>
                       <p className="text-xl font-black italic">{taxRate}%</p>
                     </div>
                     <div className="flex-1 max-w-xs">
                        <input type="range" min="10" max="50" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                     </div>
                  </div>
                </div>
                <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#9333ea]/20 rounded-full blur-[100px]" />
             </div>
          </div>
        )}

        <AnimatePresence>
          {showUndoToast && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] bg-[#1e1b4b] text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-6 border border-white/10"
            >
              <p className="text-sm font-bold tracking-tight">Entry deleted</p>
              <button 
                onClick={handleUndo} 
                className="flex items-center gap-2 text-[#9333ea] font-black text-[10px] uppercase tracking-widest hover:text-purple-300 transition-colors"
              >
                <Undo2 size={16} /> Undo
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button onClick={() => setShowUndoToast(false)}>
                <X size={16} className="text-slate-400 hover:text-white" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-[#1e1b4b]/20">
            <motion.form initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onSubmit={handleSave} className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-black italic">New Entry</h2>
                  <X className="cursor-pointer text-slate-300 hover:text-red-400" onClick={() => setIsModalOpen(false)} />
                </div>
                <div className="space-y-4">
                   <input required placeholder="Label (e.g. AWS)" value={newEntry.label} onChange={e => setNewEntry({...newEntry, label: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-purple-300" />
                   <div className="grid grid-cols-2 gap-4">
                      <input required type="number" placeholder="Amount" value={newEntry.amount} onChange={e => setNewEntry({...newEntry, amount: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none focus:border-purple-300" />
                      <select value={newEntry.group} onChange={e => setNewEntry({...newEntry, group: e.target.value})} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold outline-none">
                        <option value="EXPENSE">Expense</option>
                        <option value="INCOME">Income</option>
                      </select>
                   </div>
                   <button type="submit" className="w-full py-5 bg-[#9333ea] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-purple-200 mt-4 hover:bg-[#7c2dd3] transition-colors">Confirm Entry</button>
                </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---
const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer font-black text-[11px] tracking-[0.1em] transition-all ${
    active ? 'bg-[#9333ea] text-white shadow-xl shadow-purple-200' : 'text-slate-400 hover:text-[#9333ea] hover:bg-slate-50'
  }`}>
    {icon} {label}
  </div>
);

const SummaryCard = ({ title, value, trend, type }) => {
  const isDown = type === 'down';
  const isNeutral = type === 'neutral';
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm hover:-translate-y-1 transition-transform">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl ${isDown ? 'bg-red-50 text-red-400' : isNeutral ? 'bg-slate-50 text-slate-400' : 'bg-purple-50 text-[#9333ea]'}`}>
          {isDown ? <ChevronDown size={20} /> : isNeutral ? <X size={20} className="rotate-45" /> : <ChevronUp size={20} />}
        </div>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black ${isDown ? 'bg-red-50 text-red-400' : isNeutral ? 'bg-slate-50 text-slate-400' : 'bg-purple-50 text-[#9333ea]'}`}>{trend}</span>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-3xl font-black italic text-[#1e1b4b]">{value}</p>
    </div>
  );
};

const BarPair = ({ label, val1, val2, incomeVal, expenseVal, isHovered, onHover, onLeave }) => (
  <div 
    className="flex flex-col items-center gap-4 h-full group relative cursor-pointer"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <AnimatePresence>
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="absolute -top-20 z-30 bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-50 min-w-[140px]"
        >
          <p className="text-[11px] font-black text-[#1e1b4b] mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-[#9333ea] flex justify-between gap-4">
              <span>income :</span> <span>${incomeVal}</span>
            </p>
            <p className="text-[11px] font-bold text-pink-300 flex justify-between gap-4">
              <span>expenses :</span> <span>${expenseVal}</span>
            </p>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45 border-b border-r border-slate-50" />
        </motion.div>
      )}
    </AnimatePresence>

    <div className={`flex items-end gap-1.5 h-full relative px-2 transition-all duration-300 ${isHovered ? 'bg-slate-50/80 rounded-t-3xl' : ''}`}>
      <motion.div initial={{ height: 0 }} animate={{ height: `${val1}%` }} transition={{ duration: 1 }} className="w-3 bg-[#9333ea] rounded-t-full" />
      <motion.div initial={{ height: 0 }} animate={{ height: `${val2}%` }} transition={{ duration: 1, delay: 0.1 }} className="w-3 bg-pink-100 rounded-t-full" />
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${isHovered ? 'text-[#9333ea]' : 'text-slate-300'}`}>{label}</span>
  </div>
);

const BudgetDonut = ({ isHovered, onHover, onLeave, rentAmount }) => {
  const circumference = 440; // 2 * PI * 70
  return (
    <div 
      className="relative flex items-center justify-center cursor-pointer group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <svg className="w-52 h-52 transform -rotate-90">
        <circle cx="104" cy="104" r="70" stroke="#f8f9fe" strokeWidth="18" fill="transparent" />
        <motion.circle
          cx="104" cy="104" r="70" stroke="#3b82f6" strokeWidth="18" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * 0.65) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
        <motion.circle
          cx="104" cy="104" r="70" stroke="#9333ea" strokeWidth="18" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * 0.25) }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          strokeLinecap="round"
          style={{ transformOrigin: 'center', rotate: '45deg' }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-black italic text-[#1e1b4b]">Split</span>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 40 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="absolute right-[-40px] bg-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-50 whitespace-nowrap z-50"
          >
            <p className="text-[11px] font-black text-[#1e1b4b]">
              Rent/Mortgage : <span className="text-slate-400 font-bold">${rentAmount}</span>
            </p>
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-slate-50" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BudgetRow = ({ label, amount, limit, color, percent }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[9px] font-black text-slate-400 tracking-widest">{label}</span>
       </div>
       <div className="text-right">
          <p className="text-sm font-black italic">{amount}</p>
          <p className="text-[8px] font-black text-slate-300 uppercase">Limit: {limit}</p>
       </div>
    </div>
    <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
       <motion.div initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1.5 }} className={`h-full ${color}`} />
    </div>
  </div>
);