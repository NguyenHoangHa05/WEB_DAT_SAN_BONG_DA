import React from "react";
import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-card">
        <span className="hero-badge">Khu vực quản trị</span>
        <h3 className="admin-sidebar-title">Menu admin</h3>

        <div className="admin-sidebar-links">
          <Link
            to="/admin/bookings"
            className={isActive("/admin/bookings") ? "admin-side-link active" : "admin-side-link"}
          >
            Quản lý booking
          </Link>

          <Link
            to="/admin/users"
            className={isActive("/admin/users") ? "admin-side-link active" : "admin-side-link"}
          >
            Quản lý người dùng
          </Link>

          <Link
            to="/admin/fields"
            className={isActive("/admin/fields") ? "admin-side-link active" : "admin-side-link"}
          >
            Quản lý sân bóng
          </Link>

          <Link
            to="/admin/matches"
            className={isActive("/admin/matches") ? "admin-side-link active" : "admin-side-link"}
          >
            Quản lý trận đấu
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;