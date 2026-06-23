import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    name: "", description: "", price: "", category: "", image: ""
  });

  const categories = ["Pizza", "Burger", "Sides", "Pasta", "Drinks", "Desserts", "Rice"];

  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/food");
      setFoods(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchFoods(); }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`http://localhost:8000/api/food/${editItem._id}`, form, authHeaders);
      } else {
        await axios.post("http://localhost:8000/api/food", form, authHeaders);
      }
      setForm({ name: "", description: "", price: "", category: "", image: "" });
      setEditItem(null);
      setShowForm(false);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (food) => {
    setEditItem(food);
    setForm({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/food/${id}`, authHeaders);
      fetchFoods();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.8rem",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "0.95rem",
    boxSizing: "border-box"
  };

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f9f9f9" }}>

      {/* Navbar */}
      <nav style={{
        background: "#1d3557",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2 style={{ margin: 0 }}>🛠️ Khadok Admin</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>{user?.name}</span>
          <button
            onClick={handleLogout}
            style={{
              background: "white",
              color: "#1d3557",
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

      <div style={{ padding: "2rem" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h3 style={{ margin: 0 }}>Food Items ({foods.length})</h3>
          <button
            onClick={() => { setShowForm(!showForm); setEditItem(null); setForm({ name: "", description: "", price: "", category: "", image: "" }); }}
            style={{
              background: "#e63946",
              color: "white",
              border: "none",
              padding: "0.5rem 1.2rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>

        {/* Add / Edit Form */}
        {showForm && (
          <div style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "2rem",
            maxWidth: "500px"
          }}>
            <h4 style={{ marginTop: 0 }}>{editItem ? "Edit Item" : "Add New Item"}</h4>
            <form onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={inputStyle} />
              <input name="description" placeholder="Description" value={form.description} onChange={handleChange} required style={inputStyle} />
              <input name="price" type="number" placeholder="Price (৳)" value={form.price} onChange={handleChange} required style={inputStyle} />
              <select name="category" value={form.category} onChange={handleChange} required style={inputStyle}>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required style={inputStyle} />
              {form.image && (
                <img src={form.image} alt="preview" style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px", marginBottom: "0.8rem" }} />
              )}
              <button type="submit" style={{
                background: "#1d3557",
                color: "white",
                border: "none",
                padding: "0.6rem 1.5rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                width: "100%"
              }}>
                {editItem ? "Update Item" : "Add Item"}
              </button>
            </form>
          </div>
        )}

        {/* Food Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
              <thead style={{ background: "#1d3557", color: "white" }}>
                <tr>
                  {["Image", "Name", "Category", "Price", "Actions"].map(h => (
                    <th key={h} style={{ padding: "0.8rem 1rem", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {foods.map((food, i) => (
                  <tr key={food._id} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "white" : "#fafafa" }}>
                    <td style={{ padding: "0.6rem 1rem" }}>
                      <img src={food.image} alt={food.name} style={{ width: "60px", height: "50px", objectFit: "cover", borderRadius: "6px" }} />
                    </td>
                    <td style={{ padding: "0.6rem 1rem" }}>{food.name}</td>
                    <td style={{ padding: "0.6rem 1rem" }}>{food.category}</td>
                    <td style={{ padding: "0.6rem 1rem" }}>৳ {food.price}</td>
                    <td style={{ padding: "0.6rem 1rem" }}>
                      <button
                        onClick={() => handleEdit(food)}
                        style={{ marginRight: "0.5rem", background: "#457b9d", color: "white", border: "none", padding: "0.3rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(food._id)}
                        style={{ background: "#e63946", color: "white", border: "none", padding: "0.3rem 0.8rem", borderRadius: "4px", cursor: "pointer" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;