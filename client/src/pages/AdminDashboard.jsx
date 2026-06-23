import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Panel 🛠️</h2>
      <p>Logged in as: {user?.name}</p>
      <p>Orders, food management, and customer details will go here in Phase 2.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;