import { useState } from "react";
import { toast } from "react-toastify";
import { login } from "../services/api";

export default function Login({ onLogin, onBack }) {
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

        // Debug — remove after confirming it works
        console.log("[Login] JWT payload:", payload);
        console.log("[Login] Resolved role:", role);
        console.log("[Login] User saved:", user);

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
              SK
            </div>
            <div>
              <p className="text-white text-xs font-semibold">Sarah K.</p>
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