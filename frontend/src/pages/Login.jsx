import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.username || !formData.password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.");
      return;
    }

    try {
      const result = await loginUser(formData);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      setMessage("Đăng nhập thành công");

      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container page-section">
        <div className="booking-layout">
          <div className="booking-side-card">
            <span className="hero-badge">Đăng nhập tài khoản</span>
            <h1>Chào mừng bạn quay lại</h1>
            <p>
              Đăng nhập để đặt sân, tham gia trận bóng, theo dõi lịch cá nhân và
              sử dụng đầy đủ các tính năng của nền tảng.
            </p>

            <div className="booking-summary">
              <div className="summary-item">
                <span>Tính năng sau khi đăng nhập</span>
                <strong>Đặt sân & tham gia trận</strong>
              </div>
              <div className="summary-item">
                <span>Quản lý cá nhân</span>
                <strong>Lịch của tôi / Hồ sơ</strong>
              </div>
              <div className="summary-item">
                <span>Quyền quản trị</span>
                <strong>Admin có thể vào trang quản lý</strong>
              </div>
            </div>
          </div>

          <div className="simple-card">
            <h2 style={{ marginBottom: "8px" }}>Đăng nhập</h2>
            <p className="section-subtitle" style={{ marginBottom: "20px" }}>
              Nhập thông tin tài khoản để tiếp tục sử dụng hệ thống.
            </p>

            <form className="booking-form" onSubmit={handleSubmit}>
              <div>
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>

              <div>
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Nhập mật khẩu"
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "fit-content" }}
              >
                Đăng nhập
              </button>
            </form>

            {message && <p className="success-text">{message}</p>}
            {error && <p className="error-text">{error}</p>}

            <p style={{ marginTop: "18px", color: "#64748b" }}>
              Chưa có tài khoản?{" "}
              <Link to="/register" style={{ color: "#0b5ed7", fontWeight: 700 }}>
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;