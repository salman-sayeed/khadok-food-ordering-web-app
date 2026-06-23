import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");
        
        try{
            const res = await axios.post("http://localhost:8000/api/auth/login", form);
            login(res.data.user, res.data.token);
            
            if(res.data.user.role === "admin"){
                navigate("/admin");
            } else{
                navigate("/dashboard");
            }
        } catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
    <div style={{ maxWidth: "400px", margin: "100px auto", padding: "2rem" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "1rem" }}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ display: "block", width: "100%", marginBottom: "1rem" }}
          />
        </div>
        <button type="submit" style={{ width: "100%" }}>Login</button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        No account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;