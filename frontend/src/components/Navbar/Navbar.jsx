import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ☰ Hamburger (mobile only) */}
      <button className="hamburger" onClick={() => setIsOpen(true)}>
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Logo + Close */}
        <div className="sidebar-header">
          <div className="logo">
            <img src={logo} alt="Fit Logo" />
          </div>

          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <nav className="menu">
          <NavLink
            to="/"
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/members"
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            Members
          </NavLink>

          <NavLink
            to="/notifications"
            className="menu-item"
            onClick={() => setIsOpen(false)}
          >
            Notifications
          </NavLink>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
