import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [useEmail, setUseEmail] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    const { name } = e.target;

    if (name === "phone") {
      // Only digits, max 10
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFinish = async () => {
    setError("");
    setLoading(true);

    try {
      const body = {
        name: formData.name,
        password: formData.password,
      };

      if (useEmail) {
        body.email = formData.email;
      } else {
        body.phone = "+91" + formData.phone;
      }

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/signin");
      } else {
        setError(data.message || "Server error");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "Poppins, sans-serif", backgroundColor: "#fff", padding: "20px" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: "400px", width: "100%", background: "#fefefe", padding: "40px", borderRadius: "20px", boxShadow: "0px 10px 30px rgba(0,0,0,0.1)", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#0077ff" }}>TravelGo</h1>
        <p style={{ fontSize: "1rem", color: "#555", marginBottom: "30px" }}>Sign up to Travel with Tripzo ✈️</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {/* Name */}
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #eee", borderRadius: "10px", padding: "12px" }}>
            <User style={{ marginRight: "8px", color: "#aaa" }} />
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" style={{ flex: 1, outline: "none", fontSize: "1rem" }} />
          </div>

          {/* Email/Phone Toggle */}
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button onClick={() => setUseEmail(true)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: useEmail ? "#0077ff" : "#eee", color: useEmail ? "#fff" : "#555", cursor: "pointer" }}>Email</button>
            <button onClick={() => setUseEmail(false)} style={{ padding: "8px 16px", borderRadius: "8px", border: "none", background: !useEmail ? "#0077ff" : "#eee", color: !useEmail ? "#fff" : "#555", cursor: "pointer" }}>Phone</button>
          </div>

          {/* Email / Phone Input */}
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #eee", borderRadius: "10px", padding: "12px" }}>
            {useEmail ? <Mail style={{ marginRight: "8px", color: "#aaa" }} /> : <Phone style={{ marginRight: "8px", color: "#aaa" }} />}
            <input
              type={useEmail ? "email" : "tel"}
              name={useEmail ? "email" : "phone"}
              value={useEmail ? formData.email : formData.phone}
              onChange={handleChange}
              placeholder={useEmail ? "Email" : "Phone Number"}
              style={{ flex: 1, outline: "none", fontSize: "1rem" }}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", alignItems: "center", border: "1px solid #eee", borderRadius: "10px", padding: "12px" }}>
            <Lock style={{ marginRight: "8px", color: "#aaa" }} />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create Password" style={{ flex: 1, outline: "none", fontSize: "1rem" }} />
          </div>
        </div>

        {error && <p style={{ color: "red", fontSize: "0.9rem", marginTop: "10px" }}>{error}</p>}

        <button onClick={handleFinish} disabled={loading} style={{ width: "100%", marginTop: "30px", padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg,#0077ff,#00aaff)", color: "#fff", fontSize: "1rem", cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
          {loading ? "Creating account..." : "Finish"}
        </button>

        <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
          Already have an account? <span onClick={() => navigate("/signin")} style={{ color: "#0077ff", cursor: "pointer" }}>Sign In</span>
        </p>
      </motion.div>
    </div>
  );
}
