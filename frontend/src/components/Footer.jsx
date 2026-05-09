import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer footer-fade">
      <div className="container footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-mark">⚽</span>
            <span className="footer-logo-text">
              Đặt <span>Sân Bóng</span>
            </span>
          </div>

          <p className="footer-desc">
            Nền tảng dành cho người yêu bóng đá: tìm trận phù hợp, đặt sân dễ hơn
            và quản lý hoạt động chơi bóng trong cùng một hệ thống hiện đại.
          </p>

          <div className="footer-badges">
            <span>Đặt sân nhanh</span>
            <span>Tìm trận dễ</span>
            <span>Quản lý tập trung</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Điều hướng nhanh</h4>
          <div className="footer-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/matches">Tìm trận bóng</Link>
            <Link to="/fields">Sân bóng</Link>
            <Link to="/my-schedule">Lịch của tôi</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4>Hệ thống</h4>
          <div className="footer-links footer-text-list">
            <p>Đặt sân theo giờ</p>
            <p>Tham gia trận cộng đồng</p>
            <p>Quản lý lịch đặt sân</p>
            <p>Theo dõi hoạt động người chơi</p>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 ĐặtSânBóng. Nền tảng bóng đá cộng đồng hiện đại.</span>
        <span>Demo quản lý sân bóng và tìm trận cộng đồng</span>
      </div>
    </footer>
  );
}

export default Footer;