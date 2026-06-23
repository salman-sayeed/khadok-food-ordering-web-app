import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { token } = useAuth();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      axios.get(`http://localhost:8000/api/orders/my`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        const found = res.data.find(o => o._id === orderId);
        setOrder(found);
      });
    }
  }, [orderId]);

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
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: "400px", width: "90%"
      }}>
        <div style={{ fontSize: "4rem" }}>🎉</div>
        <h2 style={{ color: "#e63946" }}>Order Placed!</h2>
        <p style={{ color: "#666" }}>Your payment was successful and your order is being prepared.</p>
        {order && (
          <div style={{ textAlign: "left", marginTop: "1rem", background: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Total:</strong> ৳ {order.totalAmount}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
          </div>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            marginTop: "1.5rem", padding: "0.7rem 2rem",
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