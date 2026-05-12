export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Top banner */}
      <div className="bg-orange-50 text-center py-2 px-4 text-sm text-orange-700 border-b border-orange-100">
        Streamline your HR workflows — onboarding, payroll, and more in one place!
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
          <button onClick={onGetStarted} className="text-sm text-gray-600 hover:text-gray-900 transition font-medium">
            Sign in
          </button>
          <button onClick={onGetStarted} className="bg-indigo-700 hover:bg-indigo-800 text-white text-sm font-semibold px-5 py-2 rounded-lg transition">
            Get started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 max-w-7xl mx-auto gap-12">
        {/* Left — Text */}
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
            <button onClick={onGetStarted} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md">
              Get started today
            </button>
            <button className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-lg transition">
              Book a demo
            </button>
          </div>

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

        {/* Right — Macbook Image */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Decorative blobs */}
          <div className="absolute w-72 h-72 bg-teal-100 rounded-full top-0 right-0 opacity-50 blur-2xl" />
          <div className="absolute w-48 h-48 bg-orange-100 rounded-full bottom-0 left-0 opacity-50 blur-2xl" />

          {/* Image card */}
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 w-full max-w-lg">
            <img
              src="/macbook.jpg"
              alt="HR Platform Dashboard on Macbook"
              className="w-full h-auto object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <div>
                  <p className="text-gray-800 text-xs font-semibold">Payroll Processed</p>
                  <p className="text-gray-400 text-xs">All 128 employees · May 2026</p>
                </div>
              </div>
              <span className="bg-green-50 text-green-600 text-xs font-semibold px-2 py-1 rounded-full border border-green-100">
                Done
              </span>
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

      {/* Roles */}
      <section id="roles" className="bg-indigo-900 px-8 md:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white mb-3">Built for every role</h2>
            <p className="text-indigo-300 text-sm">Different views and permissions for each role in your organization.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                role: "Admin", color: "bg-orange-500",
                desc: "Full system access. Manage users, roles, and platform settings.",
                perms: ["Register & manage users", "Assign roles", "Full data access", "System configuration"],
              },
              {
                role: "HR Manager", color: "bg-indigo-500",
                desc: "Manage employees, departments, leaves, and payroll.",
                perms: ["Employee onboarding", "Leave approvals", "Department management", "Payroll overview"],
              },
              {
                role: "Employee", color: "bg-teal-500",
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
                { msg: "leave 2026-05-20 2026-05-25 Annual leave", reply: "📋 Leave request submitted for HR approval" },
                { msg: "payslip", reply: "💰 Your latest payslip: KES 85,000 net" },
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
        <button onClick={onGetStarted} className="bg-white text-orange-500 font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition shadow-md">
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
                <li>
                  <a href="mailto:cheboigilbert7@gmail.com" className="hover:text-white transition flex items-center gap-2">
                    📧 cheboigilbert7@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/254743143013" target="_blank" rel="noreferrer" className="hover:text-white transition flex items-center gap-2">
                    📞 +254 743 143 013
                  </a>
                </li>
                <li className="text-indigo-300">📍 Nairobi, Kenya</li>
              </ul>

              <div className="flex gap-3 mt-5 flex-wrap">
                {/* GitHub */}
                <a href="https://github.com/gilbert-rgb/" target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-indigo-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition" title="GitHub">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/gilbert-cheboi-42b7ab351/" target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-indigo-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition" title="LinkedIn">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a href="https://www.instagram.com/chebs_on/" target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-indigo-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition" title="Instagram">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a href="https://www.facebook.com/gilly.treb.5" target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-indigo-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition" title="Facebook">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a href="https://wa.me/254743143013" target="_blank" rel="noreferrer"
                  className="w-9 h-9 bg-indigo-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition" title="WhatsApp">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.099 1.516 5.83L.057 23.25a.75.75 0 00.914.914l5.42-1.459A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.947-1.357l-.355-.211-3.676.99.99-3.676-.211-.355A9.695 9.695 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                </a>
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