// This logic ensures /api/v1 is only added if it's not already there
const rawUrl = import.meta.env.VITE_API_URL || "https://worksphere-7l2w.onrender.com";
const cleanUrl = rawUrl.endsWith("/api/v1") ? rawUrl : `${rawUrl}/api/v1`;

const BASE_URL = cleanUrl;

// ─── Token Helpers ────────────────────────────────────────────────────────────

const getToken = () => {
  try {
    const user = localStorage.getItem("hr_user");
    if (!user) return null;
    const parsed = JSON.parse(user);
    return parsed.token || parsed.accessToken || null;
  } catch {
    return null;
  }
};

const headers = () => {
  const token = getToken();
  if (!token) {
    console.warn("[API] No auth token found in localStorage.");
  }
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ─── Response Handler ─────────────────────────────────────────────────────────

const handle = async (res) => {
  if (res.status === 401) {
    console.error("[API] 401 Unauthorized – clearing session and redirecting.");
    localStorage.removeItem("hr_user");
    window.location.href = "/login";
    throw new Error("Session expired. Please log in again.");
  }
  if (res.status === 403) {
    console.error("[API] 403 Forbidden – insufficient permissions for:", res.url);
    throw new Error("You do not have permission to perform this action.");
  }
  if (!res.ok) {
    const text = await res.text();
    console.error(`[API] ${res.status} error:`, text);
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  const contentType = res.headers.get("Content-Type") || "";
  if (res.status === 204 || !contentType.includes("application/json")) {
    return null;
  }
  return res.json();
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export const login = (username, password) =>
  fetch(`${BASE_URL}/auth/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(handle);

export const register = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle);

export const registerUser = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

// ─── EMPLOYEES ────────────────────────────────────────────────────────────────

export const getEmployees = () =>
  fetch(`${BASE_URL}/employees`, { headers: headers() }).then(handle);

export const createEmployee = (data) =>
  fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

export const updateEmployee = (id, data) =>
  fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

export const deleteEmployee = (id) =>
  fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: headers(),
  }).then(handle);

// ─── DEPARTMENTS ──────────────────────────────────────────────────────────────

export const getDepartments = () =>
  fetch(`${BASE_URL}/departments`, { headers: headers() }).then(handle);

export const createDepartment = (name) =>
  fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name }),
  }).then(handle);

// ─── LEAVE ────────────────────────────────────────────────────────────────────

export const getLeaveRequests = () =>
  fetch(`${BASE_URL}/leave`, { headers: headers() }).then(handle);

export const createLeaveRequest = (data) =>
  fetch(`${BASE_URL}/leave`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then(handle);

export const approveLeave = (id) =>
  fetch(`${BASE_URL}/leave/approve/${id}`, {
    method: "PUT",
    headers: headers(),
  }).then(handle);

export const rejectLeave = (id) =>
  fetch(`${BASE_URL}/leave/reject/${id}`, {
    method: "PUT",
    headers: headers(),
  }).then(handle);

// ─── ATTENDANCE ───────────────────────────────────────────────────────────────

export const getAttendance = () =>
  fetch(`${BASE_URL}/attendance`, { headers: headers() }).then(handle);

export const checkIn = () =>
  fetch(`${BASE_URL}/attendance/checkin`, {
    method: "POST",
    headers: headers(),
  }).then(handle);

export const checkOut = () =>
  fetch(`${BASE_URL}/attendance/checkout`, {
    method: "PUT",
    headers: headers(),
  }).then(handle);

// ─── PAYROLL ──────────────────────────────────────────────────────────────────

export const getPayroll = () =>
  fetch(`${BASE_URL}/payroll`, { headers: headers() }).then(handle);

export const getMyPayroll = () =>
  fetch(`${BASE_URL}/payroll/me`, { headers: headers() }).then(handle);