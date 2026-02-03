import { useState } from "react";
import authApi from "../../api/authApi";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gym_name, setGymName] = useState("");
  const [phone, setPhone] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await api.post("owners/login/", {
          username,
          password,
        });

        login(res.data.access, res.data.refresh);
        navigate("/");
      } else {
        // SIGNUP
        await api.post("owners/register/", {
          username,
          password,
          gym_name,
          phone,
        });

        alert("Account created successfully! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Authentication failed. Please check your details.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? "Login to FIT" : "Create FIT Account"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Gym Name"
                value={gym_name}
                onChange={(e) => setGymName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
