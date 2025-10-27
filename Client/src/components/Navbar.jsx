import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const commonLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Service", path: "/service" },
    { label: "Contact", path: "/contact" },
  ];

  const authLinks = isLoggedIn()
    ? [{ label: "Logout", path: "/logout" }]
    : [
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const allLinks = [...commonLinks, ...authLinks];

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid custom-navbar">
          <NavLink className="navbar-brand" to="/" onClick={closeSidebar}>
            TechVerse
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Inline navbar for large screens */}
          <div className="d-none d-lg-flex">
            <ul className="navbar-nav flex-row gap-3">
              {allLinks.map(({ label, path }) => (
                <li className="nav-item" key={label}>
                  <NavLink className="nav-link" to={path}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar for small screens */}
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ul className="navbar-nav">
          {allLinks.map(({ label, path }) => (
            <li className="nav-item" key={label}>
              <NavLink
                className="nav-link"
                to={path}
                onClick={closeSidebar}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;