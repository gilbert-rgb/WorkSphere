export default function LandingPage({ onGetStarted }) {
    return (
      <div className="min-h-screen bg-white font-sans">
  
        {/* Top banner */}
        <div className="bg-orange-50 text-center py-2 px-4 text-sm text-orange-700 border-b border-orange-100">
          🚀 Streamline your HR workflows — onboarding, payroll, and more in one place!
        </div>
  
        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-100 sticky top-0 bg-white z-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">HR Platform</span>
          </div>
  
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
            <a href="#features" className="hover:text-orange-500 transition">Features</a>
            <a href="#how" className="hover:text-orange-500 transition">How it works</a>
            <a href="#roles" className="hover:text-orange-500 transition">Roles</a>
            <a href="#pricing" className="hover:text-orange-500 transition">Pricing</a>
          </div>
  
          <div className="flex items-center gap-4">
            <button
              onClick={onGetStarted}
              className="text-sm text-gray-600 hover:text-gray-900 transition font-medium"
            >
              Sign in
            </button>
            <button
              onClick={onGetStarted}
              className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
            >
              Get started
            </button>
          </div>
        </nav>
  
        {/* Hero */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 max-w-7xl mx-auto gap-12">
          <div className="flex-1 max-w-xl">
            <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full mb-4">
              ✦ Now with WhatsApp Bot Integration
            </span>
            <h1 className="text-5xl font-extrabold text-indigo-900 leading-tight mb-6">
              Manage<br />
              <span className="text-orange-500">Your Workforce</span><br />
              Effortlessly
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              An all-in-one HR platform to simplify payroll, attendance, onboarding,
              and employee management. Built for modern African teams.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={onGetStarted}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
              >
                Get started today
              </button>
              <button className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg transition">
                Book a demo
              </button>
            </div>
  
            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {[
                { value: "10k+", label: "Employees managed" },
                { value: "98%", label: "Satisfaction rate" },
                { value: "500+", label: "Companies" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-indigo-900">{value}</p>
                  <p className="text-sm text-gray-400">{label}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Right decorative cards */}
          <div className="flex-1 relative flex items-center justify-center min-h-80">
            <div className="absolute w-64 h-64 bg-teal-100 rounded-full top-0 right-8 opacity-60" />
            <div className="absolute w-40 h-40 bg-orange-100 rounded-full bottom-0 left-8 opacity-60" />
  
            <div className="relative z-10 bg-white shadow-xl rounded-2xl p-4 w-56 mr-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">AK</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Alice Kim</p>
                  <p className="text-xs text-gray-400">Team Lead · Engineering</p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="bg-green-50 text-green-600 text-xs font-medium px-2 py-1 rounded-full">✓ Checked In</span>
                <span className="text-xs text-gray-400">09:02 AM</span>
              </div>
            </div>
  
            <div className="relative z-10 bg-white shadow-xl rounded-2xl p-4 w-56 mt-8 border border-gray-100">
              <p className="text-xs text-gray-400 mb-2 font-medium">Leave Request</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm">JM</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">James M.</p>
                  <p className="text-xs text-gray-400">3 days · Annual Leave</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 bg-indigo-600 text-white text-xs py-1.5 rounded-lg font-medium">Approve</button>
                <button className="flex-1 border border-gray-200 text-gray-500 text-xs py-1.5 rounded-lg font-medium">Decline</button>
              </div>
            </div>
          </div>
        </section>
  
        {/* Features */}
        <section id="features" className="bg-gray-50 px-8 md:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-indigo-900 mb-3">Everything your HR team needs</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">From onboarding to payroll, we've got every part of your HR workflow covered.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "👥", title: "Employee Management", desc: "Centralize all employee records, positions, and departments in one place.", color: "bg-indigo-50" },
                { icon: "📊", title: "Payroll Processing", desc: "Automated salary computation and payslip generation every month.", color: "bg-orange-50" },
                { icon: "📅", title: "Attendance Tracking", desc: "Track check-ins and check-outs via WhatsApp — no app needed.", color: "bg-green-50" },
                { icon: "💬", title: "WhatsApp Bot", desc: "Employees interact via WhatsApp for leave, attendance, and payroll queries.", color: "bg-teal-50" },
                { icon: "🔐", title: "Role-based Access", desc: "Admin, HR, and Employee roles with granular permissions.", color: "bg-purple-50" },
                { icon: "🚀", title: "Onboarding Workflow", desc: "Streamline new hire onboarding from PENDING to ACTIVE status.", color: "bg-pink-50" },
              ].map(({ icon, title, desc, color }) => (
                <div key={title} className={`${color} rounded-2xl p-6 border border-white hover:shadow-md transition`}>
                  <div className="text-3xl mb-4">{icon}</div>
                  <p className="font-bold text-gray-800 mb-2">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* How it works */}
        <section id="how" className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-indigo-900 mb-3">How it works</h2>
            <p className="text-gray-400 text-sm">Get your team set up in minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Register", desc: "Admin creates an account and sets up the organization.", icon: "🏢" },
              { step: "02", title: "Add Employees", desc: "HR adds employees and assigns departments and roles.", icon: "➕" },
              { step: "03", title: "Activate", desc: "Employee status moves from PENDING to ACTIVE after onboarding.", icon: "✅" },
              { step: "04", title: "Go Live", desc: "Employees use WhatsApp to check in, request leave, and more.", icon: "🚀" },
            ].map(({ step, title, desc, icon }, i) => (
              <div key={step} className="relative text-center">
                {i < 3 && (
                  <div className="hidden md:block absolute top-6 left-3/4 w-1/2 border-t-2 border-dashed border-indigo-100 z-0" />
                )}
                <div className="relative z-10 w-14 h-14 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md">
                  {icon}
                </div>
                <span className="text-xs font-bold text-orange-400">{step}</span>
                <p className="font-bold text-gray-800 mt-1 mb-2">{title}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>
  
        {/* Roles section */}
        <section id="roles" className="bg-indigo-900 px-8 md:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-white mb-3">Built for every role</h2>
              <p className="text-indigo-300 text-sm">Different views and permissions for each role in your organization.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: "Admin",
                  color: "bg-orange-500",
                  desc: "Full system access. Manage users, roles, and platform settings.",
                  perms: ["Register & manage users", "Assign roles", "Full data access", "System configuration"],
                },
                {
                  role: "HR Manager",
                  color: "bg-indigo-500",
                  desc: "Manage employees, departments, leaves, and payroll.",
                  perms: ["Employee onboarding", "Leave approvals", "Department management", "Payroll overview"],
                },
                {
                  role: "Employee",
                  color: "bg-teal-500",
                  desc: "Self-service access via web or WhatsApp bot.",
                  perms: ["View own profile", "Request leave via WhatsApp", "Check in / check out", "View payslip"],
                },
              ].map(({ role, color, desc, perms }) => (
                <div key={role} className="bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition">
                  <div className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4`}>{role}</div>
                  <p className="text-white font-bold text-lg mb-2">{role}</p>
                  <p className="text-indigo-200 text-sm mb-4 leading-relaxed">{desc}</p>
                  <ul className="space-y-2">
                    {perms.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-indigo-100 text-sm">
                        <span className="text-green-400">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* WhatsApp highlight */}
        <section className="px-8 md:px-16 py-16 max-w-7xl mx-auto">
          <div className="bg-green-50 border border-green-100 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">WhatsApp Integration</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Your employees already have WhatsApp</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                No app downloads required. Employees check in, request leave, and query payroll
                directly from WhatsApp — the app they already use every day.
              </p>
              <div className="space-y-3">
                {[
                  { msg: "check in", reply: "✅ Check-in recorded at 08:45 AM" },
                  { msg: "I need leave for 3 days", reply: "📋 Leave request submitted for HR approval" },
                  { msg: "salary", reply: "💰 Your March payslip: KES 85,000" },
                ].map(({ msg, reply }) => (
                  <div key={msg} className="flex flex-col gap-1">
                    <div className="self-end bg-green-500 text-white text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-xs">{msg}</div>
                    <div className="self-start bg-white border border-gray-100 text-gray-700 text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm max-w-xs">{reply}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-48 h-48 bg-green-500 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.516 5.83L.057 23.25a.75.75 0 00.914.914l5.42-1.459A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.947-1.357l-.355-.211-3.676.99.99-3.676-.211-.355A9.695 9.695 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
              </div>
            </div>
          </div>
        </section>
  
        {/* CTA Banner */}
        <section className="bg-orange-500 px-8 md:px-16 py-14 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">Ready to transform your HR?</h2>
          <p className="text-orange-100 text-sm mb-6 max-w-md mx-auto">Join hundreds of companies already using HR Platform to manage their teams effortlessly.</p>
          <button
            onClick={onGetStarted}
            className="bg-white text-orange-500 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition shadow-md"
          >
            Get started for free →
          </button>
        </section>
  
        {/* Footer */}
        <footer className="bg-indigo-950 px-8 md:px-16 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
  
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-white text-lg">HR Platform</span>
                </div>
                <p className="text-indigo-300 text-sm leading-relaxed">
                  Modern HR management for African businesses. Built with WhatsApp-first workflows.
                </p>
              </div>
  
              {/* Product */}
              <div>
                <p className="text-white font-semibold text-sm mb-4">Product</p>
                <ul className="space-y-2 text-indigo-300 text-sm">
                  {["Features", "How it works", "Pricing", "Changelog"].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                  ))}
                </ul>
              </div>
  
              {/* Company */}
              <div>
                <p className="text-white font-semibold text-sm mb-4">Company</p>
                <ul className="space-y-2 text-indigo-300 text-sm">
                  {["About", "Blog", "Careers", "Contact"].map((item) => (
                    <li key={item}><a href="#" className="hover:text-white transition">{item}</a></li>
                  ))}
                </ul>
              </div>
  
              {/* Contact */}
              <div>
                <p className="text-white font-semibold text-sm mb-4">Get in touch</p>
                <ul className="space-y-2 text-indigo-300 text-sm">
                  <li>📧 hello@hrplatform.co.ke</li>
                  <li>📞 +254 700 000 000</li>
                  <li>📍 Nairobi, Kenya</li>
                </ul>
                <div className="flex gap-3 mt-4">
                  {["𝕏", "in", "gh"].map((s) => (
                    <a key={s} href="#" className="w-8 h-8 bg-indigo-800 hover:bg-indigo-700 rounded-lg flex items-center justify-center text-indigo-200 text-xs font-bold transition">
                      {s}
                    </a>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Bottom bar */}
            <div className="border-t border-indigo-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-indigo-400 text-xs">
              <p>© {new Date().getFullYear()} HR Platform. Built by Gilbert Cheboi.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition">Privacy Policy</a>
                <a href="#" className="hover:text-white transition">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }