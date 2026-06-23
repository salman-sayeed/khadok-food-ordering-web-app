import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      flexDirection: "column", alignItems: "center",
      justifyContent: "center", fontFamily: "sans-serif",
      background: "#f9f9f9"
    }}>
      <div style={{
        background: "white", padding: "3rem",
        borderRadius: "16px", textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
      }}>
        <div style={{ fontSize: "4rem" }}>🎉</div>
        <h2 style={{ color: "#e63946" }}>Order Placed!</h2>
        <p style={{ color: "#666" }}>Your order has been received and is being prepared.</p>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "1rem", padding: "0.7rem 2rem",
            background: "#e63946", color: "white",
            border: "none", borderRadius: "8px",
            fontWeight: "bold", fontSize: "1rem", cursor: "pointer"
          }}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;