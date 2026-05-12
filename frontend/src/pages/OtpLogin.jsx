import { useState } from "react";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8081/api/v1";

export default function OtpLogin({ onLogin, onBack }) {
  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // clean phone number - remove whatsapp: prefix, ensure + prefix
  const cleanPhone = (phone) => {
    let cleaned = phone.trim().replace(/^whatsapp:/i, "");
    if (!cleaned.startsWith("+")) cleaned = "+" + cleaned;
    return cleaned;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const phone = cleanPhone(phoneNumber);
      const res = await fetch(
        `${BASE_URL}/otp/send?phoneNumber=${encodeURIComponent(phone)}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to send OTP");
        return;
      }
      toast.success("OTP sent to your WhatsApp! 📱");
      setStep("otp");
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const phone = cleanPhone(phoneNumber);
      const res = await fetch(
        `${BASE_URL}/otp/verify?phoneNumber=${encodeURIComponent(phone)}&code=${encodeURIComponent(otp)}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Invalid or expired OTP");
        return;
      }
      const user = {
        token: data.token,
        username: data.username,
        role: data.role.replace("ROLE_", ""),
      };
      toast.success("Welcome back! 👋");
      onLogin(user);
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-indigo-900 p-12 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-indigo-700 rounded-full opacity-40" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-green-400 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-indigo-500 rounded-full opacity-30" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </div>
          <span className="text-white font-bold text-xl">WorkSphere</span>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
            Login with<br />
            <span className="text-green-400">WhatsApp</span><br />
            OTP.
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
            Enter your registered WhatsApp number and we'll send you a one-time password to sign in securely.
          </p>

          <div className="mt-10 space-y-4">
            {[
              { step: "1", label: "Enter your WhatsApp number" },
              { step: "2", label: "Receive OTP on WhatsApp" },
              { step: "3", label: "Enter OTP to sign in" },
            ].map(({ step: s, label }) => (
              <div key={s} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {s}
                </div>
                <p className="text-indigo-200 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur rounded-2xl p-5 border border-white/10">
          <p className="text-indigo-100 text-sm leading-relaxed">
            🔐 Your OTP is valid for <span className="font-bold text-white">5 minutes</span> and can only be used once.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 sm:px-8 py-12 min-h-screen">
        <div className="w-full max-w-md">

          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-lg">WorkSphere</span>
          </div>

          {onBack && (
            <button onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm mb-8 transition">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          {/* STEP 1 — Phone */}
          {step === "phone" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Enter your number
                </h1>
                <p className="text-gray-400 mt-2 text-sm">
                  We'll send a 6-digit OTP to your WhatsApp
                </p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-300 bg-gray-50 transition"
                    placeholder="254712345678"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1.5">
                    Include country code e.g. 254...
                  </p>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending OTP...
                    </span>
                  ) : "Send OTP via WhatsApp →"}
                </button>
              </form>
            </>
          )}

          {/* STEP 2 — OTP */}
          {step === "otp" && (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 bg-green-50 border border-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Enter OTP
                </h1>
                <p className="text-gray-400 mt-2 text-sm">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-gray-600">{phoneNumber}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    6-Digit OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-300 bg-gray-50 transition tracking-widest text-center text-lg font-bold"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                <button type="submit" disabled={loading || otp.length !== 6}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-200 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-all duration-200">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Verifying...
                    </span>
                  ) : "Verify & Sign In →"}
                </button>

                <button type="button" onClick={() => { setStep("phone"); setOtp(""); }}
                  className="w-full text-gray-400 hover:text-gray-600 text-sm transition">
                  ← Change number
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-xs">Didn't receive the OTP?</p>
                <button onClick={handleSendOtp}
                  className="text-green-500 hover:text-green-700 text-xs font-semibold mt-1 transition">
                  Resend OTP
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}