import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import {
  getEmployees, getDepartments, getLeaveRequests,
  createEmployee, deleteEmployee, createDepartment,
  approveLeave, rejectLeave, registerUser
} from "../services/api";

const navItems = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "employees", label: "Employees", icon: "👥" },
  { id: "departments", label: "Departments", icon: "🏢" },
  { id: "leave", label: "Leave Requests", icon: "📅" },
  { id: "attendance", label: "Attendance", icon: "⏰" },
  { id: "users", label: "User Management", icon: "🔐" },
];

const StatCard = ({ label, value, icon, color, textColor }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
    <div className="flex items-center justify-between mb-4">
      <span className="text-2xl">{icon}</span>
      <span className={`text-xs font-medium px-2 py-1 rounded-lg ${color}`}>Live</span>
    </div>
    <p className={`text-3xl font-bold mb-1 ${textColor}`}>{value}</p>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showAddDept, setShowAddDept] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: "", lastName: "", email: "",
    whatsappNumber: "", position: "", salary: ""
  });
  const [newDept, setNewDept] = useState("");
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "EMPLOYEE" });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [e, d, l] = await Promise.all([
        getEmployees(), getDepartments(), getLeaveRequests()
      ]);
      setEmployees(Array.isArray(e) ? e : []);
      setDepartments(Array.isArray(d) ? d : []);
      setLeaveRequests(Array.isArray(l) ? l : []);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(newEmployee);
      toast.success("Employee added successfully!");
      setShowAddEmployee(false);
      setNewEmployee({ firstName: "", lastName: "", email: "", whatsappNumber: "", position: "", salary: "" });
      fetchAll();
    } catch {
      toast.error("Failed to add employee");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (confirm("Delete this employee?")) {
      try {
        await deleteEmployee(id);
        toast.success("Employee deleted");
        fetchAll();
      } catch {
        toast.error("Failed to delete employee");
      }
    }
  };

  const handleAddDept = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(newDept);
      toast.success("Department added!");
      setNewDept("");
      setShowAddDept(false);
      fetchAll();
    } catch {
      toast.error("Failed to add department");
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

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await registerUser(newUser);
      toast.success("User registered successfully!");
      setShowAddUser(false);
      setNewUser({ username: "", password: "", role: "EMPLOYEE" });
    } catch {
      toast.error("Failed to register user");
    }
  };

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
            <p className="text-gray-400 text-sm mt-1">Welcome back, {user.username}</p>
          </div>
          <div className="bg-orange-50 border border-orange-100 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full">
            ADMIN
          </div>
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard label="Total Employees" value={employees.length} icon="👥"
                color="bg-indigo-50 text-indigo-600" textColor="text-indigo-900" />
              <StatCard label="Departments" value={departments.length} icon="🏢"
                color="bg-emerald-50 text-emerald-600" textColor="text-emerald-700" />
              <StatCard label="Pending Leave" value={leaveRequests.filter(l => l.status === "PENDING").length} icon="📅"
                color="bg-amber-50 text-amber-600" textColor="text-amber-700" />
              <StatCard label="Active Staff" value={employees.filter(e => e.status === "ACTIVE").length} icon="✅"
                color="bg-orange-50 text-orange-600" textColor="text-orange-700" />
            </div>

            {/* Recent Employees */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-900 font-bold mb-4">Recent Employees</h2>
              <div className="space-y-3">
                {employees.slice(0, 5).map(emp => (
                  <div key={emp.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                      {emp.firstName?.[0]}{emp.lastName?.[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-semibold">{emp.firstName} {emp.lastName}</p>
                      <p className="text-gray-400 text-xs">{emp.position} · {emp.department?.name}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${statusColor(emp.status)}`}>
                      {emp.status}
                    </span>
                  </div>
                ))}
                {employees.length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-6">No employees yet</p>
                )}
              </div>
            </div>

            {/* Pending Leave Requests */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h2 className="text-indigo-900 font-bold mb-4">Pending Leave Requests</h2>
              <div className="space-y-3">
                {leaveRequests.filter(l => l.status === "PENDING").slice(0, 3).map(req => (
                  <div key={req.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <div>
                      <p className="text-gray-800 text-sm font-semibold">
                        {req.employee?.firstName} {req.employee?.lastName}
                      </p>
                      <p className="text-gray-400 text-xs">{req.startDate} → {req.endDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(req.id)}
                        className="text-emerald-600 text-xs bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition">
                        Approve
                      </button>
                      <button onClick={() => handleReject(req.id)}
                        className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
                {leaveRequests.filter(l => l.status === "PENDING").length === 0 && (
                  <p className="text-gray-400 text-sm text-center py-4">No pending leave requests</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* EMPLOYEES */}
        {activeTab === "employees" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">{employees.length} total employees</p>
              <button onClick={() => setShowAddEmployee(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
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

            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Employee</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Position</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Department</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Status</th>
                    <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map(emp => (
                    <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                            {emp.firstName?.[0]}{emp.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-gray-800 text-sm font-semibold">{emp.firstName} {emp.lastName}</p>
                            <p className="text-gray-400 text-xs">{emp.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{emp.position}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{emp.department?.name || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${statusColor(emp.status)}`}>
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteEmployee(emp.id)}
                          className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {employees.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DEPARTMENTS */}
        {activeTab === "departments" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">{departments.length} departments</p>
              <button onClick={() => setShowAddDept(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                + Add Department
              </button>
            </div>

            {showAddDept && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-sm shadow-xl">
                  <h2 className="text-indigo-900 font-bold mb-4">Add Department</h2>
                  <form onSubmit={handleAddDept} className="space-y-3">
                    <input
                      value={newDept}
                      onChange={e => setNewDept(e.target.value)}
                      placeholder="Department name"
                      className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setShowAddDept(false)}
                        className="flex-1 border border-gray-200 text-gray-500 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                        Cancel
                      </button>
                      <button type="submit"
                        className="flex-1 bg-indigo-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-indigo-700 transition">
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map(dept => (
                <div key={dept.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                    <span className="text-xl">🏢</span>
                  </div>
                  <h3 className="text-indigo-900 font-bold">{dept.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{dept.employees?.length || 0} employees</p>
                </div>
              ))}
              {departments.length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-400 text-sm">No departments yet</div>
              )}
            </div>
          </div>
        )}

        {/* LEAVE REQUESTS */}
        {activeTab === "leave" && (
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Employee</th>
                  <th className="text-left text-gray-400 text-xs font-semibold px-6 py-4">Duration</th>
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
                    <td className="px-6 py-4 text-gray-500 text-sm">{req.startDate} → {req.endDate}</td>
                    <td className="px-6 py-4 text-gray-400 text-sm">{req.reason}</td>
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
                            Approve
                          </button>
                          <button onClick={() => handleReject(req.id)}
                            className="text-red-500 text-xs bg-red-50 border border-red-100 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                            Reject
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

        {/* ATTENDANCE */}
        {activeTab === "attendance" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-center py-16">
            <span className="text-4xl">⏰</span>
            <p className="text-indigo-900 font-bold mt-4">Attendance Tracking</p>
            <p className="text-gray-400 text-sm mt-2">
              Attendance records appear here once employees check in via WhatsApp.
            </p>
          </div>
        )}

        {/* USER MANAGEMENT */}
        {activeTab === "users" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-sm">Register and manage system users</p>
              <button onClick={() => setShowAddUser(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                + Register User
              </button>
            </div>

            {showAddUser && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full max-w-sm shadow-xl">
                  <h2 className="text-indigo-900 font-bold mb-4">Register New User</h2>
                  <form onSubmit={handleAddUser} className="space-y-3">
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">Username</label>
                      <input
                        value={newUser.username}
                        onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">Password</label>
                      <input
                        type="password"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-gray-500 text-xs mb-1 block font-medium">Role</label>
                      <select
                        value={newUser.role}
                        onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                        className="w-full border border-gray-200 bg-gray-50 text-gray-900 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="HR">HR</option>
                        <option value="EMPLOYEE">Employee</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowAddUser(false)}
                        className="flex-1 border border-gray-200 text-gray-500 rounded-xl py-2 text-sm hover:bg-gray-50 transition">
                        Cancel
                      </button>
                      <button type="submit"
                        className="flex-1 bg-orange-500 text-white rounded-xl py-2 text-sm font-semibold hover:bg-orange-600 transition">
                        Register
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <p className="text-gray-400 text-sm text-center py-8">
                Use the button above to register new Admin, HR, or Employee users into the system.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}