import React, { useEffect } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const AdminLayout = () => {
    const { user, isLoading } = useAuth();
    // console.log("AdminLayout User:", user);
    const [shouldRedirect, setShouldRedirect] = React.useState(false);

    useEffect(() => {
        if (!isLoading && (!user || !user.isAdmin)) {
            toast.error("Access denied. Admin privileges required.");
            setShouldRedirect(true);
        }
    }, [user, isLoading]);

    useEffect(() => {
        if (user && user.isAdmin && !isLoading) {
            toast.success(`Welcome back, Admin ${user.username}!`);
        }
    }, [user, isLoading]);

    if(isLoading){
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading admin panel...</p>
            </div>
        );
    }
    
    if(shouldRedirect){
        return <Navigate to="/" replace />;
    }
  return (
    <>
      <header className="header">
        <div className="admin_layout_container">
        <nav className="navbar">
          <ul className=" sidebar_ul nav mb-auto ">
            <li className="nav-item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/contacts">Contacts</NavLink>
            </li>
          </ul>
        </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;