const BASE_URL = "http://localhost:8081/api/v1";

const getToken = () => {
  const user = localStorage.getItem("hr_user");
  return user ? JSON.parse(user).token : null;
};

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// AUTH
export const login = (username, password) =>
  fetch(`${BASE_URL}/auth/authenticate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then((r) => r.json());

export const register = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((r) => r.json());

// used by Admin to register users with auth token
export const registerUser = (data) =>
  fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

// EMPLOYEES
export const getEmployees = () =>
  fetch(`${BASE_URL}/employees`, { headers: headers() }).then((r) => r.json());

export const createEmployee = (data) =>
  fetch(`${BASE_URL}/employees`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const updateEmployee = (id, data) =>
  fetch(`${BASE_URL}/employees/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const deleteEmployee = (id) =>
  fetch(`${BASE_URL}/employees/${id}`, {
    method: "DELETE",
    headers: headers(),
  });

// DEPARTMENTS
export const getDepartments = () =>
  fetch(`${BASE_URL}/departments`, { headers: headers() }).then((r) => r.json());

export const createDepartment = (name) =>
  fetch(`${BASE_URL}/departments`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ name }),
  }).then((r) => r.json());

// LEAVE
export const getLeaveRequests = () =>
  fetch(`${BASE_URL}/leave`, { headers: headers() }).then((r) => r.json());

export const createLeaveRequest = (data) =>
  fetch(`${BASE_URL}/leave`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const approveLeave = (id) =>
  fetch(`${BASE_URL}/leave/approve/${id}`, {
    method: "PUT",
    headers: headers(),
  }).then((r) => r.json());

export const rejectLeave = (id) =>
  fetch(`${BASE_URL}/leave/reject/${id}`, {
    method: "PUT",
    headers: headers(),
  }).then((r) => r.json());

// ATTENDANCE
export const getAttendance = () =>
  fetch(`${BASE_URL}/attendance`, { headers: headers() }).then((r) => r.json());

export const checkIn = () =>
  fetch(`${BASE_URL}/attendance/checkin`, {
    method: "POST",
    headers: headers(),
  }).then((r) => r.json());

export const checkOut = () =>
  fetch(`${BASE_URL}/attendance/checkout`, {
    method: "PUT",
    headers: headers(),
  }).then((r) => r.json());

// PAYROLL
export const getPayroll = () =>
  fetch(`${BASE_URL}/payroll`, { headers: headers() }).then((r) => r.json());

export const getMyPayroll = () =>
  fetch(`${BASE_URL}/payroll/me`, { headers: headers() }).then((r) => r.json());