import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../services/api";

export default function Login({ onLogin, onBack, onOtpLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await login(form.username, form.password);

      if (data?.token) {
        // Decode JWT payload
        const payload = JSON.parse(atob(data.token.split(".")[1]));

        // Handle role as string, array, or authorities array
        const rawRole = Array.isArray(payload.role)
          ? payload.role[0]
          : typeof payload.role === "string"
          ? payload.role
          : Array.isArray(payload.authorities)
          ? payload.authorities[0]?.authority || payload.authorities[0]
          : "EMPLOYEE";

        const role = rawRole.replace("ROLE_", "");

        const user = {
          token: data.token,
          username: form.username,
          role,
        };

        toast.success("Welcome back! 👋");
        onLogin(user); // App.jsx saves to localStorage
      } else {
        toast.error(data?.message || "Invalid username or password");
      }
    } catch (err) {
      toast.error(err.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-indigo-900 p-12 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-indigo-700 rounded-full opacity-40" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange-400 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-indigo-500 rounded-full opacity-30" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl">WorkSphere</span>
        </div>

        {/* Center text */}
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Manage your<br />
            <span className="text-orange-400">workforce</span><br />
            effortlessly.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
            Payroll, attendance, onboarding, and employee records — all in one place.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[
              { value: "10k+", label: "Employees" },
              { value: "500+", label: "Companies" },
              { value: "98%", label: "Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-indigo-300 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
          <p className="text-indigo-100 text-sm leading-relaxed italic">
            "WorkSphere transformed how we manage our team. Everything is seamless and fast."
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
              CB
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Chebson.</p>
              <p className="text-indigo-300 text-xs">HR Director, TechCorp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 sm:px-8 py-12 min-h-screen">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">WorkSphere</span>
          </div>

          {/* Back button */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to home
            </button>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back 👋</h1>
            <p className="text-gray-400 mt-2 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-300 bg-gray-50 transition"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-300 bg-gray-50 transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-gray-300 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* WhatsApp OTP Login */}
          <button
            onClick={onOtpLogin}
            className="w-full flex items-center justify-center gap-2 border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-semibold rounded-xl py-3 text-sm transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Login with WhatsApp OTP
          </button>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center mb-3">Demo accounts</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: "Admin", bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
                { role: "HR", bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
                { role: "Employee", bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
              ].map(({ role, bg, text, border }) => (
                <div key={role} className={`${bg} border ${border} rounded-lg px-2 py-2 text-center`}>
                  <span className={`${text} text-xs font-semibold`}>{role}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}