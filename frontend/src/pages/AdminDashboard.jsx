export default function AdminDashboard({ user, onLogout }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {user.name}</span>
            <button
              onClick={onLogout}
              className="bg-white text-blue-700 px-4 py-1.5 rounded text-sm font-medium hover:bg-blue-50"
            >
              Logout
            </button>
          </div>
        </nav>
        <main className="p-6">
          <p className="text-gray-500">Admin content goes here.</p>
        </main>
      </div>
    );
  }