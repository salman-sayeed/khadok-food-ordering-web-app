import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      //create order in DB
      const items = cart.map(item => ({
        food: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const orderRes = await axios.post(
        "http://localhost:8000/api/orders",
        { items, totalAmount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = orderRes.data._id;

      //create Stripe checkout session
      const paymentRes = await axios.post(
        "http://localhost:8000/api/payment/create-checkout-session",
        { items, orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      //redirect to Stripe checkout
      console.log("Stripe URL:", paymentRes.data.url);
      clearCart();
      window.location.href = paymentRes.data.url;

    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div style={{
      position: "fixed", top: 0, right: 0,
      width: "360px", height: "100vh",
      background: "white", boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
      zIndex: 1000, display: "flex", flexDirection: "column"
    }}>
      {/* Header */}
      <div style={{
        padding: "1.2rem",
        background: "#e63946",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h3 style={{ margin: 0 }}>🛒 Your Cart</h3>
        <button onClick={onClose} style={{
          background: "none", border: "none",
          color: "white", fontSize: "1.5rem", cursor: "pointer"
        }}>×</button>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", marginTop: "2rem" }}>
            Your cart is empty
          </p>
        ) : (
          cart.map(item => (
            <div key={item._id} style={{
              display: "flex", alignItems: "center", gap: "0.8rem",
              padding: "0.8rem 0", borderBottom: "1px solid #eee"
            }}>
              <img src={item.image} alt={item.name} style={{
                width: "55px", height: "50px",
                objectFit: "cover", borderRadius: "6px"
              }} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 0.3rem", fontWeight: "bold", fontSize: "0.9rem" }}>
                  {item.name}
                </p>
                <p style={{ margin: 0, color: "#e63946", fontWeight: "bold" }}>
                  ৳ {item.price * item.quantity}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  style={{ width: "26px", height: "26px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", background: "white" }}>
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  style={{ width: "26px", height: "26px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", background: "white" }}>
                  +
                </button>
                <button onClick={() => removeFromCart(item._id)}
                  style={{ width: "26px", height: "26px", border: "none", borderRadius: "4px", cursor: "pointer", background: "#ffe0e0", color: "#e63946", fontWeight: "bold" }}>
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div style={{ padding: "1rem", borderTop: "1px solid #eee" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
            <span style={{ fontWeight: "bold" }}>Total</span>
            <span style={{ fontWeight: "bold", color: "#e63946", fontSize: "1.1rem" }}>
              ৳ {totalAmount}
            </span>
          </div>
          <button onClick={handlePlaceOrder} style={{
            width: "100%", padding: "0.8rem",
            background: "#e63946", color: "white",
            border: "none", borderRadius: "8px",
            fontWeight: "bold", fontSize: "1rem", cursor: "pointer"
          }}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;