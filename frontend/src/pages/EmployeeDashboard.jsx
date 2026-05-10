import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import {
  getLeaveRequests, createLeaveRequest,
  checkIn, checkOut, getAttendance
} from "../services/api";

const navItems = [
  { id: "overview", label: "Overview", icon: "🏠" },
  { id: "leave", label: "My Leave", icon: "📅" },
  { id: "attendance", label: "Attendance", icon: "⏰" },
];

const leaveStatusColor = (status) => {
  if (status === "APPROVED") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (status === "PENDING") return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-red-50 text-red-500 border border-red-100";
};

const attendanceStatusColor = (status) => {
  if (status === "PRESENT") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (status === "LATE") return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-red-50 text-red-500 border border-red-100";
};

export default function EmployeeDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ startDate: "", endDate: "", reason: "" });
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [l, a] = await Promise.all([getLeaveRequests(), getAttendance()]);
      setLeaveRequests(Array.isArray(l) ? l : []);
      setAttendance(Array.isArray(a) ? a : []);
    } catch {
      toast.error("Failed to load data");
    }
  };

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLeaveRequest(leaveForm);
      toast.success("Leave request submitted successfully!");
      setShowLeaveForm(false);
      setLeaveForm({ startDate: "", endDate: "", reason: "" });
      fetchAll();
    } catch {
      toast.error("Failed to submit leave request");
    }
  };

  const handleCheckIn = async () => {
    try {
      await checkIn();
      setCheckedIn(true);
      setCheckInTime(new Date().toLocaleTimeString());
      toast.success("Checked in successfully! ✅");
      fetchAll();
    } catch {
      toast.error("Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await checkOut();
      setCheckedIn(false);
      toast.info("Checked out successfully 🚪");
      fetchAll();
    } catch {
      toast.error("Check-out failed");
    }
  };

  const approved = leaveRequests.filter(l => l.status === "APPROVED").length;
  const pending = leaveRequests.filter(l => l.status === "PENDING").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        user={user}
        onLogout={onLogout}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-indigo-900">
              {navItems.find(n => n.id === activeTab)?.icon}{" "}
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            <p className="text-gray-400 text-sm mt-1">Welcome, {user.username}</p>
          </div>
          <div className="bg-purple-50 border border-purple-100 text-purple-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            EMPLOYEE
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Total Leave Requests", value: leaveRequests.length, icon: "📅", text: "text-indigo-900", badge: "bg-indigo-50 text-indigo-600" },
                { label: "Approved Leaves", value: approved, icon: "✅", text: "text-emerald-700", badge: "bg-emerald-50 text-emerald-600" },
                { label: "Pending Requests", value: pending, icon: "⏳", text: "text-amber-700", badge: "bg-amber-50 text-amber-600" },
              ].map(({ label, value, icon, text, badge }) => (
                <div key={label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{icon}</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${badge}`}>Live</span>
                  </div>
                  <p className={`text-3xl font-bold mb-1 ${text}`}>{value}</p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              ))}
            </div>

            {/* Today's Attendance */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-900 font-bold mb-4">Today's Attendance</h2>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-3 h-3 rounded-full ${checkedIn ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`} />
                <p className="text-gray-500 text-sm">
                  {checkedIn ? `Checked in at ${checkInTime}` : "Not checked in yet"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCheckIn}
                  disabled={checkedIn}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
                >
                  ✅ Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={!checkedIn}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
                >
                  🚪 Check Out
                </button>
              </div>
            </div>

            {/* Recent Leave Requests */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-indigo-900 font-bold">Recent Leave Requests</h2>
                <button
                  onClick={() => setActiveTab("leave")}
                  className="text-indigo-500 text-xs hover:text-indigo-700 transition"
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {leaveRequests.slice(0, 3).map(req => (
                  <div key={req.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl">
                    <div>
                      <p className="text-gray-800 text-sm font-medium">{req.startDate} → {req.endDate}</p>
                      <p className="text-gray-400 text-xs">{req.reason}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${leaveStatusColor(req.status)}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
                {leaveRequests.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No leave requests yet</p>
                )}
              </div>
            </div>

            {/* WhatsApp tip */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
              </div>
              <div>
                <p className="text-green-800 font-semibold text-sm">Use WhatsApp Bot</p>
                <p className="text-green-600 text-xs mt-1 leading-relaxed">
                  Send <span className="font-bold">"check in"</span>, <span className="font-bold">"leave balance"</span>, or <span className="font-bold">"salary"</span> to the HR WhatsApp number for quick access.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* LEAVE */}
        {activeTab === "leave" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowLeaveForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
              >
                + Request Leave
              </button>
            </div>

            {showLeaveForm && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-indigo-900 font-bold mb-4">Request Leave</h2>
                  <form onSubmit={handleLeaveSubmit} className="space-y-3">
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">Start Date</label>
                      <input
                        type="date"
                        value={leaveForm.startDate}
                        onChange={e => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">End Date</label>
                      <input
                        type="date"
                        value={leaveForm.endDate}
                        onChange={e => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">Reason</label>
                      <textarea
                        value={leaveForm.reason}
                        onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                        required
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowLeaveForm(false)}
                        className="flex-1 border border-gray-200 text-gray-500 rounded-xl py-2 text-sm hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-indigo-700 transition"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {leaveRequests.map(req => (
                <div key={req.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:shadow-md transition">
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">{req.startDate} → {req.endDate}</p>
                    <p className="text-gray-400 text-xs mt-1">{req.reason}</p>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-xl font-medium ${leaveStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>
              ))}
              {leaveRequests.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-12">No leave requests yet</p>
              )}
            </div>
          </div>
        )}

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-900 font-bold mb-4">Check In / Out</h2>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-3 h-3 rounded-full ${checkedIn ? "bg-emerald-400 animate-pulse" : "bg-gray-300"}`} />
                <p className="text-gray-500 text-sm">
                  {checkedIn ? `Checked in at ${checkInTime}` : "Not checked in yet"}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCheckIn}
                  disabled={checkedIn}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
                >
                  ✅ Check In
                </button>
                <button
                  onClick={handleCheckOut}
                  disabled={!checkedIn}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition"
                >
                  🚪 Check Out
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="text-indigo-900 font-bold">Attendance History</h2>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-3">Date</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-3">Check In</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-3">Check Out</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map(a => (
                    <tr key={a.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-6 py-3 text-gray-600 text-sm">{a.checkIn?.split("T")[0]}</td>
                      <td className="px-6 py-3 text-gray-600 text-sm">{a.checkIn?.split("T")[1]?.slice(0, 5)}</td>
                      <td className="px-6 py-3 text-gray-600 text-sm">{a.checkOut?.split("T")[1]?.slice(0, 5) || "—"}</td>
                      <td className="px-6 py-3">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${attendanceStatusColor(a.status)}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {attendance.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-400 text-sm">
                        No attendance records yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}