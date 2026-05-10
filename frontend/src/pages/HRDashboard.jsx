import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import {
  getEmployees, getDepartments, getLeaveRequests,
  approveLeave, rejectLeave, createEmployee, updateEmployee
} from "../services/api";

const navItems = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "employees", label: "Employees", icon: "👥" },
  { id: "leave", label: "Leave Requests", icon: "📅" },
  { id: "departments", label: "Departments", icon: "🏢" },
  { id: "attendance", label: "Attendance", icon: "⏰" },
];

const statusColor = (status) => {
  if (status === "ACTIVE") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (status === "PENDING") return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-red-50 text-red-600 border border-red-100";
};

const leaveStatusColor = (status) => {
  if (status === "APPROVED") return "bg-emerald-50 text-emerald-600 border border-emerald-100";
  if (status === "PENDING") return "bg-amber-50 text-amber-600 border border-amber-100";
  return "bg-red-50 text-red-600 border border-red-100";
};

export default function HRDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "", lastName: "", email: "",
    whatsappNumber: "", position: "", salary: ""
  });
  const [search, setSearch] = useState("");

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [e, d, l] = await Promise.all([
        getEmployees(), getDepartments(), getLeaveRequests()
      ]);
      setEmployees(Array.isArray(e) ? e : []);
      setDepartments(Array.isArray(d) ? d : []);
      setLeaveRequests(Array.isArray(l) ? l : []);
    } catch {
      toast.error("Failed to load data");
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(newEmployee);
      toast.success("Employee added successfully!");
      setShowAddEmployee(false);
      setNewEmployee({
        firstName: "", lastName: "", email: "",
        whatsappNumber: "", position: "", salary: ""
      });
      fetchAll();
    } catch {
      toast.error("Failed to add employee");
    }
  };

  const handleStatusChange = async (emp, newStatus) => {
    try {
      await updateEmployee(emp.id, { ...emp, status: newStatus });
      toast.success(`Employee status updated to ${newStatus}`);
      fetchAll();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      toast.success("Leave approved!");
      fetchAll();
    } catch {
      toast.error("Failed to approve leave");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      toast.warning("Leave rejected");
      fetchAll();
    } catch {
      toast.error("Failed to reject leave");
    }
  };

  const filtered = employees.filter(e =>
    `${e.firstName} ${e.lastName} ${e.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const pending = leaveRequests.filter(l => l.status === "PENDING");

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
            <p className="text-gray-400 text-sm mt-1">HR Manager · {user.username}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            HR
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Total Employees", value: employees.length, icon: "👥", bg: "bg-indigo-50", text: "text-indigo-900", badge: "bg-indigo-50 text-indigo-600" },
                { label: "Pending Leave", value: pending.length, icon: "📅", bg: "bg-amber-50", text: "text-amber-700", badge: "bg-amber-50 text-amber-600" },
                { label: "Departments", value: departments.length, icon: "🏢", bg: "bg-emerald-50", text: "text-emerald-700", badge: "bg-emerald-50 text-emerald-600" },
                { label: "Active Staff", value: employees.filter(e => e.status === "ACTIVE").length, icon: "✅", bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-50 text-orange-600" },
              ].map(({ label, value, icon, bg, text, badge }) => (
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

            {/* Pending Approvals */}
            {pending.length > 0 && (
              <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm">
                <h2 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
                  Pending Approvals ({pending.length})
                </h2>
                <div className="space-y-3">
                  {pending.map(req => (
                    <div key={req.id} className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-xl">
                      <div>
                        <p className="text-gray-800 text-sm font-semibold">
                          {req.employee?.firstName} {req.employee?.lastName}
                        </p>
                        <p className="text-gray-400 text-xs">{req.startDate} → {req.endDate} · {req.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleApprove(req.id)}
                          className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
                          ✓ Approve
                        </button>
                        <button onClick={() => handleReject(req.id)}
                          className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Employee Status Summary */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-900 font-bold mb-4">Employee Status Summary</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Active", count: employees.filter(e => e.status === "ACTIVE").length, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
                  { label: "Pending", count: employees.filter(e => e.status === "PENDING").length, color: "bg-amber-50 text-amber-600 border-amber-100" },
                  { label: "Inactive", count: employees.filter(e => e.status === "INACTIVE").length, color: "bg-red-50 text-red-500 border-red-100" },
                ].map(({ label, count, color }) => (
                  <div key={label} className={`border rounded-xl p-4 text-center ${color}`}>
                    <p className="text-2xl font-bold">{count}</p>
                    <p className="text-xs font-medium mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYEES */}
        {activeTab === "employees" && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search employees..."
                className="flex-1 border border-gray-200 bg-white text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-300"
              />
              <button onClick={() => setShowAddEmployee(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
                + Add Employee
              </button>
            </div>

            {showAddEmployee && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-indigo-900 font-bold mb-4">Add New Employee</h2>
                  <form onSubmit={handleAddEmployee} className="space-y-3">
                    {[
                      { key: "firstName", label: "First Name" },
                      { key: "lastName", label: "Last Name" },
                      { key: "email", label: "Email" },
                      { key: "whatsappNumber", label: "WhatsApp Number" },
                      { key: "position", label: "Position" },
                      { key: "salary", label: "Salary" },
                    ].map(({ key, label }) => (
                      <div key={key}>
                        <label className="text-gray-500 text-xs mb-1 block font-medium">{label}</label>
                        <input
                          value={newEmployee[key]}
                          onChange={e => setNewEmployee({ ...newEmployee, [key]: e.target.value })}
                          className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          required
                        />
                      </div>
                    ))}
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowAddEmployee(false)}
                        className="flex-1 border border-gray-200 text-gray-500 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                        Cancel
                      </button>
                      <button type="submit"
                        className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-indigo-700 transition">
                        Add Employee
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map(emp => (
                <div key={emp.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition">
                  <div className="w-11 h-11 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {emp.firstName?.[0]}{emp.lastName?.[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-sm">{emp.firstName} {emp.lastName}</p>
                    <p className="text-gray-400 text-xs">{emp.position} · {emp.department?.name || "No dept"}</p>
                    <p className="text-gray-300 text-xs">{emp.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${statusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                    {/* Status change buttons */}
                    {emp.status === "PENDING" && (
                      <button onClick={() => handleStatusChange(emp, "ACTIVE")}
                        className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-2 py-1 rounded-lg transition">
                        Activate
                      </button>
                    )}
                    {emp.status === "ACTIVE" && (
                      <button onClick={() => handleStatusChange(emp, "INACTIVE")}
                        className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-2 py-1 rounded-lg transition">
                        Deactivate
                      </button>
                    )}
                    {emp.status === "INACTIVE" && (
                      <button onClick={() => handleStatusChange(emp, "ACTIVE")}
                        className="text-indigo-600 text-xs bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 px-2 py-1 rounded-lg transition">
                        Reactivate
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-gray-400 text-sm text-center col-span-2 py-8">No employees found</p>
              )}
            </div>
          </div>
        )}

        {/* LEAVE */}
        {activeTab === "leave" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Employee</th>
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Period</th>
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Reason</th>
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Status</th>
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map(req => (
                  <tr key={req.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-gray-800 text-sm font-medium">
                      {req.employee?.firstName} {req.employee?.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">{req.startDate} → {req.endDate}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{req.reason}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-lg font-medium ${leaveStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {req.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button onClick={() => handleApprove(req.id)}
                            className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
                            ✓ Approve
                          </button>
                          <button onClick={() => handleReject(req.id)}
                            className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                            ✗ Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {leaveRequests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                      No leave requests
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* DEPARTMENTS */}
        {activeTab === "departments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map(dept => (
              <div key={dept.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <span className="text-xl">🏢</span>
                </div>
                <h3 className="text-indigo-900 font-bold">{dept.name}</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {employees.filter(e => e.department?.id === dept.id).length} employees
                </p>
              </div>
            ))}
            {departments.length === 0 && (
              <p className="text-gray-400 text-sm col-span-3 text-center py-8">No departments</p>
            )}
          </div>
        )}

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center py-16">
            <span className="text-4xl">⏰</span>
            <p className="text-indigo-900 font-bold mt-4">Attendance Records</p>
            <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto">
              Attendance records appear here once employees check in via WhatsApp.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}