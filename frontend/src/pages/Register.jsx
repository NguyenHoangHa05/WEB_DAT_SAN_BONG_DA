import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
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
      setError("Tên đăng nhập và mật khẩu là bắt buộc.");
      return;
    }

    try {
      const result = await registerUser(formData);
      setMessage(result.message || "Đăng ký thành công");

      setTimeout(() => {
        navigate("/login");
      }, 900);
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
            <span className="hero-badge">Tạo tài khoản mới</span>
            <h1>Bắt đầu với ĐặtSânBóng</h1>
            <p>
              Tạo tài khoản để đặt sân, đăng ký tham gia trận đấu và theo dõi
              toàn bộ lịch hoạt động của bạn trên hệ thống.
            </p>

            <div className="booking-summary">
              <div className="summary-item">
                <span>Tài khoản mới</span>
                <strong>Tự động tạo hồ sơ người chơi</strong>
              </div>
              <div className="summary-item">
                <span>Sử dụng ngay</span>
                <strong>Đặt sân, xem lịch, tham gia trận</strong>
              </div>
              <div className="summary-item">
                <span>Mặc định quyền</span>
                <strong>Người dùng</strong>
              </div>
            </div>
          </div>

          <div className="simple-card">
            <h2 style={{ marginBottom: "8px" }}>Đăng ký tài khoản</h2>
            <p className="section-subtitle" style={{ marginBottom: "20px" }}>
              Điền thông tin cơ bản để tạo tài khoản mới.
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

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: "fit-content" }}
              >
                Đăng ký
              </button>
            </form>

            {message && <p className="success-text">{message}</p>}
            {error && <p className="error-text">{error}</p>}

            <p style={{ marginTop: "18px", color: "#64748b" }}>
              Đã có tài khoản?{" "}
              <Link to="/login" style={{ color: "#0b5ed7", fontWeight: 700 }}>
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Register;