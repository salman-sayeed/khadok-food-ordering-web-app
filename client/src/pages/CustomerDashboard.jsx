import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Cart from "../components/Cart";

const CustomerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true); 
  const { addToCart, totalItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const categories = ["All", "Pizza", "Burger", "Sides", "Pasta", "Drinks", "Desserts", "Rice"];

  useEffect(() => {
    axios.get("http://localhost:8000/api/food")
      .then(res => {
        setFoods(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFiltered(foods);
    } else {
      setFiltered(foods.filter(f => f.category === cat));
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f9f9f9" }}>

      {/* Navbar */}
      <nav style={{
        background: "#e63946",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>🍔 Khadok</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Hi, {user?.name}</span>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "white", color: "#e63946",
              border: "none", padding: "0.4rem 1rem",
              borderRadius: "4px", cursor: "pointer", fontWeight: "bold"
            }}
          >
            🛒 Cart {totalItems > 0 && `(${totalItems})`}
          </button>

          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#e63946",
              border: "none",
              padding: "0.4rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Category Filter */}
      <div style={{
        display: "flex",
        gap: "0.5rem",
        padding: "1.5rem 2rem",
        flexWrap: "wrap"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            style={{
              padding: "0.4rem 1.2rem",
              borderRadius: "20px",
              border: "2px solid #e63946",
              background: activeCategory === cat ? "#e63946" : "white",
              color: activeCategory === cat ? "white" : "#e63946",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: "1.5rem",
          padding: "0 2rem 2rem"
        }}>
          {filtered.map(food => (
            <div key={food._id} style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}>
              <img
                src={food.image}
                alt={food.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
              <div style={{ padding: "1rem" }}>
                <h3 style={{ margin: "0 0 0.3rem" }}>{food.name}</h3>
                <p style={{ margin: "0 0 0.5rem", color: "#666", fontSize: "0.85rem" }}>
                  {food.description}
                </p>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <span style={{ fontWeight: "bold", color: "#e63946" }}>
                    ৳ {food.price}
                  </span>
                  <button
                    onClick={() => addToCart(food)}
                    style={{
                      background: "#e63946", color: "white",
                      border: "none", padding: "0.4rem 1rem",
                      borderRadius: "6px", cursor: "pointer", fontWeight: "bold"
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </div>
  );
};

export default CustomerDashboard;