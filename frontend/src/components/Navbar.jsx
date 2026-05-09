import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/api";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      return;
    }

    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        console.error("Lỗi lấy user hiện tại:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setCurrentUser(null);
      }
    };

    loadCurrentUser();
  }, [location.pathname]);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar sidebar-navbar">
      <div className="container navbar-inner sidebar-inner">
        <Link to="/" className="logo sidebar-logo">
          <span className="logo-mark">⚽</span>
          <div className="sidebar-brand">
            <span className="logo-text">
              Đặt <span className="logo-highlight">Sân Bóng</span>
            </span>
            <span className="sidebar-brand-subtitle">Football booking platform</span>
          </div>
        </Link>

        <div className="nav-search sidebar-search">
          <input
            type="text"
            placeholder="Tìm sân bóng hoặc trận bóng..."
            readOnly
          />
        </div>

        <div className="nav-links sidebar-links">
          <Link className={isActive("/") ? "nav-link active" : "nav-link"} to="/">
            <span>Trang chủ</span>
          </Link>

          <Link
            className={isActive("/matches") ? "nav-link active" : "nav-link"}
            to="/matches"
          >
            <span>Tìm trận</span>
          </Link>

          <Link
            className={isActive("/fields") ? "nav-link active" : "nav-link"}
            to="/fields"
          >
            <span>Sân bóng</span>
          </Link>

          {currentUser && (
            <>
              <Link
                className={isActive("/my-schedule") ? "nav-link active" : "nav-link"}
                to="/my-schedule"
              >
                <span>Lịch của tôi</span>
              </Link>

              <Link
                className={isActive("/profile") ? "nav-link active" : "nav-link"}
                to="/profile"
              >
                <span>Hồ sơ</span>
              </Link>
            </>
          )}

          {currentUser?.role === "admin" && (
            <>
              <div className="sidebar-admin-title">Quản trị</div>

              <Link
                className={isActive("/admin/bookings") ? "nav-link active" : "nav-link"}
                to="/admin/bookings"
              >
                <span>Quản lý booking</span>
              </Link>

              <Link
                className={isActive("/admin/users") ? "nav-link active" : "nav-link"}
                to="/admin/users"
              >
                <span>Quản lý người dùng</span>
              </Link>

              <Link
                className={isActive("/admin/fields") ? "nav-link active" : "nav-link"}
                to="/admin/fields"
              >
                <span>Quản lý sân</span>
              </Link>

              <Link
                className={isActive("/admin/matches") ? "nav-link active" : "nav-link"}
                to="/admin/matches"
              >
                <span>Quản lý trận</span>
              </Link>
            </>
          )}
        </div>

        <div className="nav-user sidebar-user">
          {currentUser ? (
            <>
              <div className="sidebar-user-card">
                <button className="nav-user-btn sidebar-user-btn" type="button">
                  {currentUser.username}
                  {currentUser.role === "admin" ? " (admin)" : ""}
                </button>

                <button
                  className="btn-outline nav-logout-btn"
                  onClick={handleLogout}
                  type="button"
                >
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <div className="sidebar-user-card">
              <Link to="/login" className="btn-outline nav-auth-btn">
                Đăng nhập
              </Link>
              <Link to="/register" className="nav-user-btn nav-auth-btn">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;