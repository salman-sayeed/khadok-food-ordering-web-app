import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Welcome, {user?.name} 👋</h2>
      <p>Role: {user?.role}</p>
      <p>This is the customer dashboard. Food items will go here in Phase 2.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default CustomerDashboard;