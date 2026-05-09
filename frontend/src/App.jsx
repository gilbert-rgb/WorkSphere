import { useState } from "react";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import HRDashboard from "./pages/HRDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("hr_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showLanding, setShowLanding] = useState(true);

  const handleLogin = (userData) => {
    localStorage.setItem("hr_user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("hr_user");
    setUser(null);
    setShowLanding(true);
  };

  if (!user && showLanding) return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  if (!user) return <Login onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  if (user.role === "ADMIN") return <AdminDashboard user={user} onLogout={handleLogout} />;
  if (user.role === "HR") return <HRDashboard user={user} onLogout={handleLogout} />;
  return <EmployeeDashboard user={user} onLogout={handleLogout} />;
}