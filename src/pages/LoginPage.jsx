import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#fcf8ff] flex flex-col justify-center items-center px-6 font-sans">

      {/* Logo outside the card */}
      <Link to="/" className="flex items-center gap-3 mb-10 group">
        <div className="w-10 h-10 bg-[#6d28d9] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">TP</div>
        <span className="text-2xl font-black text-[#1e1b4b] tracking-tighter italic">TaxPal</span>
      </Link>

      <div className="w-full max-w-[440px] bg-white p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-purple-900/5 border border-purple-50">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-[#1e1b4b] mb-4 italic tracking-tighter">Welcome Back</h2>
          <p className="text-slate-500 font-medium text-sm">
            Access your premium freelancer suite
          </p>
        </div>

        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.2em] mb-3 ml-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-6 py-5 rounded-3xl bg-purple-50/30 border-2 border-transparent focus:border-purple-100 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-bold"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-3 ml-1">
              <label className="text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.2em]">
                Password
              </label>
              <Link to="/forgot" className="text-[11px] font-black text-[#6d28d9] uppercase tracking-widest hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full px-6 py-5 rounded-3xl bg-purple-50/30 border-2 border-transparent focus:border-purple-100 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-bold"
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-[#6d28d9] text-white py-5 rounded-2xl font-black text-lg shadow-2xl shadow-purple-200 hover:bg-[#5b21b6] hover:-translate-y-1 transition-all mt-4 uppercase tracking-widest text-[13px]">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-10">
          <div className="flex-1 h-[1px] bg-purple-50"></div>
          <span className="mx-4 text-[10px] font-black text-slate-300 tracking-widest">SECURE ACCESS</span>
          <div className="flex-1 h-[1px] bg-purple-50"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="G" />
            Google
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all text-sm">
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-4 h-4" alt="GH" />
            GitHub
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center mt-10 text-sm font-medium text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#9333ea] font-black hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}