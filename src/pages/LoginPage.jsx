import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 font-sans">
      
      {/* Logo outside the card to match modern SaaS trends */}
      <Link to="/" className="text-2xl font-black text-[#1e1b4b] tracking-tight mb-8">
        TaxPal
      </Link>

      <div className="w-full max-w-[440px] bg-white p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-purple-100/50 border border-slate-100">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#1e1b4b] mb-3">Welcome Back</h2>
          <p className="text-slate-500 font-medium text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        <form className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-[13px] font-black text-[#1e1b4b] uppercase tracking-wider mb-2 ml-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[13px] font-black text-[#1e1b4b] uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot" className="text-[13px] font-bold text-[#9333ea] hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••••"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-[#9333ea] focus:ring-4 focus:ring-purple-50 outline-none transition-all placeholder:text-slate-300 font-medium"
            />
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-[#9333ea] text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 hover:scale-[0.99] transition-all mt-4">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-[1px] bg-slate-100"></div>
          <span className="mx-4 text-[11px] font-black text-slate-400 tracking-widest uppercase">OR</span>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
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