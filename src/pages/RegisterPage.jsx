import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-6 font-sans">
      
      {/* Brand Logo - Bold & High Contrast */}
      <Link to="/" className="text-2xl font-black text-[#1e1b4b] tracking-tight mb-8">
        TaxPal
      </Link>

      <div className="w-full max-w-[500px] bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-purple-100/50 border border-slate-100">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1e1b4b] mb-3">Create Your Account</h2>
          <p className="text-slate-500 font-medium text-sm">
            Start managing your finances today
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
                Email
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Password */}
            <div>
              <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
                Confirm
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
              />
            </div>
          </div>

          {/* Country Select */}
          <div>
            <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
              Country
            </label>
            <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-sm bg-white appearance-none cursor-pointer">
              <option>Select your country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          {/* Income Bracket Select */}
          <div>
            <label className="block text-[11px] font-black text-[#1e1b4b] uppercase tracking-[0.15em] mb-2 ml-1">
              Income Bracket (Optional)
            </label>
            <select className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all font-medium text-sm bg-white appearance-none cursor-pointer">
              <option>Select your income bracket</option>
              <option>$0-$25k</option>
              <option>$25k-$50k</option>
              <option>$50k-$100k</option>
            </select>
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-[#9333ea] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 hover:scale-[0.99] transition-all mt-6">
            Sign Up
          </button>
        </form>

        {/* Terms */}
        <p className="text-center mt-6 text-[11px] font-bold text-slate-400 leading-relaxed max-w-[300px] mx-auto">
          By signing up, you agree to our <span className="text-slate-600 hover:text-[#9333ea] cursor-pointer">Terms of Service</span> and <span className="text-slate-600 hover:text-[#9333ea] cursor-pointer">Privacy Policy</span>.
        </p>

        {/* Login Link */}
        <p className="text-center mt-10 text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#9333ea] font-black hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}